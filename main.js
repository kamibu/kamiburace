var app = new Application();
var car = new OBJ('race/Car.obj');
var circuit = new OBJ('race/Circuit.obj');
var pilons = new OBJ( 'race/Pilons.obj' );
var streetLights = new OBJ( 'race/StreetLights.obj' );
var roadSigns = new OBJ( 'race/RoadSigns.obj' );
var billboards = new OBJ( 'race/Billboards.obj' );
var z_acc = 0;
var y_acc = 0;
var y_euler = 0;
var STEER_SPEED = 0.03;
var SPEED = 0.3;
var MAX_SPEED = 5;
var MAX_ANGLE = 0.04;
var ANGULAR_VELOCITY = 0.01;
var LINEAR_VELOCITY = 0.001;
var AIR_VELOCITY = 0;
var G1 = 0.01;
var G2 = 0.015;
var G3 = 0.02;
var dy = 0;
var collidedx = 1;
var collidedz = 1;
var dz = -0.1,dzTimer=0,dzMax=30;
var score = 0;
var timeRemaining = 120;
var gameover = false;
var brake = true;
var angle_flag = true;
var timeInterval;
var parent = new SceneNode();
var gdy;




//floor.repeatTexture(105);
//floor.setMaterial( new TexturedMaterial('resources/road.jpg') );
//floor.setMaterial( new TexturedMaterial('resources/car-circuit/Circuit_Collision.png') );
//floor.move( new Vector3( [ 500, -10, 259 ] ) );


//circuit.move( new Vector3( [ 0 , 2 , -27 ] ) );
//circuit.setScale( 2 );
app.scene.appendChild( circuit );
app.scene.appendChild( pilons );
app.scene.appendChild( streetLights );
app.scene.appendChild( roadSigns );
app.scene.appendChild( billboards );

var skybox = new Skybox( [
    'resources/skybox/east.jpg',
    'resources/skybox/west.jpg',
    'resources/skybox/up.jpg',
    'resources/skybox/down.jpg',
    'resources/skybox/north.jpg',
    'resources/skybox/south.jpg'
], 500 );
//skybox.move( new Vector3([0,400,0]) );
//parent.move( new Vector3([0,-400,0]) );
app.scene.appendChild( skybox );

var coin = [];
var mat = new BasicMaterial();
mat.setParameter( 'Diffuse' , new Vector3([1,1,0]) );

var acc = 0;

//app.scene.appendChild( floor );

car.rotate( new Vector3([0,1,0]), Math.PI);
parent.appendChild( car );
app.scene.appendChild( parent );

var angle = 0;

app.update = function( dt ){
	if ( car ) {
        var position = car.getAbsolutePosition();
        var orientation = parent.getAbsoluteOrientation();

        position.data[ 0 ] += Math.sin( angle ) * 10;
		position.data[ 1 ] += 1;
        position.data[ 2 ] += Math.cos( angle ) * 10;

        var delta = app.camera.getAbsolutePosition().subtract( position );

        delta.scale( delta.length() * -0.4 );
        app.camera.move( delta );

		var target = app.camera.getOrientation().slerp( orientation, 0.08 );
        app.camera.setOrientation( target );
		
		AIR_VELOCITY = Math.sqrt( z_acc )/1000;
		
        z_acc += acc - LINEAR_VELOCITY - AIR_VELOCITY;

        if ( z_acc < 0 ) {
            z_acc = 0;
        }
        else if ( z_acc > MAX_SPEED ) {
            z_acc = MAX_SPEED;
        }

		parent.move( new Vector3( [ -SPEED * z_acc * collidedx * Math.sin( angle ), 0, -SPEED * z_acc * collidedz * Math.cos( angle ) ] ) );
		
        if ( z_acc != 0 ) {
            gdy = STEER_SPEED * car.keypressed ;
            
            var S_gdy = gdy;
            
            if( dy != 0 ){
                S_gdy = gdy - ANGULAR_VELOCITY  * ( Math.pow( 1.085 , z_acc+5 ) ) * ( dy ) / Math.abs( dy ); 
            }
             
            if( S_gdy*gdy < 0 ){
                S_gdy = 0;
            }
            
            dy += S_gdy/10;
            if( dy > MAX_ANGLE || dy < -MAX_ANGLE  ){
                dy = dy / Math.abs( dy ) * MAX_ANGLE;
            }
            
            if( Math.abs( dy ) < 0.005 && S_gdy*dy>0 && gdy==0){
             dy=0;
            }
				
			angle -= dy;
			parent.rotate(new Vector3([ 0 , -1 , 0]), dy ); 
		}
		else{
			dy = 0;
		}
	}
}

function steerLeft() {
		car.keypressed=-1;
}
function steerRight() {
		car.keypressed =1;
}

app.input.onKey( 'A',function(){
		car.keypressed=-1;
	}
);
app.input.onKey( 'D',function(){
			car.keypressed =1;
} );
app.input.onKey( 'W', function() {
        acc = G1;
} );
app.input.onKeyUp( ['W','S'], function() {
    acc = -0.01;
    brake = true;
} );

app.input.onKey( 'S', function() {
    acc = -0.03;
} );

app.input.onKeyUp( ['A','D'], function() {
	car.previousKey = car.keypressed;
	car.keypressed  = false;
} );
