import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const aframeScript = 'https://aframe.io/releases/1.6.0/aframe.min.js';
const arjsScript = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';

function addScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed: ${src}`));
    document.body.appendChild(script);
  });
}

function buildModel(scene, modelType) {
  let mesh;

  if (modelType === 'sphere') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
  } else if (modelType === 'custom') {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.25, 1),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    const spring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 1.2, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, wireframe: true })
    );
    spring.position.y = 0.8;
    const mass = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9 })
    );
    mass.position.y = 1.45;
    group.add(base, spring, mass);
    mesh = group;
  } else {
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
  }

  scene.add(mesh);
  return mesh;
}

function initThreeFallback(container, modelType) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.2, 3.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  const directional = new THREE.DirectionalLight(0xffffff, 1.1);
  directional.position.set(2, 3, 4);
  scene.add(ambient, directional);

  const mesh = buildModel(scene, modelType);

  let dragging = false;
  let prevX = 0;
  renderer.domElement.addEventListener('pointerdown', (event) => {
    dragging = true;
    prevX = event.clientX;
  });
  renderer.domElement.addEventListener('pointerup', () => {
    dragging = false;
  });
  renderer.domElement.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - prevX;
    mesh.rotation.y += delta * 0.01;
    prevX = event.clientX;
  });

  const clock = new THREE.Clock();
  let rafId;
  const animate = () => {
    const elapsed = clock.getElapsedTime();
    if (modelType === 'custom' && mesh.children?.[2]) {
      mesh.children[2].position.y = 1.45 + Math.sin(elapsed * 3) * 0.12;
    }
    rafId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    container.innerHTML = '';
  };
}

function ARViewWithFallback({ modelType }) {
  const [mode, setMode] = useState('idle');
  const [debug, setDebug] = useState('AR режимін бастау үшін түймені басыңыз.');
  const fallbackRef = useRef(null);

  useEffect(() => {
    if (mode !== 'fallback' || !fallbackRef.current) return;
    const cleanup = initThreeFallback(fallbackRef.current, modelType);
    return cleanup;
  }, [mode, modelType]);

  const startAR = async () => {
    const sceneContainer = document.getElementById('ar-scene-host');
    if (!sceneContainer) return;
    sceneContainer.innerHTML = '';

    try {
      if (!window.isSecureContext) {
        throw new Error('HTTPS қажет (камера тек secure context-та).');
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Бұл браузерде getUserMedia қолдауы жоқ.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      stream.getTracks().forEach((track) => track.stop());

      await addScript(aframeScript);
      await addScript(arjsScript);

      setMode('ar');
      setDebug('AR іске қосылды. Hiro маркерін камераға толық көрсетіңіз.');
      sceneContainer.innerHTML = `
        <a-scene
          embedded
          vr-mode-ui="enabled: false"
          renderer="antialias: true; logarithmicDepthBuffer: true;"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        >
          <a-marker preset="hiro">
            ${modelType === 'sphere'
              ? '<a-sphere position="0 0.7 0" radius="0.5" color="#38bdf8"></a-sphere>'
              : '<a-box position="0 0.6 0" color="#38bdf8"></a-box>'}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      `;
    } catch (error) {
      setMode('fallback');
      setDebug(`AR іске қосылмады: ${error.message}. Fallback 3D viewer қосылды.`);
    }
  };

  return (
    <div className="ar-wrapper">
      <button className="btn" onClick={startAR}>
        Start AR Camera
      </button>
      <p className="debug">{debug}</p>
      <div id="ar-scene-host" className={`ar-container ${mode === 'ar' ? '' : 'hidden'}`} />
      {mode === 'fallback' && <div ref={fallbackRef} className="fallback-canvas" />}
    </div>
  );
}

export default ARViewWithFallback;
