import EMath from "../EMath.js";
import logSystem_1 from "../LogSystem.js";
import Mesh from "../Mesh.js";

export default async function createEngine(canvas, log) {
    const context = canvas.getContext("webgpu");

    // WebGPU 지원 확인.
    if(!navigator.gpu) {
        // alert("This browser does not support webgpu")
        logSystem_1.error("This browser does not support webgpu");
    }

    return {
        context
    }
}




