import * as THREE from "three";
import Module from "./pointcloud.js";

let scene, camera, renderer;
let points;
let wasm;

init();

async function init() {
  wasm = await Module();

  console.log(wasm);
  // --- Three.js 初期化 ---
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100 //
  );
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 初期点群
}
