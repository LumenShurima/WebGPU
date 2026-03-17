

class Vector3 {

    /**
     * 새로운 3차원 벡터를 생성.
     * @param {number} [x=0] 
     * @param {number} [y=0] 
     * @param {number} [z=0]
     */
    constructor( x=0, y=0, z=0 ) {
        /**
         * 이 플래그는 타입을 확인하기 위해 사용합니다.
         * 
         * @type {boolean}
         * @readonly
         * @default true
         */
        Vector3.prototype.isVector3 = true;

        /**
         * @type {number}
         */
        this.x = x;

        /**
         * @type {number}
         */
        this.y = y;

        /**
         * @type {number}
         */
        this.z = z;
    }

    /**
     * 벡터 구성 요소 설정.
     * 
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {Vector3}
     */
    set(x,y,z) {
        if( z === undefined ) z = this.z;

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    /**
     * 벡터 구성 요소를 동일한 값으로 설정.
     * 
     * @param {number} scalar 이 값은 모든 벡터 구성 요소에 적용.
     * @return {Vector3} 이 벡터 참조를 반환.
     */

    setScalar( scalar ) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;

        return this;
    }

    /**
     * 벡터의 x 성분을 주어진 값으로 설정.
     * 
     * @param {number} x
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setX( x ) {
        this.x = x;

        return this;
    }

    /**
     * 벡터의 y 성분을 주어진 값으로 설정.
     * 
     * @param {number} y
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setX( y ) {
        this.y = y;

        return this;
    }

    /**
     * 벡터의 z 성분을 주어진 값으로 설정.
     * 
     * @param {number} z
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setX( z ) {
        this.z = z;

        return this;
    }

    /**
     * 벡터 구성요소를 인덱스로 설정 할수 있습니다.
     * 
     * @param {number} index
     * @param {number} value
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setComponent( index, value) {
        switch( index ) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error( 'idex is out of range: ' + index);
        }

        return this;
    }

    /**
     * 주어진 인덱스와 일치하는 벡터 성분의 값을 반환.
     * 
     * @param {number} index
     * @return {number} 이 벡터의 성분 값을 반환.
     */
    getComponent( index ) {
        switch( index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error( 'index is out of range: ' + index);
        }
    }

