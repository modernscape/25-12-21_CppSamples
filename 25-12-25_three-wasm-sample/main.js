import * as THREE from "three";
import PointModule from "./pointcloud";

const COUNT = 1000;

PointModule().then((Module) => {
  const ptr = Module._generate_points(COUNT);

  const positions = new Float32Array(Module.HEAPF32.buffer, ptr, COUNT * 3);
});
