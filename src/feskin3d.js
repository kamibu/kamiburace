function FESkin3D( node ) {
    this._tempMatrix = new Matrix4();
    this._node = node;
    this._lastTransform = new jiglib.Matrix3D();
}

FESkin3D.prototype = {
    constructor: FESkin3D,
    set transform( trans ) {
        this._lastTransform = trans;
        this._tempMatrix.data = trans._rawData;
        this._node.setMatrix( this._tempMatrix.transpose() );
    },
    get transform() {
        return this._lastTransform;
    }
}