    /**
     * 이 인스턴스의 값을 복사한 새 백터를 반환.
     * 
     * @return {Vector3} 이 인스턴스의 복사본
     */
    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }

    /**
     * 주어진 벡터의 값을 이 인스턴스로 복사합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    copy( v ) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    }

    /**
     * 주어진 벡터를 이 벡터에 더합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    add( v ) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    /**
     * 주어진 scalar 값을 이 인스턴스의 모든 구성 요소에 더합니다.
     * 
     * @param {number} s
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    addScalar( s ) {
        this.x += s;
        this.y += s;
        this.z += s;

        return this;
    }

    /**
     * 주어진 벡터들을 더하고 그 결과를 이 인스턴스에 저장.
     * 
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    addVectors(a,b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;
    }

    /**
     * 주어진 벡터를 주어진 계수로 스케일링 하여 인스턴스에 추가 합니다.
     * 
     * @param {Vector3|Vector4} v
     * @param {number} s
     * @return {Vector3}
     */
    addScaledVector( v,s ) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;

        return this;
    }

    /**
     * 주어진 벡터를 이 인스턴스에서 뺍니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    sub( v ) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        
        return this;
    }

    /**
     * 이 인스턴스의 모든 구성 요소에서 주어진 Scalar 값을 뺍니다.
     * 
     * @param {number} scalar
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    subScalar( s ) {
        this.x -= s;
        this.y -= s;
        this.z -= s;

        return this;
    }

    /**
     * 주어진 벡터들을 뺸 결과 값을 이 인스턴스에 저장합니다.
     * 
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    subVectors(a,b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;

        return this;
    }

    /** 
     * 주어진 벡터를 이 인스턴스에 곱합니다. 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    multiply( v ) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;
    }

    /** 
     * 주어진 Scalar 값을 이 인스턴스의 모든 구성 요소에 곱합니다.
     * 
     * @param {number} scalar
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    multiplyScalar( scalar ) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    /**
     * 주어진 벡터들의 곱의 결과값을 이 인스턴스에 저장합니다.
     * 
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {Vector3} 이 벡터의 참조를 반환.
     */
    multiplyVectors( a, b ) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;

        return this;
    }

    /**
     * 이 벡터에 주어진 오일러 회전을 적용합니다.
     * 
     * @param {Euler} euler
     * @return {Vector3} 이 벡터 참조를 반환
     */
    applyEuler( euler ) {
        return this.applyQuaternion( _quaternion.setFromEuler( euler ));
    }

    /**
     * 지정된 축과 각도로 회전을 이 벡터에 적용합니다.
     * 
     * @param {Vector3} axis
     * @param {number} angle
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    applyAxisAngle( axis, angle ) {
        return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ));
    }

    /**
     * 이 벡터를 주어진 3x3 행렬과 곱합니다.
     * 
     * @param {Matrix3} m
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    applyMatrix3( m ) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.x = e[1] * x + e[4] * y + e[7] * z;
        this.x = e[2] * x + e[5] * y + e[8] * z;

        return this;
    }

    /**
     * 이 벡터에 주어진 정규 행렬을 곱하고 결과를 정규화 합니다.
     * 
     * @param {Matrix3} m
     * @return {Vector3} 이 벡터 참조를 반환
     */
    applyNormalMatrix( m ) {
        return this.applyMatrix3( m ).normalize();
    }

    /**
     * 주어진 쿼터니언을 이 벡터에 적용 합니다.
     * 
     * @param {Quaternion} q
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    applyQuaternion( q ) {
        // 쿼터니언 q는 단위 길이를 가진다고 가정 합니다.
        const vx = this.x, vy = this.y, vz = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

        // t = 2 * cross( q.xyz, v );
        const tx = 2 * ( qy * vz - qz * vy );
        const ty = 2 * ( qz * vx - qx * vz );
        const tz = 2 * ( qx * vy - qy * vx );

        // v + q.w * t + cross( q.xyz, t );
        this.x = vx + qw * tx + qy * tz - qz * ty;
        this.y = vy + qw * ty + qz * tx - qx * tz;
        this.z = vz + qw * tz + qx * ty - qy * tx;

        return this;
    }

    /**
     * 이 벡터를 월드 공간에서 카메라의 정규화된 장치 좌표(NDC) 공간으로 투영합니다.
     * 
     * @param {Camera} camera
     * @return {Vector3} 이 벡터 참조를 반환
     */
    project( camera ){
        return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );
    }

    /**
     * 이 벡터를 카메라의 정구화된 장치 좌표(NDC) 공간에서 월드 공간으로 역투영합니다.
     * 
     * @param {Camera} camera
     * @return {Vector3} 이 벡터 참조를 반환
     */
    unproject( camera ) {
        return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );
    }

    /**
     * 이 벡터의 방향을 행렬을 이용해 변환합니다.(주어진 4x4 행렬의 좌측 상단 3x3 부분집합을 추출한 다음 결과를 정규화합니다.)
     * 
     * @param {Matrix4} m
     * @return {Vector3} 이 벡터 참조를 반환합니다.
     */
    transformDirection( m ) {
        /** 
         * 입력 : THREE.Matrix affine matrix
         * (affine : 주로 기하학에서 도형의 평행성, 직선, 면 등의 구조를 유지하며 변환하는 성질을 의미)
         * 벡터는 방향으로 해석됩니다.
        */
       
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z; 
        this.x = e[1] * x + e[5] * y + e[9] * z; 
        this.x = e[2] * x + e[6] * y + e[10] * z;

        return this.normalize();
    }

    /**
     * 이 인스턴스에 주어진 벡터를 나눕니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    divide( v ) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;
    }

    /**
     * 주어진 Scalar로 이 벡터를 나눕니다.
     * 
     * @param {number} scalar
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    divideScalar( scalar ) {
        return this.multiplyScalar( 1 / scalar );
    }

    /**
     * 이 벡터의 x,y 또는 z 값이 주어진 벡터의 x,y 또는 z 값 보다 크면 해당 값을 그에 상응하는 최소값으로 대체합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    min( v ) {
        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );
        this.z = Math.min( this.z, v.z );

        return this;
    }

    /**
     * 이 벡터의 x,y 또는 z 값이 주어진 벡터의 x,y 또는 z 값보다 작으면 해당 값을 그에 상응하는 최대값으로 대체합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    max( v ) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);

        return this;
    }

    /**
     * 이 벡터의 x, y 또는 z 값이 최대값 벡터의 x,y 또는 z 값보다 크면 해당 값으로 대체됩니다.
     * 이 벡터의 x,y 또는 z 값이 최소값 벡터의 x,y 또는 z 값보다 작으면 해당 값으로 대체됩니다.
     * 
     * @param {Vector3} min
     * @param {Vector3} max
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    clamp( min, max ) {
        // assumes min < max, componentwise

        this.x = clamp( this.x, min.x, max.x );
        this.x = clamp( this.y, min.y, max.y );
        this.x = clamp( this.z, min.z, max.z );

        return this;
    }

    /**
     * 이 벡터의 x,y 또는 z가 주어진 최대값 보다 크다면 최대값으로 대체합니다.
     * 이 벡터의 x,y 또는 z가 주어진 최소값 보다 작다면 최소값으로 대체합니다.
     * 
     * @param {number} minVal
     * @param {number} maxVal
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    clampScalar( minVal, maxVal ) {
        this.x = clamp( this.x, minVal, maxVal );
        this.y = clamp( this.y, minVal, maxVal );
        this.z = clamp( this.z, minVal, maxVal );

        return this;
    }

    /**
     * 이 벡터의 길이가 최대값 보다 크다면 최대값으로 대체됩니다.
     * 이 벡터의 길이가 최소값 보다 작다면 최소값으로 대체됩니다.
     * @param {number} min
     * @param {number} max
     * @return {Vector3} 이 벡터 참조를 반환
     */
    clampLength( min, max ) {
        const length = this.length();

        return this.divideScalar( length || 1 ).multiplyScalar( clamp(length, min, max) );
    }

    /**
     * 이 벡터의 구성 요소는 가장 가까운 정수 값으로 내림됩니다.
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    floor() {
        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );
        this.z = Math.floor( this.z );
        
        return this;
    }

    /**
     * 이 벡터의 구성 요소는 가장 가까운 정수 값으로 반올림 됩니다.
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    ceil() {
        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );
        this.z = Math.ceil( this.z );

        return this;
    }

    /**
     * 이 벡터의 구성 요소는 가장 가까운 정수 값으로 반올림됩니다.
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    round() {
        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        this.z = Math.round( this.z );

        return this;
    }

    /**
     * 이 벡터의 구성 요소는 0을 기준으로 반올림됩니다.
     * (음수이면 올림, 양수이면 내림).
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    roundToZero() {
        this.x = Math.trunc( this.x );
        this.y = Math.trunc( this.y );
        this.z = Math.trunc( this.z );

        return this;
    }

    /**
     * 이 벡터 값을 반전 시킵니다.
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    negate() {
        this.x = - this.x;
        this.y = - this.y;
        this.z = - this.z;
    }

    /**
     * 주어진 벡터와 이 인스턴스의 내적을 계산합니다.
     * 
     * @param {Vector3} v
     * @return {number} 내적의 결과를 반환.
     */
    dot( v ) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * (0, 0, 0)에서 (x, y, z)까지의 유클리드 길이(직선 거리)의 제곱을 계산합니다. 벡터의 길이를 비교할 때는
     * 직선 거리 대신 길이의 제곱을 사용하는 것이 계산 효율이 약간 더 높으므로 이 방법을 사용한 것이 졸습니다.
     * 
     * @return {number} 이 벡터의 제곱 길이.
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * (0, 0, 0)에서 (x, y, z)까지의 유클리드 길이(직선 거리)를 계산합니다.
     * 
     * @return {number} 이 벡터의 길이
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    
    /**
     * 이 벡터의 맨해튼 길이를 계산합니다.
     * 
     * @return {number} 이 벡터의 길이.
     */
    manhattanLength() {
        return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
    }

    /**
     * 이 벡터를 단위 벡터로 변환합니다. 즉, 이 벡터와 방향은 같지만 길이가 '1'인 벡터로 설정합니다.
     */
    normalize() {
        return this.divideScalar( this.length() || 1);
    }

    /**
     * 이 벡터를 현재 벡터와 방향은 같지만 길이가 지정된 벡터로 설정합니다.
     * 
     * @param {number} length
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setLength( length ) {
        return this.normalize().multiplyScalar( length );
    }

    /**
     * 주어진 벡터와 이 인스턴스 사이를 선형 보간 합니다.
     * 여기서 알파는 선을 따라 이동하는 거리의 백분율입니다.
     * 알파가 0이면 이 벡터가 되고, 알파가 1이면 주어진 벡터가 됩니다.
     * 
     * @param {Vector3} v
     * @param {number} alpha
     * @return {Vector3} 이 벡터 참조 반환.
     */
    lerp( v, alpha ) {
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        this.z += ( v.z - this.z ) * alpha;

        return this;
    }

    /**
     * 주어진 벡터들 사이를 선형 보간합니다.
     * 여기서 알파는 직선을 따라 이동하는 거리의 백분율입니다.
     * 알파가 0이면 첫 번째 벡터가 되고, 알파가 = 1이면 두 번째 벡터가 됩니다.
     * 결과는 이 인스턴스에 저장됩니다.
     * 
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @param {number} alpha
     * @return {Vector3} 이 벡터 참조 반환.
     */
    lerpVectors( v1, v2, alpha ) {
        this.x = v1.x + ( v2.x - v1.x ) * alpha;
        this.y = v1.y + ( v2.y - v1.y ) * alpha;
        this.z = v1.z + ( v2.z - v1.z ) * alpha;

        return this;
    }

    /**
     * 주어진 벡터와 이 인스턴스를 외적 연산합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 외적의 결과.
     */
    cross( v ) {
        return this.crossVectors( this, v );
    }

    /**
     * 주어진 벡터들의 외적을 게산하고 그 결과를 이 인스턴스에 저장합니다.
     * 
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {Vector3} 이 벡터 참조 반환.
     */
    crossVectors( a, b ){
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;
    }

    /**
     * 이 벡터를 주어진 벡터에 투영합니다.
     * 
     * @param {Vector3} v
     * @return {Vector3} 이 벡터 참조 반환.
     */
    projectOnVector( v ) {
        const denominator = v.lengthSq();

        if ( denominator === 0 ) return this.set( 0, 0, 0 );

        const scalar = v.dot(this) / denominator;

        return this.copy( v ).multiplyScalar( scalar );
    }

    /**
     * 이 벡터를 평면에 투영하려면, 이 벡터를 평면의 법선에 투영한 후,
     * 이 벡터에서 원래 벡터를 뻅니다.
     * 
     * @param {Vector3} planeNormal
     * @return {Vector3} 이 벡터 참조 반환.
     */
    projectOnPlane( planeNormal ) {
        _vector.copy( this ).projectOnVector( planeNormal );

        return this.sub( _vector );
    }

    /**
     * 주어진 법선 벡터에 수직인 평면에 대해 이 벡터를 반사시킵니다.
     * 
     * @param {Vector3} normal
     * @return {Vector3} 이 벡터 참조 반환.
     */
    reflect( normal ) {
        return this.sub(_vector.copy( normal ).multiplyScalar( 2 * this.dot( normal )));
    }

    /**
     * 주어진 벡터와 이 인스턴스의 사이 각을 라디안 단위로 반환합니다.
     * 
     * @param {Vector3} v
     * @return {number} 라디안 단위 각.
     */
    angleTo( v ) {
        const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

        if( denominator === 0 ) return Math.PI / 2;

        const theta = this.dot( v ) / denominator;

        // clamp, to handle numerical problems

        return Math.acos( clamp( theta, -1, 1));
    }

    /**
     * 주어직 벡터와 이 인스턴스의 거리를 계산합니다.
     * 
     * @param {Vector3} v
     * @return {number} 거리
     */
    distanceTo( v ) {
        return Math.sqrt( this.distanceToSquared( v ) );
    }

    /**
     * 주어진 벡터에서 이 인스턴스까지의 제곱 거리를 계산 합니다. 단순히 다른 거리와 비교하는 경우에는
     * 거리의 제곱을 사용하는 것이 계산 효율이 약간 더 높으므로 제곱 거리를 비교하는 것이 좋습니다.
     * 
     * @param {Vector3} v
     * @return {number} 제곱 거리
     */
    distanceToSquared( v ) {
        const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * 주어진 벡터와 이 인스턴스의 맨해튼 거리를 계산합니다.
     * 
     * @param {Vector3} v
     * @return {number} 맨해튼 거리 값.
     */
    manhattenDistanceTo( v ) {
        return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );
    }

    /**
     * 주어진 구면 좌표계로부터 벡터 성분을 설정합니다.
     * 
     * @param {Spherical} s
     * @return {Vector3} 이 벡터 참조 반환.
     */
    setFromSpherical( s ) {
        return this.setFromSphericalCoords( s.radius, s.phi, s.theta );
    }

    /**
     * 주어진 구면 좌표계로 부터 벡터 성분을 설정합니다.
     * 
     * @param {number} radius
     * @param {number} phi
     * @param {number} theta
     * @return {Vector3} 이 벡터 참조 반환.
     */
    setFromSphericalCoords( radius, phi, theta ) {
        const sinPhiRadius = Math.sin( phi ) * radius;

        this.x = sinPhiRadius * Math.sin( theta );
        this.y = Math.cos( phi ) * radius;
        this.z = sinPhiRadius * Math.cos( theta );

        return this;
    }

    /**
     * 이 벡터의 구성 요소들을 주어진 원기둥 좌표계로 부터 설정합니다.
     * 
     * @param {Cylindrical} c
     * @return {Vector3} 이 벡터 참조 반환.
     */
    setFromCylindrical( c ) {
        return this.setFromCylindricalCoords( c.radius, c.theta, c.y );
    }

    /**
     * 이 벡터의 구성 요소들을 주어진 원기둥 좌표계로 부터 설정합니다.
     * 
     * @param {number} radius
     * @param {number} theta
     * @param {number} y
     * @return {Vector3} 이 벡터 참조 반환.
     */
    setFromCylindricalCoords( radius, theta, y ) {
        this.x = radius * Math.sin( theta );
        this.y = y;
        this.z = radius * Math.cos( theta );

        return this;
    }

    /**
     * 주어진 변환 메트릭스로 이 벡터의 구성 요소를 설정합니다.
     * 
     * @param {Matrix4} m
     * @return {Vector3} 이 벡터를 반환.
     */
    setFromMatrixScale( m ) {
        const sx = this.setFromMatrixColumn( m, 0 ).length();
        const sy = this.setFromMatrixColumn( m, 1 ).length();
        const sz = this.setFromMatrixColumn( m, 2 ).length();

        this.x = sx;
        this.y = sy;
        this.z = sz;

        return this;
    }

    /**
     * 특정 매트릭스 열로부터 이 벡터의 구성요소를 설정합니다.
     * 
     * @param {Matrix4} m
     * @param {number} index
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setFromMatrixColumn( m, index ) {
        return this.fromArray( m.elements, index * 4 );
    }

    /**
     * 특정 매트릭스 열로부터 이 벡터의 구성요소를 설정합니다.
     * 
     * @param {Matrix3} m
     * @param {number} index
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setFromMatrix3Column( m, index ) {
        return this.fromArray( m.elements, index * 3 );
    }

    /**
     * 주어진 오일러 각으로 부터 이 벡터의 구성요소를 설정합니다.
     * 
     * @param {Euler} e
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setFromEuler( e ) {
        this.x = e._x;
        this.y = e._y;
        this.z = e._z;

        return this;
    }

    /**
     * 주어진 색상의 RGB 구서 요소로부터 벡터 구성 요소를 설정합니다.
     * 
     * @param {Color} c
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    setFromColor( c ) {
        this.x = c.r;
        this.y = c.g;
        this.z = c.b;
        
        return this;
    }

    /**
     * 이 벡터가 주어진 벡터와 같으면 'true'를 반환합니다.
     * 
     * @param {Vector3} v
     * @return {boolean} 
     */
    equals( v ) {
        return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ));
    }

    /**
     * 이 벡터의 x 값을 'array[ offset ]', y 값을 'array[offset + 1]'
     * , z 값을 'array[ offset + 2]'로 설정합니다.
     * 
     * @param {Array<number>} array
     * @param {number} [offset=0]
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    fromArray( array, offset = 0) {
        this.x = array[ offset ];
        this.y = array[ offset + 1];
        this.z = array[ offset + 2];

        return this;
    }

    /**
     * 이 벡터의 구성 요소를 지정된 배열에 씁니다. 
     * 배열이 제공되지 않으면 새 인스턴스를 반환합니다.
     * 
     * @param {Array<number>} [array=[]]
     * @param {number} [offset=0]
     * @return {Array<number>} 이 벡터 구성요소들
     */
    toArray( array = [], offset = 0 ) {
        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;
        array[ offset + 2 ] = this.z;
        
        return array;
    }

    /**
     * 주어진 벡터 속성으로 부터 이 벡터의 구성 요소를 설정합니다.
     * 
     * @param {BufferAttribute} attribute
     * @param {number} index
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    fromBufferAttribute( attribute, index ) {
        this.x = attribute.getX( index );
        this.y = attribute.getY( index );
        this.z = attribute.getZ( index );
        
        return this;
    }

    /**
     * 이 벡터의 각 구성 요소를 0 이상 1 미만의 의사 난수 값으로 설정합니다.
     * (1은 포함되지 않음).
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();

        return this;
    }

    /**
     * 이 벡터를 단위 구면 상의 균일하게 무작위로 선택된 한 점으로 설정합니다.
     * 
     * @return {Vector3} 이 벡터 참조를 반환.
     */
    randomDirection() {
        // https://mathworld.wolfram.com/SpherePointPicking.html

        const theta = Math.random() * Math.PI * 2;
        const u = Math.random() * 2 - 1;
        const c = Math.sqrt( 1 - u * u );

        this.x = c * Math.cos( theta );
        this.y = u;
        this.z = c * Math.sin( theta );

        return this;
    }

    *[ Symbol.iterator ]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}

const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion();

export { Vector3 };