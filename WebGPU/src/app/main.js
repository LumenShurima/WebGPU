// main.js

import EMath from "../EMath.js";
import logSystem_1 from "../LogSystem.js";
import { Mesh, Shape} from "../Mesh.js";
import createEngine from "../gfx/Engine.js";
import Actor from "./Actor.js"
import { device, format, context } from "../Global.js";
import CameraActor from "./Camera.js";

const canvas = document.getElementById('gfx');
//const eng = await createEngine(canvas, logSystem_1);



    // WebGPU 지원 확인.
    if(!navigator.gpu) {
        // alert("This browser does not support webgpu")
        logSystem_1.error("This browser does not support webgpu");
    }
    
    
    
    // 깊이 텍스처
    let depthTexture = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
    });

    





const CameraActor_1 = new CameraActor;

function resizeCanvas(CameraActor) {
    // 일부 오래된 브라우저에 window.devicePixelRatio가 없을 경우 1로 fallback
    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth    * devicePixelRatio;
    const height = canvas.clientHeight  * devicePixelRatio;

    canvas.width    = width;
    canvas.height   = height;

    CameraActor_1.updateViewProj();
    updateDepthTexture();
}

// 초기에 한번 실행 시키도록
resizeCanvas(CameraActor_1);
logSystem_1.log("Canvas adjustment complete.");

logSystem_1.log("WebGPU Initialization complete.");



const CubeMesh = new Mesh(Shape.cube);
const SphereMesh = new Mesh(Shape.sphere);


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

  depthStencil: {
    format: 'depth24plus',
    depthWriteEnabled: true,
    depthCompare: 'less',
  },
});







CameraActor_1.updateViewProj();


const actor_1 = new Actor();
const actor_2 = new Actor();
const actor_3 = new Actor();

actor_1.setMesh(CubeMesh);
actor_2.setMesh(SphereMesh);
actor_2.setPosition(5,0,0);
actor_3.setMesh(SphereMesh);
actor_3.setPosition(-5,0,0);
let lastTime = 0;
function frame(time) {
    const dt = (time - lastTime) * 0.001;
    lastTime = time;

    // render pass
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

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


    const angle = time * 0.05; // Second per Rotation


    CameraActor_1.setPosition(0,0,15);
    CameraActor_1.setRotation(0,0,0);
    CameraActor_1.updateViewProj();


    actor_1.setRotation(angle, angle * 0.6, angle*0.3);
    actor_2.setRotation(angle, angle * 0.6, angle*0.3);
    actor_3.setRotation(angle, angle * 0.6, angle*0.3);
    
    
    actor_1.update();
    actor_2.update();
    actor_3.update();


    actor_1.render(renderPass);
    actor_2.render(renderPass);
    actor_3.render(renderPass);

    

    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

