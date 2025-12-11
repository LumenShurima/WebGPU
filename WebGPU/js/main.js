// main.js

import { LogMgr } from "./LogSystem.js";
import Mesh from "./Mesh.js";


const log = new LogMgr();

const canvas = document.getElementById('gfx');
const context = canvas.getContext('webgpu');

if(!navigator.gpu) {
    // alert("This browser does not support webgpu")
    log.error("This browser does not support webgpu");
}

const adapter   = await navigator.gpu.requestAdapter();
if(!adapter) {
    log.error("Failed to get GPU adapter.")
}

const device    = await adapter.requestDevice();
if(!device) {
    log.error("Failed to get GPU device.")
}

const format = navigator.gpu.getPreferredCanvasFormat();
if(!format) {
    log.error("Failed to get GPU format.")
}

function resizeCanvas() {
    // 일부 오래된 브라우저에 window.devicePixelRatio가 없을 경우 1로 fallback
    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth    * devicePixelRatio;
    const height = canvas.clientHeight  * devicePixelRatio;

    canvas.width    = width;
    canvas.height   = height;

    context.configure({
        device,
        format,
        alphaMode: 'opaque'
    })
}

// 초기에 한번 실행 시키도록
resizeCanvas();
// resize 던지면 resizeCavnas 실행하도록 Binding
window.addEventListener('resize', resizeCanvas);

log.log("WebGPU Init Done.")


// Create GPU Buffer
const vertexBuffer = device.createBuffer({
    size: Mesh.cube.Vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
});
device.queue.writeBuffer(vertexBuffer, 0, Mesh.cube.Vertices);

const indexBuffer = device.createBuffer({
    size: Mesh.cube.Indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
});
device.queue.writeBuffer(indexBuffer, 0, Mesh.cube.Indices);

// 카메라/ 월드 행렬용 Uniform 버퍼
const uniformBufferSize = (4 * 4 * 4) * 2 // mat4x4 두 개 * 4byte(아마도 float)
const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
});

// bind group layout & bind group
const uniformBindGroupLayout = device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.VERTEX,
            buffer: { type: "uniform" }
        }
    ]
});

const uniformBindGroup = device.createBindGroup({
    layout: uniformBindGroupLayout,
    entries: [
        {
            binding: 0,
            resource: { buffer: uniformBuffer }
        }
    ]
});


// Load Shader
const shaderCode = await (await fetch('./shader/shader.wgsl')).text();
if(!shaderCode)
{
    log.error("Shader Code is invalid");
}

const shaderModule = device.createShaderModule({ code: shaderCode });

// WebGPU 표준 검사 example ------------------------------------------------
const info = await shaderModule.getCompilationInfo();

for (const msg of info.messages) {
    if (msg.type === "error") {
        console.error(`WGSL Error: ${msg.message} (line ${msg.lineNum})`);
    } else {
        console.warn(`WGSL ${msg.type}: ${msg.message}`);
    }
}

if (info.messages.some(m => m.type === "error")) {
    throw new Error("Shader failed to compile. See errors above.");
}
// -------------------------------------------------------------------------


let depthTexture = device.createTexture({
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT
});

function updateDepthTexture() {
    depthTexture = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
    });
}

window.addEventListener('resize', () => {
    resizeCanvas();
    updateDepthTexture();
});

const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [uniformBindGroupLayout],
});

// Render Pipeline
const pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
        module: shaderModule,
        entryPoint: 'vs_main',
        buffers: [
            {
                arrayStride: 4 * 6,     // float 6개 (pos3 + color3)
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: 0,
                        format: 'float32x3',
                    },
                    {
                        shaderLocation: 1,
                        offset: 4 * 3,
                        format: 'float32x3',
                    },
                ],
            },
        ],
    },
    fragment: {
        module: shaderModule,
        entryPoint: 'fs_main',
        targets: [{ format }],
    },
    primitive: {
        format: 'depth24plus',
        depthWriteEnabled: true,
        depthCompare: 'less',
    },
});