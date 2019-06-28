/// <reference types="@webgpu/types" />

type ImplType = Promise<GPU>;
let impl: ImplType;

export function getGPU(): ImplType {
  if (impl) {
    return impl;
  }

  // We can probably remove Dawn related code for now to not confuse people and also because our node module is super busted.
  let dawn = false;
  if (typeof require !== 'undefined') {
    const fs = require('fs');
    if (fs.existsSync('dawn/index.node')) {
      dawn = true;
    }
  }

  if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
    // tslint:disable-next-line: ban-ts-ignore
    // comment what this ignore is ignoring
    // @ts-ignore: TS7017
    impl = navigator.gpu;
  } else if (dawn) {
    impl = import('../../../third_party/dawn').then(mod => mod.default);
  } else {
    // tslint:disable-next-line no-console
    console.warn('Neither navigator.gpu nor Dawn was found. Using dummy.');
    impl = import('./dummy.js').then(mod => mod.default);
  }
  return impl;
}
