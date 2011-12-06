var X_AXIS = new Vector3( [ 1, 0, 0 ] );
var Y_AXIS = new Vector3( [ 0, 1, 0 ] );
var DEG_TO_RAD = Math.PI / 180;

var HEIGHTMAP_WIDTH = 512;
var HEIGHTMAP_HEIGHT = 512;

//Game Loader
var loader = new EventWaiter();

var app = new Application();

var system = jiglib.PhysicsSystem.getInstance();
system.setCollisionSystem( true );
system.setSolverType( 'NORMAL' );
system.setGravity( new Vector3D( 0, -15, 0, 0 ) );


//Load the terrain for collision
var img = new Image();
img.src = 'resources/race/heightmap.png';
img.onload = loader.callback( function() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = HEIGHTMAP_WIDTH;
    canvas.height = HEIGHTMAP_HEIGHT;
    var ctx = canvas.getContext( '2d' );
    ctx.drawImage( img, HEIGHTMAP_WIDTH, 0, -HEIGHTMAP_WIDTH, HEIGHTMAP_HEIGHT );


    var heights = [];
    var data = ctx.getImageData( 0, 0, HEIGHTMAP_WIDTH, HEIGHTMAP_HEIGHT ).data;
    for ( var i = 0; i < HEIGHTMAP_WIDTH; i++ ) {
        heights[ i ] = [];
        for ( var j = 0; j < HEIGHTMAP_HEIGHT; j++ ) {
                heights[ i ][ j ] = ( data[ ( i + j * 512 ) * 4 + 2 ] / 255 ) * 3.832738161087036 + 0.25025200843811035;
        }
    }

    var terrain = new jiglib.JTerrain( {
        minW: -87.72221374511719,
        minH: -381.7732849121094,
        maxW: 557.108154296875,
        maxH: 149.45797729492188,
        dw: 1.259434312582016,
        dh: 1.037561058998108,
        sw: 512,
        sh: 512,
        heights: heights
    }, true );
    system.addBody( terrain );
} );

var carBody, carMesh, wheel0, wheel1, wheel2, wheel3;
var startTime;

app.importer.load( 'race/Circuit.obj', function( c ) {
    app.scene.appendChild( c );
} );
app.importer.load( 'race/untitled.obj', loader.callback( function( c ) {
    carMesh = c;
} ) );
app.importer.load( 'race/Wheel1.obj', loader.callback( function( w ) {
    wheel0 = w;
} ) );
app.importer.load( 'race/Wheel2.obj', loader.callback( function( w ) {
    wheel1 = w;
} ) );
app.importer.load( 'race/Wheel3.obj', loader.callback( function( w ) {
    wheel2 = w;
} ) );
app.importer.load( 'race/Wheel4.obj', loader.callback( function( w ) {
    wheel3 = w;
} ) );

app.importer.load( 'race/Pilons.obj', loader.callback( function( node ) {
    app.scene.appendChild( node );
} ) );
app.importer.load( 'race/StreetLights.obj', loader.callback( function( node ) {
    app.scene.appendChild( node );
} ) );
app.importer.load( 'race/RoadSigns.obj', loader.callback( function( node ) {
    app.scene.appendChild( node );
} ) );
app.importer.load( 'race/Billboards.obj', loader.callback( function( node ) {
    app.scene.appendChild( node );
} ) );

var skybox = new Skybox( [
    'resources/skybox/east.jpg',
    'resources/skybox/west.jpg',
    'resources/skybox/up.jpg',
    'resources/skybox/down.jpg',
    'resources/skybox/north.jpg',
    'resources/skybox/south.jpg'
], 500 );
app.scene.appendChild( skybox );

app.input.onKey( 'DOWN_ARROW', { 
    callback: function() {
        carBody.setAccelerate( -2 );
    }, endCallback: function() {
        carBody.setAccelerate( 0 );
    } 
} );

app.input.onKey( 'UP_ARROW', {
    callback: function() {
        carBody.setAccelerate( 0.7 );
    }, endCallback: function() {
        carBody.setAccelerate( 0 );
    } 
} );

app.input.onKey( 'LEFT_ARROW', {
    callback: function() {
        carBody.setSteer( [ 0, 1 ], 1 );
    }, endCallback: function() {
        carBody.setSteer( [0, 1], 0 );
    }    
} );

app.input.onKey( 'RIGHT_ARROW', { 
    callback: function() {
        carBody.setSteer( [0, 1], -1 );
    }, endCallback: function() {
        carBody.setSteer( [0, 1], 0 );
    } 
} );

app.input.onKey( 'SPACE', {
    callback: function() {
        carBody.setHBrake( 1 );
    }, endCallback: function() {
        carBody.setHBrake( 0 );
    } 
} );


var idealCamera = null;

