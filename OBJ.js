// JavaScript Document
function OBJ( OBJ_file ) {
	SceneNode.call( this );
	this.model = null;
	this.mx=0;
	this.my=0;
	this.mz=0;
	this.rx=0;
	this.ry=0;
	this.rz=0;
	this.angle=0;
	this.c_l_x = 0;
	this.c_l_y = 0;
	this.c_r_x = 0;
	this.c_r_y = 0;
	
	this.keypressed=false;
	this.previousKey=0;
	var self = this;
	app.importer.load( OBJ_file, function( model ) {
		self.model = model;
		//model.rotate( new Vector3( [ 0, 1, 0 ] ), Math.PI ); 
		model.move( new Vector3([ 0 , -3 , 0] ) );
		self.appendChild( model );
	} );
}

OBJ.prototype = {
    constructor: OBJ,
	myMove: function() {
		this.move( new Vector3( [ this.mx ,this.my ,this.mz ] )  );
	},
	myRotate: function(x , y , z, angle){
		if(typeof x!='undefined'){
		    this.rotate( new Vector3( [ x ,y ,z ] ), angle );
		}
		else{
		  	this.rotate( new Vector3( [ this.rx ,this.ry ,this.rz ] ), this.angle );
		}
	},
	movement: function(){
		this.myMove();
		this.myRotate();
	}
	
};

OBJ.extend( SceneNode );