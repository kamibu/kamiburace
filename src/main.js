var X_AXIS = new Vector3( [ 1, 0, 0 ] );
var Y_AXIS = new Vector3( [ 0, 1, 0 ] );
var DEG_TO_RAD = Math.PI / 180;

var app = new Application();
app.camera.setPosition( new Vector3( [ 0, 10, 30 ] ) );
app.camera.setOrientation( new Quaternion().setAxisAngle( X_AXIS, -Math.PI / 9 ) );

var system = jiglib.PhysicsSystem.getInstance();
system.setCollisionSystem( true );
system.setSolverType( 'ACCUMULATED' );
system.setGravity( new Vector3D( 0, -9.8, 0, 0 ) );


//var terrain = new jiglib.JTerrain( {
//    get minW() {
//        return -10;
//    },
//    get minH() {
//        return -10;
//    },
//    get maxW() {
//        return 10;
//    },
//    get maxH() {
//        return 10;
//    },
//    get dw() {
//        return 1;
//    },
//    get dh() {
//        return 1;
//    },
//    get sw() {
//        return 20;
//    },
//    get sh() {
//        return 20;
//    },
//    get heights() {
//        return this._array;
//    },
//    _array: [ 
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ],
//        [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6 ]
//    ]
//}, true );
//system.addBody( terrain );


var ground = new jiglib.JPlane();
ground.set_y( 0 );
ground.set_rotationX( 90 );
ground.set_movable( false );
system.addBody( ground );

var carBody = null;
var carMesh, wheel0, wheel1, wheel2, wheel3;
var loaded = false;

function onPartsLoaded() {
    app.scene.appendChild( carMesh );

    window.wheel0 = wheel0.setPosition( new Vector3( [ -0.9, -0.5,  1.35 ] ) );
    window.wheel1 = wheel1.setPosition( new Vector3( [ 0.9, -0.5,  1.35 ] ) );
    window.wheel2 = wheel2.setPosition( new Vector3( [ -0.9, -0.5, -1.35 ] ) );
    window.wheel3 = wheel3.setPosition( new Vector3( [ 0.9, -0.5, -1.35 ] ) );

    carMesh.appendChild( wheel0 );
    carMesh.appendChild( wheel1 );
    carMesh.appendChild( wheel2 );
    carMesh.appendChild( wheel3 );

    carBody = new jiglib.JCar( new FESkin3D( carMesh ) );

    var maxSteerAngle = 30;
    var steerRate = 3;
    var driveTorque = 100;

    var width = 2;
    var height = 1.1;
    var depth = 4.5;
    
    carBody.setCar( maxSteerAngle, steerRate, driveTorque );
    carBody.get_chassis().set_sideLengths( new Vector3D( width, height, depth, 0 ) );
    carBody.get_chassis().moveTo( new Vector3D( 0, 5, -5 ) );
    carBody.get_chassis().set_mass( 80 );
    system.addBody( carBody.get_chassis() );

    var wheelRadius = 0.5;
    var travel = 0.3;
    var sideFriction = 1.7;
    var fwdFriction = 1.5;
    var restingFrac = 0.3;
    var dampingFrac = 0.9;
    var rays = 2;
                
    carBody.setupWheel( 0, new Vector3D( -0.9, -0.5,  1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 1, new Vector3D(  0.9, -0.5,  1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 2, new Vector3D( -0.9, -0.5, -1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );
    carBody.setupWheel( 3, new Vector3D(  0.9, -0.5, -1.35 ), sideFriction, fwdFriction, travel, wheelRadius, restingFrac, dampingFrac, rays );

    loaded = true;
}

var w = new EventWaiter();
app.importer.load( 'race/untitled.obj', w.callback( function( c ) {
    console.log( c );
    carMesh = c;
} ) );
app.importer.load( 'race/Wheel1.obj', w.callback( function( w ) {
    wheel0 = w;
} ) );
app.importer.load( 'race/Wheel2.obj', w.callback( function( w ) {
    wheel1 = w;
} ) );
app.importer.load( 'race/Wheel3.obj', w.callback( function( w ) {
    wheel2 = w;
} ) );
app.importer.load( 'race/Wheel4.obj', w.callback( function( w ) {
    wheel3 = w;
} ) );
w.on( 'complete', onPartsLoaded );

document.onkeydown = function( e ){
    switch(e.keyCode)
    {
        case 32:
            carBody.setHBrake(1);
            return false;
        case 38:
            carBody.setAccelerate(0.7);
            return false;
        case 40:
            carBody.setAccelerate( -0.2 );
            return false;
        case 37:
            carBody.setSteer([0, 1], 1);
            return false;
        case 39:
            carBody.setSteer([0, 1], -1);
            return false;
    }
}

document.onkeyup = function( e ){
    switch(e.keyCode)
    {
        case 32:
            carBody.setHBrake(0);
            return false;
        case 38:
            carBody.setAccelerate(0);
            return false;
        case 40:
            carBody.setAccelerate(0);
            return false;
        case 37:
            carBody.setSteer([0, 1], 0);
            return false;
        case 39:
            carBody.setSteer([0, 1], 0);
            return false;
    }
}


app.update = function( dt ) {
    system.integrate( dt * 0.001 );
	
    if ( !loaded ) {
        return;
    }

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
