// main.js

import EMath from "../EMath.js";
import logSystem_1 from "../LogSystem.js";
import { Mesh, Shape} from "../Mesh.js";
import createEngine from "../gfx/Engine.js";
import Actor from "./Actor.js"
import { device, format, context, viewProjMat } from "../Global.js";
import CameraActor from "./Camera.js";
import { LevelMgr } from "./LevelMgr.js";
import { InputMgr } from "../InputMgr.js";

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

    CameraActor_1.update();
    updateDepthTexture();
}

// 초기에 한번 실행 시키도록
resizeCanvas(CameraActor_1);
logSystem_1.log("Canvas adjustment complete.");

logSystem_1.log("WebGPU Initialization complete.");


//#region Engine 계층 유틸
function ndcToWorldRay(ndcX, ndcY, invViewProj) {
    // WebGL clip z: near=-1, far=+1
    const clipNear  = EMath.v4(ndcX,ndcY,-1,1);
    const clipFar   = EMath.v4(ndcX,ndcY,1,1);

    const wNear4 = EMath.mulMat4Vec4(invViewProj, clipNear);
    const wFar4 = EMath.mulMat4Vec4(invViewProj, clipFar);

    const worldNear = EMath.perspectiveDivide(wNear4);
    const worldFar = EMath.perspectiveDivide(wFar4);

    const origin = worldNear;
    const dir = EMath.Normalized3(
        EMath.sub3(worldFar, worldNear)
    );

    return {origin, dir};
}

function intersectRayPlane(rayOrigin, rayDir, planePoint, planeNormal) {
    const denom = EMath.dot3(rayDir, planeNormal);
    if(Math.abs(denom) < 1e-8) return null; // 평행

    const t = EMath.dot3(EMath.sub3(planePoint, rayOrigin), planeNormal) / denom;
    if(t < 0) return null; // 카메라 뒤쪽

    return EMath.sum3(rayOrigin, EMath.mul3s(rayDir,t));
}


//#endregion




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
        arrayStride: 7 * 4,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x3' },
          { shaderLocation: 1, offset: 3 * 4, format: 'float32x4' },
        ],
      },
    ],
  },

  fragment: {
  module: shaderModule,
  entryPoint: 'fs_main',
  targets: [{
    format,
    blend: {
      color: {
        srcFactor: 'src-alpha',
        dstFactor: 'one-minus-src-alpha',
        operation: 'add',
      },
      alpha: {
        srcFactor: 'one',
        dstFactor: 'one-minus-src-alpha',
        operation: 'add',
      },
    },
    writeMask: GPUColorWrite.ALL,
  }],
},

  primitive: {
    topology: 'triangle-list',
    cullMode: 'none',
  },

  depthStencil: {
    format: 'depth24plus',
    depthWriteEnabled: false,
    depthCompare: 'less',
  },
});


InputMgr.Init(canvas);

const CubeMesh = new Mesh(Shape.cube);
const CubeMesh_Red = new Mesh(Shape.cube);
const SphereMesh = new Mesh(Shape.sphere);

CubeMesh_Red.changeColor(1,0,0);


CameraActor_1.update();
CameraActor_1.setPosition(0,0,10);


const actor_1 = new Actor();
const actor_2 = new Actor();
const actor_3 = new Actor();

LevelMgr.addActor(actor_1);
LevelMgr.addActor(actor_2);
LevelMgr.addActor(actor_3);

actor_1.setMesh(CubeMesh);
actor_2.setMesh(CubeMesh);
actor_2.setPosition(5,0,0);
actor_3.setMesh(CubeMesh);
actor_3.setPosition(-5,0,0);

let moveTarget = {x: 0, y:0, z:0};


let lastTime = 0;
function frame(time) {
    const dt = (time - lastTime) * 0.001;
    lastTime = time;
    InputMgr.tick();
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


    
    CameraActor_1.setRotation(0,0,0);


    
    InputMgr.key_W = () => {
        CameraActor_1.addPosition(0, 0, -10*dt);
    };
    InputMgr.key_S = () => {
        CameraActor_1.addPosition(0, 0, 10*dt);
        console.log(100*dt);
    };

    
    InputMgr.Mouse_Down_Left = () => {
        const p = InputMgr.getMousePosCanvasNDC();
        
        // 카메라에서 제공되는 역 VP 행렬
        let invVP = new Float32Array(16);
        EMath.Matrix4x4_Invert(invVP, viewProjMat);

        const ray = ndcToWorldRay(p.ndcX, p.ndcY, invVP);

        // 지면(y=0)과 교차
        const hit = intersectRayPlane(
            ray.origin,
            ray.dir,
            EMath.v3(0,0,0),  // plane point
            EMath.v3(0,0,1)   // plane normal (y-up)
        );
        console.log("hit", hit);
        if(hit) {
            moveTarget = hit;
            console.log("hit", hit);
        }
    };
    if(moveTarget)
    {
        const pos = actor_1.getPosition();
        const toTarget = EMath.LookAt3(moveTarget, pos);
        const dist = EMath.length3(toTarget);

        // 도착 처리
        const stopEps = 0.02;
        if(dist < stopEps) {
            moveTarget = null;    
        }
        else{
            const dir = EMath.mul3s(toTarget, 1/dist);
            const speed = 2.0;
            const stepLen = speed * dt;

            // 오버슈트 방지 : 남은 거리보다 더 움직이지 않게 clamp
            const step = EMath.mul3s(dir, Math.min(stepLen, dist));
            actor_1.addPosition(step.x, step.y, step.z);
        }
    };
    
    CameraActor_1.update();
    actor_1.setRotation(angle, angle * 0.6, angle*0.3);
    actor_2.setRotation(angle, angle * 0.6, angle*0.3);
    actor_3.setRotation(angle, angle * 0.6, angle*0.3);
    const speed = 0.001;                 // 1.0이면 1초당 1주기(대략)
    const t = time * speed;
    const red = 0.5 + 0.5 * Math.sin(t);   // 0..1

    CubeMesh_Red.changeColor(red, 0, 0);
    
    LevelMgr.update();


    LevelMgr.render(renderPass);
    

    

    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

