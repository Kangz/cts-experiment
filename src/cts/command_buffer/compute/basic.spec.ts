export const description = `
Basic command buffer compute tests.
`;

import { TestGroup } from "../../../framework/index.js";
import { GPUTest } from "../../gpu_test.js";

export const group = new TestGroup();

group.testf("memcpy", GPUTest, async (t) => {
  const data = new Uint32Array([0x01020304]).buffer;
  const src = t.device.createBuffer({ size: 4, usage: 4 | 8 });
  const dst = t.device.createBuffer({ size: 4, usage: 4 | 8 });
  src.setSubData(0, data);

  const code = t.compile("c", `#version 450
    layout(std140, set = 0, binding = 0) buffer Src {
      int value;
    } src;
    layout(std140, set = 0, binding = 1) buffer Dst {
      int value;
    } dst;

    void main() {
      dst.value = src.value;
    }
  `);

  const bgl = t.device.createBindGroupLayout({
    bindings: [
      { binding: 0, visibility: 4, type: "storage-buffer" },
      { binding: 1, visibility: 4, type: "storage-buffer" },
    ]
  });
  const bg = t.device.createBindGroup({
    layout: bgl,
    bindings: [
      { binding: 0, resource: { buffer: src, offset: 0, size: 4 } },
      { binding: 1, resource: { buffer: dst, offset: 0, size: 4 } },
    ],
  });

  const module = t.device.createShaderModule({ code });
  const pl = t.device.createPipelineLayout({ bindGroupLayouts: [bgl] });
  const pipeline = t.device.createComputePipeline({
    layout: pl,
    computeStage: { module, entryPoint: "main" },
  });

  const encoder = t.device.createCommandEncoder({})
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bg);
  pass.dispatch(1);
  pass.endPass();
  t.device.getQueue().submit([encoder.finish()]);

  await t.expectContents(dst, new Uint8Array(data));
});
