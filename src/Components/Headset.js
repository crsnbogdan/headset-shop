import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Headset = () => {
  const scene = new THREE.Scene();
  let camera, renderer, headset;

  //lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  const pointLight = new THREE.PointLight(0xedf6fc, 0.5);
  const purpleHighlight = new THREE.PointLight(0x7f32fa, 1);
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  pointLight.position.set(500, 100, 3000);
  directionalLight.position.set(500, -15000, 0);
  scene.add(pointLight, ambientLight, purpleHighlight, directionalLight);

  //loader
  const loader = new GLTFLoader();
  loader.load('./headset/scene.gltf', (gltf) => {
    headset = gltf.scene;
    scene.add(headset);
    animate();
  });

  const animate = () => {
    if (!headset) return;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    headset.children[0].rotation.z += 0.01;
  };

  useEffect(function initCamAndRenderer() {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 180, 700);

    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.headset__container'),
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.5);
    renderer.setSize(1280, 720);
  }, []);

  return <canvas className="headset__container" />;
};

export default Headset;
