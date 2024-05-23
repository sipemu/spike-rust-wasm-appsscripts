// src/wasm.js
async function hello_(name) {
    const wasm = await import("./pkg/wasm_test_bg.wasm");
    const { __wbg_set_wasm, hello } = await import("./pkg/wasm_test_bg.js");
    __wbg_set_wasm(wasm);
    return hello(name);
  }
  
  globalThis.hello_ = hello_;