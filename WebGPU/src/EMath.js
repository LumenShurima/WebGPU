// EMath.js
// Extend Math Custom Library

const DEG2RAD = Math.PI / 180;

class EMath {    
    static clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

    static DegreeToRadians(degree) { return degree * Math.PI / 180; }


    // 카메라 행렬 연산
    static Matrix4x4_Perspective(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);

        out[0]  = f / aspect;   out[1] = 0; out[2]  = 0;                    out[3]  = 0;
        out[4]  = 0;            out[5] = f; out[6]  = 0;                    out[7]  = 0;
        out[8]  = 0;            out[9] = 0; out[10] = (far + near)*nf;      out[11] = -1;
        out[12] = 0;            out[13]= 0; out[14] = (2*far*near)*nf;      out[15] = 0;
    }

    // 행렬 공통? 연산
    static Matrix4x4_Identity(out) {
        out[0]=1;   out[1]=0;   out[2]=0;   out[3]=0;
        out[4]=0;   out[5]=1;   out[6]=0;   out[7]=0;
        out[8]=0;   out[9]=0;   out[10]=1;  out[11]=0;
        out[12]=0;  out[13]=0;  out[14]=0;  out[15]=1;
    }

    static Matrix4x4_Translate(out, x, y, z) {
        this.Matrix4x4_Identity(out);
        out[12] = x;
        out[13] = y;
        out[14] = z;
    }


    static Matrix4x4_RotateX(out, a) {
        const c = Math.cos(a), s = Math.sin(a);
        this.Matrix4x4_Identity(out);
        out[5] = c;    out[6]=s;
        out[9]= -s;    out[10]=c;
    }

    static Matrix4x4_RotateY(out, a) {
        const c = Math.cos(a), s = Math.sin(a);
        this.Matrix4x4_Identity(out);
        out[0] = c;     out[2] = s;
        out[8] = -s;    out[10]= c;
    }
    
    static Matrix4x4_RotateZ(out, a) {
        const c = Math.cos(a), s = Math.sin(a);
        this.Matrix4x4_Identity(out);
        out[0] = c; out[1] = s;
        out[4] = -s; out[5] = c;
    }

    // x, y, z parameter mean is Degree
    static Matrix4x4_Rotate(out, x, y, z) {
        this.Matrix4x4_Identity(out);
        const rx = new Float32Array(16);
        const ry = new Float32Array(16);
        const rz = new Float32Array(16);
        const rxy = new Float32Array(16);
        const rot = new Float32Array(16);

        this.Matrix4x4_RotateX(rx, x * DEG2RAD);
        this.Matrix4x4_RotateY(ry, y * DEG2RAD);
        this.Matrix4x4_RotateZ(rz, z * DEG2RAD);
        this.Matrix4x4_Multiply(rxy, ry, rx);
        this.Matrix4x4_Multiply(rot, rz, rxy);
        out.set(rot);
    }

    // row-major
    // function Matrix4x4_Multiply(out, a, b) {
    //     const o = new Float32Array(16);
    //     for(let i=0; i<4; ++i)
    //     {
    //         for(let j=0; j<4; ++j) {
    //             o[i*4 + j] =
    //             a[i*4+0]*b[0*4+j] +
    //             a[i*4+1]*b[1*4+j] +
    //             a[i*4+2]*b[2*4+j] +
    //             a[i*4+3]*b[3*4+j];
    //         }
    //     }
    //     out.set(o);
    // }

    // column-major: out = a * b
    static Matrix4x4_Multiply(out, a, b) {
        const a00=a[0],  a01=a[1],  a02=a[2],  a03=a[3];
        const a10=a[4],  a11=a[5],  a12=a[6],  a13=a[7];
        const a20=a[8],  a21=a[9],  a22=a[10], a23=a[11];
        const a30=a[12], a31=a[13], a32=a[14], a33=a[15];

        const b00=b[0],  b01=b[1],  b02=b[2],  b03=b[3];
        const b10=b[4],  b11=b[5],  b12=b[6],  b13=b[7];
        const b20=b[8],  b21=b[9],  b22=b[10], b23=b[11];
        const b30=b[12], b31=b[13], b32=b[14], b33=b[15];

        out[0]  = a00*b00 + a10*b01 + a20*b02 + a30*b03;
        out[1]  = a01*b00 + a11*b01 + a21*b02 + a31*b03;
        out[2]  = a02*b00 + a12*b01 + a22*b02 + a32*b03;
        out[3]  = a03*b00 + a13*b01 + a23*b02 + a33*b03;

        out[4]  = a00*b10 + a10*b11 + a20*b12 + a30*b13;
        out[5]  = a01*b10 + a11*b11 + a21*b12 + a31*b13;
        out[6]  = a02*b10 + a12*b11 + a22*b12 + a32*b13;
        out[7]  = a03*b10 + a13*b11 + a23*b12 + a33*b13;

        out[8]  = a00*b20 + a10*b21 + a20*b22 + a30*b23;
        out[9]  = a01*b20 + a11*b21 + a21*b22 + a31*b23;
        out[10] = a02*b20 + a12*b21 + a22*b22 + a32*b23;
        out[11] = a03*b20 + a13*b21 + a23*b22 + a33*b23;

        out[12] = a00*b30 + a10*b31 + a20*b32 + a30*b33;
        out[13] = a01*b30 + a11*b31 + a21*b32 + a31*b33;
        out[14] = a02*b30 + a12*b31 + a22*b32 + a32*b33;
        out[15] = a03*b30 + a13*b31 + a23*b32 + a33*b33;
    }

    // column-major 4x4 inverse
    // out = inverse(a)
    static Matrix4x4_Invert(out, a) {
        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3];
        const a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7];
        const a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        // det
        let det =
        b00 * b11 - b01 * b10 + b02 * b09 +
        b03 * b08 - b04 * b07 + b05 * b06;

        if (Math.abs(det) < 1e-8) {
        // 역행렬 불가(특이행렬). out을 안전하게 Identity로 두거나 false 리턴 권장.
        // 여기서는 false 리턴.
        return false;
        }
        det = 1.0 / det;

        out[0]  = ( a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1]  = (-a01 * b11 + a02 * b10 - a03 * b09) * det;
        out[2]  = ( a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3]  = (-a21 * b05 + a22 * b04 - a23 * b03) * det;

        out[4]  = (-a10 * b11 + a12 * b08 - a13 * b07) * det;
        out[5]  = ( a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6]  = (-a30 * b05 + a32 * b02 - a33 * b01) * det;
        out[7]  = ( a20 * b05 - a22 * b02 + a23 * b01) * det;

        out[8]  = ( a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9]  = (-a00 * b10 + a01 * b08 - a03 * b06) * det;
        out[10] = ( a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * det;

        out[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * det;
        out[13] = ( a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * det;
        out[15] = ( a20 * b03 - a21 * b01 + a22 * b00) * det;

        return true;
    }
}

export default EMath;



