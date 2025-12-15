// Mesh.js

import { device } from "./Global.js";





const exampleCubeVertices = new Float32Array([
    //   x,    y,    z,   r,  g,  b
  -1, -1, -1,   1, 0, 0, // 0
   1, -1, -1,   0, 1, 0, // 1
   1,  1, -1,   0, 0, 1, // 2
  -1,  1, -1,   1, 1, 0, // 3
  -1, -1,  1,   0, 1, 1, // 4
   1, -1,  1,   1, 0, 1, // 5
   1,  1,  1,   1, 1, 1, // 6
  -1,  1,  1,   0.2,0.2,0.2 // 7
])

const exampleCubeIndices = new Uint16Array([
      // 앞(-Z)
  0, 1, 2,  0, 2, 3,
  // 뒤(+Z)
  4, 6, 5,  4, 7, 6,
  // 왼쪽(-X)
  4, 5, 1,  4, 1, 0,
  // 오른쪽(+X)
  3, 2, 6,  3, 6, 7,
  // 아래(-Y)
  4, 0, 3,  4, 3, 7,
  // 위(+Y)
  1, 5, 6,  1, 6, 2,
])

function createSphereMesh(radius = 1, latSegments = 16, lonSegments = 16) {
    const vertices = [];
    const indices = [];

    for(let y = 0; y <= latSegments; y++) {
        const v = y / latSegments;
        const theta = v * Math.PI;

        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for(let x = 0; x <= lonSegments; x++) {
            const u = x / lonSegments;
            const phi = u * Math.PI * 2;

            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const px = radius * cosPhi * sinTheta;
            const py = radius * cosTheta ;
            const pz = radius * sinPhi * sinTheta;
            
            // 위치 (x,y,z)
            vertices.push(px, py, pz);

            // 컬러 (정규화 좌표 기반, 디버그 용)
            vertices.push(
                (px / radius + 1) * 0.5,
                (py / radius + 1) * 0.5,
                (pz / radius + 1) * 0.5
            );
        }
    }

    const row = lonSegments + 1;

    for (let y = 0; y < latSegments; y++) {
        for (let x = 0; x < lonSegments; x++) {
            const i0 = y * row + x;
            const i1 = i0 + row;
            const i2 = i0 + 1;
            const i3 = i1 + 1;

            indices.push(
                i0, i1, i2,
                i2, i1, i3
            );
        }
    }

    return {
        Vertices: new Float32Array(vertices),
        Indices: (vertices.length / 6 > 65535)
            ? new Uint32Array(indices)
            : new Uint16Array(indices)
    };
}

export const Shape = {
    cube: 
    { 
        Vertices: new Float32Array([
            -1, -1, -1, 1,0,0,
             1, -1, -1, 0,1,0,
             1,  1, -1, 0,0,1,
            -1,  1, -1, 1,1,0,
            -1, -1,  1, 0,1,1,
             1, -1,  1, 1,0,1,
             1,  1,  1, 1,1,1,
            -1,  1,  1, 0.2,0.2,0.2
        ]),

        Indices: new Uint16Array([
            0,1,2, 0,2,3,
            4,6,5, 4,7,6,
            4,5,1, 4,1,0,
            3,2,6, 3,6,7,
            4,0,3, 4,3,7,
            1,5,6, 1,6,2
        ])
    },

    sphere: createSphereMesh(
        1.0,   // radius
        16,    // latitude segments
        16     // longitude segments
    )
}


export class Mesh {
    constructor(_shape) {
        this.vertexBuffer = device.createBuffer({
        size: _shape.Vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
        device.queue.writeBuffer(this.vertexBuffer, 0, _shape.Vertices);

        this.indexBuffer = device.createBuffer({
        size: _shape.Indices.byteLength,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
        });
        device.queue.writeBuffer(this.indexBuffer, 0, _shape.Indices);

        this.indexCount  = _shape.Indices.length;
        this.indexFormat = (_shape.Indices instanceof Uint32Array) ? "uint32" : "uint16";
    }
}