loader.on( 'complete', function() {

    //Setup physics
    carBody = new jiglib.JCar( new FESkin3D( carMesh ) );

    var maxSteerAngle = 30;
    var steerRate = 3;
    var driveTorque = 100;

    var width = 2;
    var height = 1.1;
    var depth = 4.5;

    carBody.setCar( maxSteerAngle, steerRate, driveTorque );
    carBody.get_chassis().set_sideLengths( new Vector3D( width, height, depth, 0 ) );
    carBody.get_chassis().moveTo( new Vector3D( 0, 4, 0 ) );
    carBody.get_chassis().set_mass( 100 );
    carBody.get_chassis().set_movable( false );

    setTimeout( function() {
        carBody.get_chassis().set_movable( true );
    }, 100 );

    system.addBody( carBody.get_chassis() );

    var wheelRadius = 0.5;
    var travel = 0.3;
    var sideFriction = 1.5;
    var fwdFriction = 2;
    var restingFrac = 0.3;
    var dampingFrac = 0.9;
    var rays = 2;
                
    carBody.setupWheel( 0, new Vector3D( -0.9, -0.35,  1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 1, new Vector3D(  0.9, -0.35,  1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 2, new Vector3D( -0.9, -0.35, -1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 3, new Vector3D(  0.9, -0.35, -1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );

    //Setup 3D Graphics
    idealCamera = new SceneNode().setPosition( new Vector3( [ 0, 2, -7 ] ) );
    carMesh.appendChild( idealCamera );

    app.scene.appendChild( carMesh );
    carMesh.appendChild( wheel0 );
    carMesh.appendChild( wheel1 );
    carMesh.appendChild( wheel2 );
    carMesh.appendChild( wheel3 );

    window.wheel0 = wheel0.setPosition( new Vector3( [ -0.9, -0.5,  1.35 ] ) );
    window.wheel1 = wheel1.setPosition( new Vector3( [ 0.9, -0.5,  1.35 ] ) );
    window.wheel2 = wheel2.setPosition( new Vector3( [ -0.9, -0.5, -1.35 ] ) );
    window.wheel3 = wheel3.setPosition( new Vector3( [ 0.9, -0.5, -1.35 ] ) );

    startTime = Date.now();

    app.update = function( dt ) {
        system.integrate( dt * 0.001 );

        var targetPosition = idealCamera.getAbsolutePosition();
        app.camera.setPosition( app.camera.getPosition().scale( 0.9 ).add( targetPosition.scale( 0.1 ) ) );
        lookAt( app.camera, carMesh, Y_AXIS );


        updateWheelsPositions();
        updateGUI();
    }
} );

function lookAt( camera, target, upVector ) {
    var z = camera.getAbsolutePosition().subtract( target.getAbsolutePosition() ).normalize();
    var y = upVector.clone().subtract( z.clone().scale( z.dot( upVector ) ) ).normalize();
    var x = y.clone().cross( z );

    var m = new Matrix3();
    m.data[ 0 ] = x.data[ 0 ];
    m.data[ 1 ] = x.data[ 1 ];
    m.data[ 2 ] = x.data[ 2 ];

    m.data[ 3 ] = y.data[ 0 ];
    m.data[ 4 ] = y.data[ 1 ];
    m.data[ 5 ] = y.data[ 2 ];

    m.data[ 6 ] = z.data[ 0 ];
    m.data[ 7 ] = z.data[ 1 ];
    m.data[ 8 ] = z.data[ 2 ];

    camera.orientation = new Quaternion().fromMatrix3( m );
}

function updateWheelsPositions() {
    var wheels = carBody.get_wheels();
    wheel0.position.data[ 1 ] = wheels[ 0 ].getActualPos().y;
    wheel0.setOrientation( new Quaternion().setAxisAngle( X_AXIS, wheels[ 0 ].getAxisAngle() * DEG_TO_RAD ) );
    wheel0.rotate( Y_AXIS, wheels[ 0 ].getSteerAngle() * DEG_TO_RAD );

    wheel1.position.data[ 1 ] = wheels[ 1 ].getActualPos().y;
    wheel1.setOrientation( new Quaternion().setAxisAngle( X_AXIS, wheels[ 0 ].getAxisAngle() * DEG_TO_RAD ) );
    wheel1.rotate( Y_AXIS, wheels[ 0 ].getSteerAngle() * DEG_TO_RAD );

    wheel2.position.data[ 1 ] = wheels[ 2 ].getActualPos().y;
    wheel2.setOrientation( new Quaternion().setAxisAngle( X_AXIS, wheels[ 0 ].getAxisAngle() * DEG_TO_RAD ) );

    wheel3.position.data[ 1 ] = wheels[ 3 ].getActualPos().y;
    wheel3.setOrientation( new Quaternion().setAxisAngle( X_AXIS, wheels[ 0 ].getAxisAngle() * DEG_TO_RAD ) );
}

function updateGUI() {
    time = Date.now() - startTime;
    var min = Math.floor( time / 60000 ) + "";
    var sec = Math.floor( ( time % 60000 ) / 1000 ) + "";
    var ms = ( time % 1000 ) + "";

    min = "00".substr( min.length ) + min;
    sec = "00".substr( sec.length ) + sec;
    ms = "000".substr( ms.length ) + ms;
    document.getElementById( 'timer' ).innerHTML = min + ":" + sec + "," + ms;

    document.getElementById( 'speed' ).innerHTML = getSpeed() + ' km/h';
}

function getSpeed() {
    var v = carBody.get_chassis().getVelocity( new Vector3D( 0, 0, 0 ) );
    var o = carBody.get_wheels()[ 0 ].wheelFwd;
    return Math.floor( v.dotProduct( o ) );
}
