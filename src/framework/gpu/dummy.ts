/* tslint:disable:max-line-length */

import * as w from "./interface.js";

const kNoExtensions: w.GPUExtensions = {
  anisotropicFiltering: false,
};
const kDefaultLimits: w.GPULimits = {
  maxBindGroups: 4,
};

class BindGroup implements w.GPUBindGroup {
}
class BindGroupLayout implements w.GPUBindGroupLayout {
}
class Buffer implements w.GPUBuffer {
  public readonly mapping: ArrayBuffer | null = null;
  constructor() {}
  public destroy() {}
  public unmap() {}

  public async mapReadAsync(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0)
  }
  public setSubData(offset: number, ab: ArrayBuffer): void {}
}
class CommandEncoder implements w.GPUCommandEncoder {
  public label: string | undefined;
  public beginComputePass(): w.GPUComputePassEncoder {
    return new ComputePassEncoder();
  }
  public beginRenderPass(descriptor: w.GPURenderPassDescriptor): w.GPURenderPassEncoder {
    return new RenderPassEncoder();
  }
  public blit(): void {}
  public copyBufferToBuffer(src: w.GPUBuffer, srcOffset: number, dst: w.GPUBuffer, dstOffset: number, size: number): void {}
  public copyBufferToTexture(source: w.GPUBufferCopyView, destination: w.GPUTextureCopyView, copySize: w.GPUExtent3D): void {}
  public copyTextureToBuffer(source: w.GPUTextureCopyView, destination: w.GPUBufferCopyView, copySize: w.GPUExtent3D): void {}
  public copyTextureToTexture(source: w.GPUTextureCopyView, destination: w.GPUTextureCopyView, copySize: w.GPUExtent3D): void {}
  public finish(): w.GPUCommandBuffer {
    return new CommandBuffer();
  }
}
class CommandBuffer implements w.GPUCommandBuffer {
  public label: string | undefined;
}
class ProgrammablePassEncoder {
  constructor() {}
  public endPass(): void {}
  public insertDebugMarker(markerLabel: string): void {}
  public popDebugGroup(groupLabel: string): void {}
  public pushDebugGroup(groupLabel: string): void {}
  public setBindGroup(index: number, bindGroup: BindGroup): void {}
  public setPipeline(pipeline: ComputePipeline | RenderPipeline): void {}
}
class ComputePassEncoder extends ProgrammablePassEncoder implements w.GPUComputePassEncoder {
  public label: string | undefined;
  public dispatch(x: number, y: number, z: number): void {}
}
class RenderPassEncoder extends ProgrammablePassEncoder implements w.GPURenderPassEncoder {
  public label: string | undefined;
  public draw(vertexCount: number, instanceCount: number, firstVertex: number, firstInstance: number): void {}
  public drawIndexed(indexCount: number, instanceCount: number, firstIndex: number, baseVertex: number, firstInstance: number): void {}
  public setBlendColor(r: number, g: number, b: number, a: number): void {}
  public setIndexBuffer(buffer: Buffer, offset: number): void {}
  public setScissorRect(x: number, y: number, width: number, height: number): void {}
  public setStencilReference(reference: number): void {}
  public setVertexBuffers(startSlot: number, buffers: Buffer[], offsets: number[]): void {}
  public setViewport(x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number): void {}
}
class ComputePipeline implements w.GPUComputePipeline {
  public label: string | undefined;
}
class Fence implements w.GPUFence {
  public label: string | undefined;
  public getCompletedValue(): w.u64 {
    return 0;
  }
  public onCompletion(completionValue: w.u64): Promise<void> {
    return Promise.resolve();
  }
}
class PipelineLayout implements w.GPUPipelineLayout {
}
class RenderPipeline implements w.GPURenderPipeline {
  public label: string | undefined;
}
class Sampler implements w.GPUSampler {
}
class ShaderModule implements w.GPUShaderModule {
  public label: string | undefined;
}
class Texture implements w.GPUTexture {
  constructor() {}
  public createDefaultTextureView(): TextureView {
    return new TextureView();
  }
  public createTextureView(desc: w.GPUTextureViewDescriptor): TextureView {
    return new TextureView();
  }
  public destroy() {}
}
class TextureView {
  constructor() {}
}
class Queue implements w.GPUQueue {
  public label: string | undefined;
  public signal(fence: Fence, signalValue: w.u64): void {}
  public submit(buffers: CommandBuffer[]): void {}
  public wait(fence: Fence, valueToWait: w.u64): void {}
}
class Device extends EventTarget implements w.GPUDevice {
  public readonly adapter: Adapter;
  public readonly extensions: w.GPUExtensions;
  public readonly limits = kDefaultLimits;
  private queue: Queue = new Queue();
  constructor(adapter: Adapter, descriptor: w.GPUDeviceDescriptor) {
    super();
    this.adapter = adapter;
    this.extensions = descriptor.extensions || kNoExtensions;
  }
  public createBindGroup(descriptor: w.GPUBindGroupDescriptor): BindGroup { return new BindGroup(); }
  public createBindGroupLayout(descriptor: w.GPUBindGroupLayoutDescriptor): BindGroupLayout { return new BindGroupLayout(); }
  public createBuffer(descriptor: w.GPUBufferDescriptor): Buffer { return new Buffer(); }
  public createCommandEncoder(descriptor: w.GPUCommandEncoderDescriptor): CommandEncoder { return new CommandEncoder(); }
  public createComputePipeline(descriptor: w.GPUComputePipelineDescriptor): ComputePipeline { return new ComputePipeline(); }
  public createFence(descriptor: w.GPUFenceDescriptor): Fence { return new Fence(); }
  public createPipelineLayout(descriptor: w.GPUPipelineLayoutDescriptor): PipelineLayout { return new PipelineLayout(); }
  public createRenderPipeline(descriptor: w.GPURenderPipelineDescriptor): RenderPipeline { return new RenderPipeline(); }
  public createSampler(descriptor: w.GPUSamplerDescriptor): Sampler { return new Sampler(); }
  public createShaderModule(descriptor: w.GPUShaderModuleDescriptor): ShaderModule { return new ShaderModule(); }
  public createTexture(descriptor: w.GPUTextureDescriptor): Texture { return new Texture(); }

  public getQueue(): Queue { return this.queue; }

  // TODO: temporary
  public flush(): void {}
}

class Adapter implements w.GPUAdapter {
  public extensions = kNoExtensions;
  public name = "dummy";
  public async requestDevice(descriptor: w.GPUDeviceDescriptor): Promise<Device> {
    return new Device(this, descriptor);
  }

  // TODO: remove.
  public createDevice(descriptor: w.GPUDeviceDescriptor): Device {
    return new Device(this, descriptor);
  }
}

import { GPU } from "./interface";
const gpu: GPU = {
  async requestAdapter(options?: w.GPURequestAdapterOptions): Promise<w.GPUAdapter> {
    return new Adapter();
  },
};
export default gpu;
