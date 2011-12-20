tempTransform = new btTransform();
tempQuaternion = new btQuaternion();
// This function sets up the physics scene.
var m_vehicle = null;
var maxEngineForce = 0.0;
var gEngineForce = 0.0;
var gBreakingForce = 0.0;
var gVehicleSteering = 0.0;

var WHEEL_X = 0.83;
var WHEEL_Z = 1.35;

function RaceApplication() {
    Application.call( this );

    var car = this.car = new SceneNode();
    var self = this;

    var carMesh;
    this.wheelMeshes = [];

    var loader = new EventWaiter();

    this.importer.load( 'race/untitled.obj', loader.callback( function( mesh ) {
        console.log( 'carMesh' );
        carMesh = mesh;
        car.appendChild( carMesh );
    } ) );

    this.importer.load( 'race/Wheel1.obj', loader.callback( function( w ) {
        self.wheelMeshes.push( w );
        self.scene.appendChild( w );
    } ) );

    this.importer.load( 'race/Wheel2.obj', loader.callback( function( w ) {
        self.wheelMeshes.push( w );
        self.scene.appendChild( w );
    } ) );

    this.importer.load( 'race/Wheel3.obj', loader.callback( function( w ) {
        self.wheelMeshes.push( w );
        self.scene.appendChild( w );
    } ) );

    this.importer.load( 'race/Wheel4.obj', loader.callback( function( w ) {
        self.wheelMeshes.push( w );
        self.scene.appendChild( w );
    } ) );

    loader.on( 'complete', function() {
        console.log( 'complete' );
        self.loaded = true;
    } );
    
    /*
    this.importer.load( 'race/Circuit.obj', function( c ) {
        app.scene.appendChild( c );
    } );
    */

    this.scene.appendChild( car );

    this.input.onKey( 'DOWN_ARROW', { 
        callback: function() {
            gEngineForce = -0.5 * maxEngineForce;
        }, endCallback: function() {
            gEngineForce = 0.0;
            gBreakingForce = 0.0;
        },
        repeat: false,
    } );

    this.input.onKey( 'UP_ARROW', {
        callback: function() {
            gEngineForce = maxEngineForce;
            gBreakingForce = 0.0;
        }, endCallback: function() {
            gEngineForce = 0.0;
            gBreakingForce = 0.0;
        },
        repeat: false,
    } );

    this.input.onKey( 'LEFT_ARROW', {
        callback: function() {
            gVehicleSteering = 0.3;
        }, endCallback: function() {
            gVehicleSteering = 0;
        },   
        repeat: false,
    } );

    this.input.onKey( 'RIGHT_ARROW', { 
        callback: function() {
            gVehicleSteering = -0.3;
        }, endCallback: function() {
            gVehicleSteering = 0;
        },
        repeat: false,
    } );
}

RaceApplication.extend( Application );

RaceApplication.prototype.createRigidBody = function( mass, startTransform, shape ) {
    var localInertia = new btVector3( 0, 0, 0 );

    // rigidbody is dynamic if and only if mass is non zero, otherwise static
    if ( mass ) {
        shape.calculateLocalInertia( mass, localInertia );
    }

    var myMotionState = new btDefaultMotionState( startTransform );
    var cInfo = new btRigidBodyConstructionInfo( mass, myMotionState, shape, localInertia );
    var body = new btRigidBody( cInfo );
    body.setLinearVelocity( new btVector3( 0, 0, 0 ) );
    body.setAngularVelocity( new btVector3( 0, 0, 0 ) );
    body.setContactProcessingThreshold( 1000000 );

    this.m_dynamicsWorld.addRigidBody(body);
    return body;
}

RaceApplication.prototype.initPhysics = function(){
    // Setup collision detection
    var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var overlappingPairCache = new Ammo.btDbvtBroadphase();

    // Setup solver and world
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.m_dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    this.m_dynamicsWorld.setGravity( new btVector3(0, -9.82, 0));


    // Create infinite ground plane 50 meters down. This is to make sure things don't fall down to infinity and irritate our collision detection
    var aabbShape = new Ammo.btStaticPlaneShape( new btVector3(0, 1, 0), 0);
    var aabbTransform = new Ammo.btTransform();
    aabbTransform.setIdentity();
    this.createRigidBody(0, aabbTransform, aabbShape);
};

