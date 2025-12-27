import * as THREE from "three";
import PointModule from "/pointcloud.js";

const COUNT = 100;

PointModule().then((Module) => {
  const ptr = Module._generate_points(COUNT);

  console.log("Module.HEAPF32"); // OK
  console.log(Module.HEAPF32); // OK

  // ★ここが核心：Wasm メモリをそのまま参照
  const positions = Module.HEAPF32.subarray(
    ptr >> 2, // ptr / 4
    (ptr >> 2) + COUNT * 3
  );

  console.log(positions.slice(0, 9));

  //   Module._free_points(ptr);

  // Three.js Geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xff0000,
  });

  const points = new THREE.Points(geometry, material);
  const scene = new THREE.Scene();
  scene.add(points);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
