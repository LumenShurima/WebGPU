// main.js

import EMath from "../EMath.js";
import logSystem_1 from "../LogSystem.js";
import Mesh from "../Mesh.js";
import createEngine from "../gfx/Engine.js";



const canvas = document.getElementById('gfx');
const eng = await createEngine(canvas, logSystem_1);



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





const modelMat = new Float32Array(16);
const viewProjMat = new Float32Array(16);

function resizeCanvas() {
    // 일부 오래된 브라우저에 window.devicePixelRatio가 없을 경우 1로 fallback
    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth    * devicePixelRatio;
    const height = canvas.clientHeight  * devicePixelRatio;

    canvas.width    = width;
    canvas.height   = height;

    eng.context.configure({
        device,
        format,
        alphaMode: 'opaque'
    })

    updateViewProj();
    updateDepthTexture();
}

// 초기에 한번 실행 시키도록
resizeCanvas();


logSystem_1.log("WebGPU Init Done.")


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
    logSystem_1.error("Shader Code is invalid");
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
        arrayStride: 4 * 6,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x3' },
          { shaderLocation: 1, offset: 4 * 3, format: 'float32x3' },
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
    topology: 'triangle-list',
    cullMode: 'none',
  },

  // ⭐ 이 블록이 없어서 에러 발생
  depthStencil: {
    format: 'depth24plus',
    depthWriteEnabled: true,
    depthCompare: 'less',
  },
});



// 카메라: z = -5 에서 원점 바라보는 간단 버전
function updateViewProj() {
    const aspect = canvas.width / canvas.height;
    const proj = new Float32Array(16);
    EMath.Matrix4x4_Perspective(proj, EMath.DegreeToRadians(45), aspect, 0.1, 100);

    const view = new Float32Array(16);
    EMath.Matrix4x4_Translate(view, 0, 0, -5);

    EMath.Matrix4x4_Multiply(viewProjMat, proj, view);
}
updateViewProj();

let lastTime = 0;
function frame(time) {
    const dt = (time - lastTime) * 0.001;
    lastTime = time;

    const angle = time * 0.05; // Second per Rotation

    const trans = new Float32Array(16);


    const rot = new Float32Array(16);

    EMath.Matrix4x4_Rotate(rot, angle, angle * 0.6, angle*0.3)
    EMath.Matrix4x4_Translate(trans, 0,0,-5);
    EMath.Matrix4x4_Multiply(modelMat, trans, rot);

    // unfirom buffer upadt: model + viewProj
    const data = new Float32Array(32); // mat4(16) * 2
    data.set(modelMat, 0);
    data.set(viewProjMat, 16);
    device.queue.writeBuffer(uniformBuffer, 0, data.buffer);

    // render pass
    const commandEncoder = device.createCommandEncoder();
    const textureView = eng.context.getCurrentTexture().createView();

    const depthView = depthTexture.createView();

    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [
        {
            view: textureView,
            clearValue: { r:0.1, g:0.1, b:0.15, a:1 },
            loadOp: 'clear',
            storeOp: 'store',
        }
        ],
        depthStencilAttachment: {
        view: depthView,
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        }
    });

    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, uniformBindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setIndexBuffer(indexBuffer, 'uint16');
    renderPass.drawIndexed(Mesh.cube.Indices.length);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);