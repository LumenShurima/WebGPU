// shader.wgsl

struct Uniforms {
    modelMatrix     : mat4x4<f32>,
    viewProjMatrix  : mat4x4<f32>,
};

@group(0) @binding(0)
var<uniform> uniforms : Uniforms;

struct VSIn {
    @location(0) position   : vec3<f32>,
    @location(1) color      : vec4<f32>,
};

struct VSOut {
    @builtin(position) position : vec4<f32>,
    @location(0) color          : vec4<f32>,
};

@vertex
fn vs_main(input : VSIn) -> VSOut {
    var out : VSOut;
    let pos = uniforms.viewProjMatrix * uniforms.modelMatrix * vec4<f32>(input.position, 1.0);
    out.position = pos;
    out.color = input.color;
    return out;
}

@fragment
fn fs_main(input : VSOut) -> @location(0) vec4<f32> {
    return vec4<f32>(input.color);
}
