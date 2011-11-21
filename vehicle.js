function Vehicle( carBody ) {
    this.accelerationRate = 0.1;
    this.maxSpeed = 100;
    this.minSpeed = -10;
    this.steerRate = 0.1;

    this.velocity = new Vector3( [ 0, 0, 0 ] );
    this.steer = 0;

    this.body = carBody;
    this.pivotPoint = new SceneNode();
    this.body.appendChild( this.pivotPoint );
}

Vehicle.prototype = {
    accelerate: function() {
        if ( this.speed < this.maxSpeed ) {
            this.speed += this.accelerationRate;
        }
    },
    decelerate: function() {
        if ( this.speed > this.minSpeed ) {
            this.speed -= this.accelerationRate;
        }
    },
    steerLeft: function() {
        this.steerDirection -= this.steerRate;
    },
    steerRight: function() {
        this.steerDirection += this.steerRate;
    },
    update: function() {
        if ( this.steer ) {
            this.body.rotate( 
        }
        else {
            this.body.move( new Vector3( [ 0, 0 0 ] ) );
        }
    }
};
