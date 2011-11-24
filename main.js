var app = new Application();

var callback = app.scene.appendChild.bind( app.scene );
//app.importer.load( 'race/Car.obj', function( node ) {
node = new Cube();
app.camera.setPosition( new Vector3( [ 0, 2, 10 ] ) );

var v = new Vehicle( {
    carBody: node,
    wheel: node
} );
v.move( new Vector3( [ 0, 2, 0 ] ) );
v.appendChild( app.camera );
app.scene.appendChild( v );
setInterval( function() {
    v.update( 16 );
}, 16 );
//} );
app.importer.load( 'race/Circuit.obj', callback );
app.importer.load( 'race/Pilons.obj', callback );
app.importer.load( 'race/StreetLights.obj', callback );
app.importer.load( 'race/RoadSigns.obj', callback );
app.importer.load( 'race/Billboards.obj', callback );

var skybox = new Skybox( [
    'resources/skybox/east.jpg',
    'resources/skybox/west.jpg',
    'resources/skybox/up.jpg',
    'resources/skybox/down.jpg',
    'resources/skybox/north.jpg',
    'resources/skybox/south.jpg'
], 500 );
app.scene.appendChild( skybox );

app.input.onKey( 'A',function(){
    v.steerTo( -0.1 );
} );
app.input.onKey( 'D',function(){
    v.steerTo( 0.1 );
} );
app.input.onKey( 'W', function() {
    v.accelerateTo( 140 );
} );
app.input.onKeyUp( ['W','S'], function() {
    v.accelerateTo( 0 );
} );

app.input.onKeyUp( ['A','D'], function() {
    v.steerTo( 0 );
} );

app.input.onKey( 'S', function() {
    v.accelerateTo( -10 );
} );
