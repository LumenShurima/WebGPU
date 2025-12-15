import EMath from "../EMath.js";
import { device, uniformBindGroupLayout} from "../Global.js";
import { viewProjMat } from "../Global.js";
import { Mesh } from "../Mesh.js";

export default class Actor {
    constructor() {
        this.worldMat = new Float32Array(16);
        this.Position = new Float32Array(16);
        this.Rotation = new Float32Array(16);
        this.ActorMesh = null;
        EMath.Matrix4x4_Identity(this.worldMat);
        EMath.Matrix4x4_Identity(this.Position);
        EMath.Matrix4x4_Identity(this.Rotation);

        this.uniformBuffer = device.createBuffer({
            size: 32 * 4, // mat4 * 2
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        this.bindGroup = device.createBindGroup({
            layout: uniformBindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } }
            ],
        });
    }

    setPosition(x,y,z) { 
        EMath.Matrix4x4_Identity(this.Position);
        EMath.Matrix4x4_Translate(this.Position,x,y,z); 
    }
    setRotation(x,y,z) { 
        EMath.Matrix4x4_Identity(this.Rotation);
        EMath.Matrix4x4_Rotate(this.Rotation,x,y,z); 
    }

    setMesh(_mesh) {
        this.ActorMesh = _mesh;
        
    }
    

    update() {
        const data = new Float32Array(32);
        data.set(this.worldMat, 0);
        data.set(viewProjMat, 16);
        EMath.Matrix4x4_Multiply(this.worldMat, this.Position, this.Rotation);
        device.queue.writeBuffer(this.uniformBuffer, 0, data);
    }

    render(renderPass) {
        renderPass.setVertexBuffer(0, this.ActorMesh.vertexBuffer);
        renderPass.setIndexBuffer(this.ActorMesh.indexBuffer, this.ActorMesh.indexFormat);
        renderPass.setBindGroup(0, this.bindGroup);
        renderPass.drawIndexed(this.ActorMesh.indexCount);
    }
}