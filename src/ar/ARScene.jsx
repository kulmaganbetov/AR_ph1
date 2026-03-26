import { useEffect } from 'react';

const aframeScript = 'https://aframe.io/releases/1.6.0/aframe.min.js';
const arjsScript = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';

function appendScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Script failed: ${src}`));
    document.body.appendChild(script);
  });
}

function ARScene() {
  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        await appendScript(aframeScript);
        await appendScript(arjsScript);
        if (!mounted) return;

        const container = document.getElementById('ar-container');
        if (!container || container.querySelector('a-scene')) return;

        container.innerHTML = `
          <a-scene embedded vr-mode-ui="enabled: false" renderer="logarithmicDepthBuffer: true;"
            arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
            <a-marker preset="hiro">
              <a-box position="0 0.5 0" material="color: #38bdf8"></a-box>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        `;
      } catch (error) {
        const container = document.getElementById('ar-container');
        if (container) container.textContent = 'AR жүктелмеді. Камера рұқсатын тексеріңіз.';
      }
    };

    setup();
    return () => {
      mounted = false;
    };
  }, []);

  return <div id="ar-container" className="ar-container" />;
}

export default ARScene;
