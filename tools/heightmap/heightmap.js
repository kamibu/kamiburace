var HEIGHTMAP_WIDTH = 512;
var HEIGHTMAP_HEIGHT = 512;

var app = new Application();

app.importer.load( 'race/Circuit.obj', function( node ) {
    var mesh, vertices, temp, l, maxX, minX, maxY, minY, maxZ, minZ;
    app.scene.appendChild( node );
    mesh = node.children[ 0 ].mesh;
    vertices = mesh.vertexAttributes.Position;

    temp = new Float32Array( 3 );
    l = vertices.length;

    vertices.getElement( 0, temp );

    maxX = minX = temp[ 0 ];
    maxY = minY = temp[ 1 ];
    maxZ = minZ = temp[ 2 ];

    for ( var i = 1; i < l; i++ ) {
        vertices.getElement( i, temp );

        if ( temp[ 0 ] > maxX  ) {
            maxX = temp[ 0 ];
        }
        else if ( temp[ 0 ] < minX ) {
            minX = temp[ 0 ];
        }

        if ( temp[ 1 ] > maxY  ) {
            maxY = temp[ 1 ];
        }
        else if ( temp[ 1 ] < minY ) {
            minY = temp[ 1 ];
        }

        if ( temp[ 2 ] > maxZ  ) {
            maxZ = temp[ 2 ];
        }
        else if ( temp[ 2 ] < minZ ) {
            minZ = temp[ 2 ];
        }
    }
    var width = maxX - minX;
    var height = maxY - minY;
    var depth = maxZ - minZ;
    console.log( minX, maxX, minY, maxY, minZ, maxZ );
    console.log( width, height, depth );

    app.camera.setPosition( new Vector3( [ minX + width / 2, maxY, minZ + depth / 2 ] ) );
    app.camera.setOrientation( new Quaternion().setAxisAngle( new Vector3( [ 1, 0, 0 ] ), -Math.PI / 2 ) );
    Matrix4.ortho( -width / 2, width / 2, -depth / 2, depth / 2, 0, height, app.camera.projectionMatrix ); 
    app.camera.setPerspective = function() {};

    //uber hacks!!
    var shader = new Shader();
    shader.setVertexSource( [
        'attribute vec3 Position;',
        'uniform mat4 WorldViewProjectionMatrix;',
        'varying float height;',
        'void main() {',
           'gl_Position = WorldViewProjectionMatrix * vec4( Position, 1.0 );',
           'height = gl_Position.z;',
        '}'
    ].join( '\n' ) );

    shader.setFragmentSource( [
        'precision highp float;',
        'varying float height;',
        'void main() {',
            'gl_FragColor = vec4( -height * 0.5 + 0.5);',
            'gl_FragColor.a = 1.0;',
        '}'
    ].join( '\n' ) );


    var mat = new Material();
    mat.shader = shader;
    mat.engineParameters = {
      WorldViewProjectionMatrix: true
    };
    node.children[ 0 ].material = mat;

    app.camera.setPerspective = function() {};
    app.resize( HEIGHTMAP_WIDTH, HEIGHTMAP_HEIGHT );
    var canvas = document.querySelector( 'canvas' );
    canvas.style.width = HEIGHTMAP_WIDTH + 'px';
    canvas.style.height = HEIGHTMAP_HEIGHT + 'px';

    var img = new Image();

    setTimeout( function() {
        img.src = canvas.toDataURL();
        img.style.position = 'absolute';
        img.style.left = '512px';
        document.body.appendChild( img );
        document.title = 'done';
    }, 1000 );
} );
