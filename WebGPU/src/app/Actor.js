import EMath from "../EMath.js";
import { device, uniformBindGroupLayout} from "../Global.js";
import { viewProjMat } from "../Global.js";
import { Mesh } from "../Mesh.js";

export default class Actor {
    constructor() {
        this.worldMat = new Float32Array(16);
        this.Position = new Float32Array(3);
        this.Rotation = new Float32Array(3);
        this.posMat = new Float32Array(16);
        this.rotMat = new Float32Array(16);
        this.ActorMesh = null;
        EMath.Matrix4x4_Identity(this.worldMat);
        this.Position[0]=0; this.Position[1]=0; this.Position[2]=0;
        this.Rotation[0]=0; this.Rotation[1]=0; this.Rotation[2]=0;

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
        this.Position[0] = x;
        this.Position[1] = y;
        this.Position[2] = z;
    }
    setRotation(x,y,z) { 
        this.Rotation[0] = x;
        this.Rotation[1] = y;
        this.Rotation[2] = z;
    }

    getPosition() {
        return {
            x: this.Position[0],
            y: this.Position[1],
            z: this.Position[2],
        }
    }

    getRotation() {
        return {
            x: this.Rotation[0],
            y: this.Rotation[1],
            z: this.Rotation[2],
        }
    }

    addPosition(x,y,z) { 
        this.Position[0] += x;
        this.Position[1] += y;
        this.Position[2] += z;
    }
    addRotation(x,y,z) { 
        this.Rotation[0] += x;
        this.Rotation[1] += y;
        this.Rotation[2] += z;
    }

    setMesh(_mesh) {
        this.ActorMesh = _mesh;
        
    }
    

    update() {
        const data = new Float32Array(32);
        EMath.Matrix4x4_Identity(this.posMat);
        EMath.Matrix4x4_Identity(this.rotMat);
        EMath.Matrix4x4_Translate(this.posMat, this.Position[0], this.Position[1], this.Position[2]);
        EMath.Matrix4x4_Rotate(this.rotMat, this.Rotation[0], this.Rotation[1], this.Rotation[2]);
        

        EMath.Matrix4x4_Multiply(this.worldMat, this.posMat, this.rotMat);

        data.set(this.worldMat, 0);
        data.set(viewProjMat, 16);
        
        device.queue.writeBuffer(this.uniformBuffer, 0, data);
        if (!Number.isFinite(this.rotMat[0])) console.log("rotMat NaN/Inf", this.Rotation);
        for (let i=0;i<16;i++) if(!Number.isFinite(this.rotMat[i])) { console.log("BAD rotMat", i, this.rotMat[i]); break; }
    }

    render(renderPass) {
        if(!this.ActorMesh) return;
        renderPass.setVertexBuffer(0, this.ActorMesh.vertexBuffer);
        renderPass.setIndexBuffer(this.ActorMesh.indexBuffer, this.ActorMesh.indexFormat);
        renderPass.setBindGroup(0, this.bindGroup);
        renderPass.drawIndexed(this.ActorMesh.indexCount);
    }
}