

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






    

    
}