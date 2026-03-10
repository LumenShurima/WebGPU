// Engine.js

import EMath from "../EMath.js";
import logSystem_1 from "../LogSystem.js";
import { Mesh } from "../Mesh.js";

export default async function createEngine(canvas) {
    
    const context = canvas.getContext("webgpu");

    // WebGPU 지원 확인.
    if(!navigator.gpu) {
        // alert("This browser does not support webgpu")
        logSystem_1.error("This browser does not support webgpu");
    }

    // GPU Context 핸들 받아오기
    const adapter = await navigator.gpu.requestAdapter();
    if(!adapter) {
        logSystem_1.error("Failed to get GPU adapter.")
    }
    const device = await adapter.requestDevice();
    if(!device) {
        logSystem_1.error("Failed to get GPU device.")
    }
    const format = navigator.gpu.getPreferredCanvasFormat();
    if(!format) {
        logSystem_1.error("Failed to get GPU format.")
    }

    // 깊이 텍스처
    let depthTexture = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
    });



    function createMesh(inMesh) {
        const vertexBuffer = device.createBuffer({
            size: inMesh.Vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });
        device.queue.writeBuffer(vertexBuffer, 0, inMesh.Vertices);
        const indexBuffer = device.createBuffer({
            size: inMesh.Indices.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
        });
        device.queue.writeBuffer(indexBuffer, 0, inMesh.Indices);
    }

    // 카메라: z = -5 에서 원점 바라보는 간단 버전
    function updateViewProj() {
        const aspect = canvas.width / canvas.height;
        const proj = new Float32Array(16);
        EMath.Matrix4x4_Perspective(proj, EMath.DegreeToRadians(45), aspect, 0.1, 100);

        const view = new Float32Array(16);
        EMath.Matrix4x4_Translate(view, 0, 0, -5);

        EMath.Matrix4x4_Multiply(viewProjMat, proj, view);
    }

    return {
        context,
        adapter,
        device,

        
        //function resizeCanvas()
    }
}




