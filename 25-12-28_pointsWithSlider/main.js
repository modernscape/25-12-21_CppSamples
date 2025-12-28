import * as THREE from "three";
import Module from "./pointcloud.js";

let scene, camera, renderer;
let points;
let wasm;

init();

async function init() {
  wasm = await Module();
}
