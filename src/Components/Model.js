import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Model = () => {
  const scene = new THREE.Scene();
  let camera, renderer, model;

  //lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  const pointLight = new THREE.PointLight(0xedf6fc, 2.5);
  const purpleHighlight = new THREE.PointLight(0xee00ff, 0.05);
  const ambientLight = new THREE.AmbientLight(0xffffff, 6);
  pointLight.position.set(0, 0, 350);
  directionalLight.position.set(500, -15000, 0);
  scene.add(pointLight, ambientLight, purpleHighlight, directionalLight);

  //loader
  const loader = new GLTFLoader();
  loader.load('./Model/scene.gltf', (gltf) => {
    model = gltf.scene;
    model.rotation.x += 0.5;
    scene.add(model);
    animate();
  });

  const animate = () => {
    if (!model) return;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    if (model.children[0].rotation.z > 6.25) {
      model.children[0].rotation.z = 0;
    } else if (
      model.children[0].rotation.z > 2 &&
      model.children[0].rotation.z < 4.2
    ) {
      model.children[0].rotation.z += 0.01;
    } else model.children[0].rotation.z += 0.0075;
  };

  useEffect(function initCamAndRenderer() {
    camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 1000);
    camera.position.set(0, -80, 280);

    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.model__container'),

      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(1280, 720);
  }, []);

  return <canvas className="model__container" />;
};

export default Model;
