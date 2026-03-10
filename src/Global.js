// Device.js


export const canvas = document.getElementById('gfx');
export const context = canvas.getContext("webgpu");

// GPU Context 핸들 받아오기
const adapter = await navigator.gpu.requestAdapter();
    if(!adapter) {
        console.error("Failed to get GPU adapter.")
    }
    

export const device = await adapter.requestDevice();
    if(!device) {
        console.error("Failed to get GPU device.")
    }

export const format = navigator.gpu.getPreferredCanvasFormat();
    if(!format) {
        console.error("Failed to get GPU format.")
    }

// 깊이 텍스처
export let depthTexture = device.createTexture({
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT
});

export function updateDepthTexture() {
    depthTexture = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
    });
}

// bind group layout & bind group
export const uniformBindGroupLayout = device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.VERTEX,
            buffer: { type: "uniform" }
        }
    ]
});


context.configure({
  device,
  format,
  alphaMode: "opaque",
});


export const viewProjMat = new Float32Array(16);