RaceApplication.prototype.spawnVehicle = function( bodyGeometry, wheelGeometries ) {
    var wheelDirectionCS0 = new Ammo.btVector3(0,-1,0);
    var wheelAxleCS = new Ammo.btVector3(-1,0,0);

    gEngineForce = 0.0;
    gBreakingForce = 0.0;

    maxEngineForce = 1000.0;//th should be engine/velocity dependent
    maxBreakingForce = 100.0;

    gVehicleSteering = 0.0;
    var steeringIncrement = 0.06;
    var steeringClamp = 0.3;
    var wheelRadius = 0.4;
    var wheelWidth = 0.3;
    var wheelFriction = 1000;//BT_LARGE_VAR;
    var suspensionStiffness = 20.0;
    var suspensionDamping = 2.3;
    var suspensionCompression = 4.4;
    var suspensionRestLength = 0.6;
    var rollInfluence = 0.1;//1.0f;

    var m_collisionShapes = [];

    var localTrans = new Ammo.btTransform();
    localTrans.setIdentity();

    var chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1,0.7,2.5));
    m_collisionShapes.push(chassisShape);
  
    var compound = new Ammo.btCompoundShape();
    m_collisionShapes.push(compound);
    var localTrans = new Ammo.btTransform();
    localTrans.setIdentity();

    var tr = new Ammo.btTransform();
    tr.setIdentity();

    // localTrans effectively shifts the center of mass with respect to the chassis
    localTrans.setOrigin(new Ammo.btVector3(0,1.3,0));
    compound.addChildShape(localTrans,chassisShape);
    tr.setOrigin(new Ammo.btVector3(-6,0,-6));

    m_carChassis = this.createRigidBody(50,tr,compound);
    //m_carChassis.setDamping(0.2,0.2);
  
    var m_wheelShape = new Ammo.btCylinderShapeX(new Ammo.btVector3(wheelWidth,wheelRadius,wheelRadius));
  
    // --- create vehicle ---
    var m_tuning = new Ammo.btVehicleTuning();
    var m_vehicleRayCaster = new Ammo.btDefaultVehicleRaycaster(this.m_dynamicsWorld);
    m_vehicle = new Ammo.btRaycastVehicle(m_tuning, m_carChassis, m_vehicleRayCaster);

    ///never deactivate the vehicle
    m_carChassis.setActivationState(4);
    var connectionHeight = 1.3;
    var isFrontWheel = true;

    // choose coordinate system
    m_vehicle.setCoordinateSystem( 0, 1, 2 );

    var connectionPointCS0 = new Ammo.btVector3( WHEEL_X,
						connectionHeight,
						WHEEL_Z);

    m_vehicle.addWheel(connectionPointCS0,
		       wheelDirectionCS0,
		       wheelAxleCS,
		       suspensionRestLength,
		       wheelRadius,
		       m_tuning,
		       isFrontWheel);

    connectionPointCS0 = new Ammo.btVector3( -WHEEL_X,
					    connectionHeight,
					    WHEEL_Z);

    m_vehicle.addWheel(connectionPointCS0,
		       wheelDirectionCS0,
		       wheelAxleCS,
		       suspensionRestLength,
		       wheelRadius,
		       m_tuning,
		       isFrontWheel);
    connectionPointCS0 = new Ammo.btVector3(-WHEEL_X,
					    connectionHeight,
					    -WHEEL_Z);
    isFrontWheel = false;
    m_vehicle.addWheel(connectionPointCS0,
		       wheelDirectionCS0,
		       wheelAxleCS,
		       suspensionRestLength,
		       wheelRadius,
		       m_tuning,
		       isFrontWheel);

    connectionPointCS0 = new Ammo.btVector3( WHEEL_X,
					    connectionHeight,
					    -WHEEL_Z);

    m_vehicle.addWheel(connectionPointCS0,
		       wheelDirectionCS0,
		       wheelAxleCS,
		       suspensionRestLength,
		       wheelRadius,
		       m_tuning,
		       isFrontWheel);
		
    for (var i=0; i<m_vehicle.getNumWheels(); i++){
      var wheel = m_vehicle.getWheelInfo(i);
      wheel.set_m_suspensionStiffness(suspensionStiffness);
      wheel.set_m_wheelsDampingRelaxation(suspensionDamping);
      wheel.set_m_wheelsDampingCompression(suspensionCompression);
      wheel.set_m_frictionSlip(wheelFriction);
      wheel.set_m_rollInfluence(rollInfluence);
    }
    this.m_dynamicsWorld.addVehicle(m_vehicle );
}

RaceApplication.prototype.update = function( dt ){
    if ( !this.loaded ) {
        return;
    }

    if(m_vehicle){
        m_vehicle.applyEngineForce(gEngineForce,2);
        m_vehicle.setBrake(gBreakingForce,2);
        m_vehicle.applyEngineForce(gEngineForce,3);
        m_vehicle.setBrake(gBreakingForce,3);
        m_vehicle.setSteeringValue(gVehicleSteering,0);
        m_vehicle.setSteeringValue(gVehicleSteering,1);
    }

    if ( this.m_dynamicsWorld ) {
       this.m_dynamicsWorld.stepSimulation( dt );
    }

    // Position
    m_carChassis.getMotionState().getWorldTransform( tempTransform );

    var origin = tempTransform.getOrigin();
    TempVars.lock();
    var pos = TempVars.getVector3();
    pos.data[ 0 ] = origin.x();
    pos.data[ 1 ] = origin.y();
    pos.data[ 2 ] = origin.z();
    this.car.setPosition( pos );
    
    var rot = tempTransform.getRotation();

    var quat = TempVars.getQuaternion();
    quat.data[ 0 ] = rot.x();
    quat.data[ 1 ] = rot.y();
    quat.data[ 2 ] = rot.z();
    quat.data[ 3 ] = rot.w();

    this.car.setOrientation( quat );
    TempVars.release();

    this.updateWheels();
};

RaceApplication.prototype.updateWheels = function() {
    for ( var i = 0; i < 4; ++i ) {
        m_vehicle.updateWheelTransform( i, true );
        var wheel = this.wheelMeshes[ i ];

        var transform = m_vehicle.getWheelInfo(i).get_m_worldTransform();
        var origin = transform.getOrigin();
        var rot = transform.getRotation();

        TempVars.lock();
        var pos = TempVars.getVector3();
        pos.data[ 0 ] = origin.x();
        pos.data[ 1 ] = origin.y() - 1.13;
        pos.data[ 2 ] = origin.z();
        wheel.setPosition( pos );

        var quat = TempVars.getQuaternion();
        quat.data[ 0 ] = rot.x();
        quat.data[ 1 ] = rot.y();
        quat.data[ 2 ] = rot.z();
        quat.data[ 3 ] = rot.w();

        wheel.setOrientation( quat );

        TempVars.release();
    }
};

var app = new RaceApplication();
app.initPhysics();
app.spawnVehicle();
