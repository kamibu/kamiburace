var X_AXIS = new Vector3( [ 1, 0, 0 ] );
var Y_AXIS = new Vector3( [ 0, 1, 0 ] );
var DEG_TO_RAD = Math.PI / 180;

var app = new Application();

var system = jiglib.PhysicsSystem.getInstance();
system.setCollisionSystem( true );
system.setSolverType( 'NORMAL' );
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
var startTime;

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
    carBody.get_chassis().moveTo( new Vector3D( 0, 2, 0 ) );
    carBody.get_chassis().set_mass( 80 );
    carBody.get_chassis().set_movable( false );
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

    loaded = true;
    startTime = Date.now();
}

var w = new EventWaiter();
var circuit;
app.importer.load( 'race/Circuit.obj', function( c ) {
    circuit = c;
    circuit.setScale( 0.5 );
    circuit.move( new Vector3( [ 0, -1, 0 ] ) );
    app.scene.appendChild( circuit );
} );
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

var brake = -0.2;

app.input.onKey( 'DOWN_ARROW', { 
    callback: function() {
        if ( getSpeed() <= 10 ) {
            carBody.setAccelerate( 0.2 );
            return;
        }
        brake -= 0.1;
        carBody.setAccelerate( brake );
    }, endCallback: function() {
        console.log( 'brake end', brake );
        brake = -0.2;
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

started = false;

app.onBeforeRender = function( dt ) {
    // var campos = app.camera.getPosition();
    // campos.data[ 1 ] = 4;
    // app.camera.setPosition( campos );
    if ( !started ) { return; }
    var pos = carMesh.getPosition();
    // var roty = Math.acos( carMesh.getMatrix().data[ 0 ] );
    // app.camera.setPosition( pos ).move( new Vector3( [ Math.sin( roty ) * 12, 4, Math.cos( roty ) * 12 ] ) );
    // app.camera.setOrientation( carMesh.getOrientation() );
};

app.update = function( dt ) {
    system.integrate( dt * 0.001 );
	
    if ( !loaded ) {
        return;
    }

    if ( !started ) {
        carBody.get_chassis().set_movable( true );
        started = true;
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

    time = Date.now() - startTime;
    var min = Math.floor( time / 60000 ) + "";
    var sec = Math.floor( ( time % 60000 ) / 1000 ) + "";
    var ms = ( time % 1000 ) + "";

    min = "00".substr( min.length ) + min;
    sec = "00".substr( sec.length ) + sec;
    ms = "000".substr( ms.length ) + ms;
    document.getElementById( 'timer' ).innerHTML = min + ":" + sec + "," + ms;

    document.getElementById( 'speed' ).innerHTML = getSpeed() + ' km/h';

    // var rot = carMesh.get
    // var rot = 
    // app.camera.setPosition( new Vector3( [ 0, 4, -12 ] ) );
    // app.camera.rotate( new Vector3( [ 0, 1, 0 ] ), Math.PI );
    carMesh.appendChild( app.camera );
}

function getSpeed() {
    return 0;
    if ( !started ) {
        return 0;
    }
    var v = carBody.get_chassis().getVelocity( new Vector3D( 0, 0, 0 ) );
    var o = carBody.get_wheels()[ 0 ].wheelFwd;
    return Math.floor( v.dotProduct( o ) );
}
