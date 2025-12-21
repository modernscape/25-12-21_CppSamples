const wasm = await WebAssembly.instantiateStreaming(
  fetch("add.wasm"),
  {}
);

console.log("add(15, 6) =", wasm.instance.exports.add(15, 16));
