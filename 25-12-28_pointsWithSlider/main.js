import * as THREE from "three";
import Module from "./pointcloud.js";

let scene, camera, renderer;
let points;
let wasm;

init();

async function init() {
  wasm = await Module();

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
  const slider = document.getElementById("slider");
  createPoints(Number(slider.value));

  // スライダー値表示
  const valueLabel = document.getElementById("value");
  slider.addEventListener("input", () => {
    valueLabel.textContent = slider.value;
    updatePoints(Number(slider.value));
  });

  animate();
}

function createPoints(count) {
  const positions = getPointsFromWasm(count); // Float32Array
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({color: 0x44aa88, size: 0.02});

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

function updatePoints(count) {
  const positions = getPointsFromWasm(count);

  points.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  points.geometry.attributes.position.needsUpdate = true;
}

function getPointsFromWasm(count) {
  const ptr = wasm._generate_points(count);

  const heap = new Float32Array(
    wasm.HEAPF32.buffer,
    ptr,
    count * 3 //
  );

  const copy = new Float32Array(heap);
  wasm._free_points(ptr);

  console.log(copy);

  return copy;
}

function animate() {
  requestAnimationFrame(animate);
  if (points) points.rotation.z += 0.004;
  renderer.render(scene, camera);
}
