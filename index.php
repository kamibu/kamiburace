<?php

error_reporting( E_ALL | E_WARNING | E_PARSE | E_NOTICE );

function idx($array, $key, $default=null) {
  return array_key_exists($key, $array) ? $array[$key] : $default;
}

class FacebookApiException extends Exception {
  public function __construct($response, $curlErrorNo) {
	print_r( $response );
	echo $curlErrorNo;
    $this->response = $response;
    $this->curlErrorNo = $curlErrorNo;
  }
}

class Facebook {
  public function __construct($opts) {
    $this->appId = $opts['appId'];
    $this->secret = $opts['secret'];
    $this->accessToken = idx($opts, 'accessToken');
    $this->userId = idx($opts, 'userId');
    $this->signedRequest = idx($opts, 'signedRequest', array());
    $this->maxSignedRequestAge = idx($opts, 'maxSignedRequestAge', 86400);
  }

  public function loadSignedRequest($signedRequest) {
    list($signature, $payload) = explode('.', $signedRequest, 2);
    $data = json_decode(self::base64UrlDecode($payload), true);
    if (isset($data['issued_at']) &&
        $data['issued_at'] > time() - $this->maxSignedRequestAge &&
        self::base64UrlDecode($signature) ==
          hash_hmac('sha256', $payload, $this->secret, $raw=true)) {
      $this->signedRequest = $data;
      $this->userId = idx($data, 'user_id');
      $this->accessToken = idx($data, 'oauth_token');
    }
  }

  public function api($path, $params=null, $method='GET', $domain='graph') {
    if (!$params) $params = array();
    $params['method'] = $method;
    if (!array_key_exists('access_token', $params) && $this->accessToken && !isset( $params[ 'client_secret' ] ) )
      $params['access_token'] = $this->accessToken;
    $ch = curl_init();
echo http_build_query( $params, null, '&' );
    curl_setopt_array($ch, array(
      CURLOPT_CONNECTTIMEOUT => 10,
      CURLOPT_HTTPHEADER     => array('Expect:'),
      CURLOPT_POSTFIELDS     => http_build_query($params, null, '&'),
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT        => 60,
      CURLOPT_URL            => "https://$domain.facebook.com$path",
      CURLOPT_USERAGENT      => 'nshah-0.1',
    ));
    $result = curl_exec($ch);
    $decoded = json_decode($result, true);
    $curlErrorNo = curl_errno($ch);
    curl_close($ch);

    if ($curlErrorNo !== 0 || (is_array($decoded) && isset($decoded['error'])))
      throw new FacebookApiException($decoded, $curlErrorNo);
    return $decoded;
  }

  public static function base64UrlDecode($input) {
    return base64_decode(strtr($input, '-_', '+/'));
  }
}

function FB() {
  $fb = new Facebook(array(
    'appId' => '305569989471432',
    'secret' => '6fbeb78723c20f839d9fa26d63acb9e2',
  ));
  header('P3P: CP=HONK'); // cookies for iframes in IE
  session_start();
  if (isset($_POST['signed_request'])) {
    $fb->loadSignedRequest($_POST['signed_request']);
    $_SESSION['facebook_user_id'] = $fb->userId;
    $_SESSION['facebook_access_token'] = $fb->accessToken;
  } else {
    $fb->userId = idx($_SESSION, 'facebook_user_id');
    $fb->accessToken = idx($_SESSION, 'facebook_access_token');
  }
  return $fb;
}

$fb = FB();
$registration_plugin_url =
  'http://www.facebook.com/plugins/registration.php?' .
  http_build_query(array(
    'client_id' => $fb->appId,
    'redirect_uri' => "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"
    ));
 
echo $registration_plugin_url;
?>

<pre><?php print_r($fb); ?></pre>
<?php if (!$fb->userId) { ?>
  <h3>Registration</h3>
  <iframe src="<?php echo $registration_plugin_url; ?>"
          scrolling="auto"
          frameborder="no"
          style="border:none"
          allowTransparency="true"
          width="600"
          height="330">
  </iframe>
<?php } else {
// print_r($fb->api('/me', array('fields' => 'friends')));

// print_r( $fb->api( '/oauth/access_token', array( 'client_id' => $fb->appId, 'client_secret' => $fb->secret, 'grant_type' => 'client_credentials' ), 'POST' ) );

// print_r( $fb->api( '/' . $fb->userId . '/scores', array( 'score' => 4, 'access_token' => $fb->appId . "|" . $fb->secret ), 'POST' ) );

// print_r( $fb->api( '/' . $fb->userId . '/scores' ) );

include 'race.html';

} ?>
