// Camera.js
import { viewProjMat, canvas } from "../Global.js";
import Actor from "./Actor.js";
import EMath from "../EMath.js";


export default class CameraActor extends Actor {
    constructor() {
        super();
    }


    setPosition(x,y,z) { 
        super.setPosition(x,y,z); 
    }
    setRotation(x,y,z) { 
        super.setRotation(x,y,z); 
    }

    updateViewProj() {
        const aspect = canvas.width / canvas.height;
        const proj = new Float32Array(16);
        const view = new Float32Array(16);
        EMath.Matrix4x4_Perspective(proj, EMath.DegreeToRadians(90), aspect, 0.1, 1000);

        EMath.Matrix4x4_Multiply(this.worldMat, this.Position, this.Rotation);
        EMath.Matrix4x4_Invert(view, this.worldMat);
        EMath.Matrix4x4_Multiply(viewProjMat, proj, view);
    }

    
}