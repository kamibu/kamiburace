function Vehicle( options ) {
    /*
                            |    /
                  front   - | + /<-steer angle
            ________________|  /
            |               | /
            |               |/
     wheel0 /---------------/ wheel1
            |       |       |
            |       |       |
            |       |       |
            |       |       |
            |   wheelbase   |
            |       |       |
            |       |       |
            |       |       |
            |       |       |
    wheel2  0---------------0 wheel3
            |     track     |
            |_______________|

                  back
    */
    SceneNode.call( this );

    options = options || {};
    //Vehicle Properties
    this.track = options.track || 2.5;
    this.wheelbase = options.wheelbase || 4.5;

    this.accelerationRate = options.accelerationRate || 16; // meters / second ^ 2
    this.steerRate = options.steerRate || 1; // degrees / second

    this.maxSpeed = options.maxSpeed || 100;
    this.minSpeed = options.minSpeed || -10;

    //State
    this.speed = 0;
    this.steer = 0;

    //Visual elements
    this.body = new Drawable();
    this.wheel0 = new Drawable();
    this.wheel0.material.setParameter( 'Diffuse', new Vector3( [ 1, 0, 0 ] ) );

    this.wheel1 = new Drawable();
    this.wheel1.material.setParameter( 'Diffuse', new Vector3( [ 1, 1, 0 ] ) );

    this.wheel2 = new Drawable();
    this.wheel2.material.setParameter( 'Diffuse', new Vector3( [ 0, 1, 0 ] ) );

    this.wheel3 = new Drawable();
    this.wheel3.material.setParameter( 'Diffuse', new Vector3( [ 1, 0, 1 ] ) );

    //Internal use
    this._targetSpeed = 0;
    this._targetSteer = 0;
    this._pauseSimulation = false;

    this._pivotPoint = new Cube();
    this._pivotPoint.setPosition( new Vector3( [ 0, 0, this.wheelbase / 2 ] ) );
    this._pivotPoint.material.setParameter( 'Diffuse', new Vector3( [ 0, 0, 1 ] ) );

    this._pivotAxis = new Vector3( [ 0, 1, 0 ] );

    //Initialization
    this.body.mesh = options.carBody.mesh;

    this.wheel0.setPosition( new Vector3( [ -this.track / 2, 0, -this.wheelbase / 2 ] ) );
    this.wheel0.mesh = options.wheel.mesh;

    this.wheel1.setPosition( new Vector3( [ this.track / 2, 0, -this.wheelbase / 2 ] ) );
    this.wheel1.mesh = options.wheel.mesh;

    this.wheel2.setPosition( new Vector3( [ -this.track / 2, 0, this.wheelbase / 2 ] ) );
    this.wheel2.mesh = options.wheel.mesh;

    this.wheel3.setPosition( new Vector3( [ this.track / 2, 0, this.wheelbase / 2 ] ) );
    this.wheel3.mesh = options.wheel.mesh;

    this.appendChild( this.body );
    this.appendChild( this.wheel0 );
    this.appendChild( this.wheel1 );
    this.appendChild( this.wheel2 );
    this.appendChild( this.wheel3 );
    
    this.appendChild( this._pivotPoint );
}

Vehicle.prototype = {
    steerTo: function( direction ) {
        this._targetSteer = direction;
    },
    accelerateTo: function( speed ) {
        this._targetSpeed = speed;
    },
    update: function( dt ) { // Time to advance the simulation in milliseconds

        var deltaSpeed = this._targetSpeed - this.speed;
        if ( Math.abs( deltaSpeed ) < 0.1 ) {
            this.speed = this._targetSpeed;
        }
        else {
            if ( deltaSpeed > 0 ) {
                this.speed += this.accelerationRate * dt * 0.001;
            }
            else {
                this.speed -= this.accelerationRate * dt * 0.001;
            }
        }

        var deltaSteer = this._targetSteer - this.steer;
        if ( Math.abs( deltaSteer ) < 0.01 ) {
            this.steer = this._targetSteer;
        }
        else {
            if ( deltaSteer > 0 ) {
                this.steer += this.steerRate * dt * 0.001;
            }
            else {
                this.steer -= this.steerRate * dt * 0.001;
            }
        }

        var distance = this.speed * dt * 0.001;
        //The vehicle is steering right
        if ( this.steer > 0 ) {
            this._pivotPoint.setPosition( new Vector3( [ this.track * 0.5 + this.wheelbase / Math.tan( this.steer ), 0, this.wheelbase * 0.5  ] ) );
            this.rotate( this._pivotAxis, -Math.atan( distance / this._pivotPoint.position.length() ), this._pivotPoint );
        }
        //The vehicle is steering left
        else if ( this.steer < 0 ) {
            this._pivotPoint.setPosition( new Vector3( [ -this.track * 0.5 + this.wheelbase / Math.tan( this.steer ), 0, this.wheelbase * 0.5  ] ) );
            this.rotate( this._pivotAxis, Math.atan( distance / this._pivotPoint.position.length() ), this._pivotPoint );
        }
        //The vehicle is moving straight
        else {
            this.move( this.orientation.multiplyVector3( new Vector3( [ 0, 0, -distance ] ) ) );
        }
    }
};

Vehicle.extend( SceneNode );
