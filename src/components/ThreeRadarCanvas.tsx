import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RADAR_TELEMETRY_NODES } from '../data/defenseData';
import { Shield, Eye, Compass, RotateCcw, Crosshair, ChevronDown, ChevronUp } from 'lucide-react';

export const ThreeRadarCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<typeof RADAR_TELEMETRY_NODES[0] | null>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [radarSpeed, setRadarSpeed] = useState<number>(1.0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'army' | 'navy' | 'air'>('all');

  // Mutable refs for Three.js state
  const stateRef = useRef({
    speed: 1.0,
    activeFilter: 'all',
    targetCameraPos: new THREE.Vector3(0, 3.5, 4.5),
    targetLookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    stateRef.current.speed = radarSpeed;
  }, [radarSpeed]);

  useEffect(() => {
    stateRef.current.activeFilter = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060907, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Procedural Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x132e1f, 0.8);
    scene.add(ambientLight);

    const dirKeyLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    dirKeyLight.position.set(5, 10, 7);
    scene.add(dirKeyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x052e16, 0.9);
    scene.add(hemiLight);

    // Radar Root Group
    const radarGroup = new THREE.Group();
    scene.add(radarGroup);

    // 1. Concentric Range Rings (tactical grid circles)
    const ringRadii = [0.8, 1.6, 2.4, 3.2];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.008, r, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === ringRadii.length - 1 ? 0xc5a059 : 0x166534,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: idx === ringRadii.length - 1 ? 0.45 : 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.01 * idx;
      radarGroup.add(ring);
    });

    // 2. Azimuth Axis Crosshairs
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x14532d,
      transparent: true,
      opacity: 0.35,
    });
    const crossPoints = [
      new THREE.Vector3(-3.4, 0.02, 0),
      new THREE.Vector3(3.4, 0.02, 0),
      new THREE.Vector3(0, 0.02, -3.4),
      new THREE.Vector3(0, 0.02, 3.4),
      // 45 degree diagonals
      new THREE.Vector3(-2.4, 0.02, -2.4),
      new THREE.Vector3(2.4, 0.02, 2.4),
      new THREE.Vector3(-2.4, 0.02, 2.4),
      new THREE.Vector3(2.4, 0.02, -2.4),
    ];
    for (let i = 0; i < crossPoints.length; i += 2) {
      const g = new THREE.BufferGeometry().setFromPoints([crossPoints[i], crossPoints[i + 1]]);
      const line = new THREE.Line(g, lineMat);
      radarGroup.add(line);
    }

    // 3. Radar Dome Wireframe (Hemisphere)
    const domeGeo = new THREE.SphereGeometry(3.2, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x166534,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    radarGroup.add(dome);

    // 4. Ground Contact Grid
    const gridHelper = new THREE.GridHelper(7.0, 28, 0x22c55e, 0x092e1a);
    gridHelper.position.y = 0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    radarGroup.add(gridHelper);

    // 5. Sweeping Radar Beam (Sector Mesh with Gradient)
    const sweepAngle = Math.PI / 3; // 60 degrees fan
    const sweepGeo = new THREE.RingGeometry(0.05, 3.2, 32, 1, 0, sweepAngle);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    sweepMesh.rotation.x = Math.PI / 2;
    sweepMesh.position.y = 0.04;
    radarGroup.add(sweepMesh);

    // Leading edge beam line
    const leadGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(3.2, 0.05, 0),
    ]);
    const leadMat = new THREE.LineBasicMaterial({
      color: 0x86efac,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const leadLine = new THREE.Line(leadGeo, leadMat);
    radarGroup.add(leadLine);

    // 6. Interactive Telemetry Node Points
    const nodeMeshes: THREE.Group[] = [];
    const nodeRaycastTargets: THREE.Mesh[] = [];

    RADAR_TELEMETRY_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(node.position[0] * 3.2, 0.15, node.position[2] * 3.2);

      // Core Diamond / Octahedron
      const coreGeo = new THREE.OctahedronGeometry(0.1, 0);
      const isHQ = node.id === 'dhaka-command';
      const coreMat = new THREE.MeshStandardMaterial({
        color: isHQ ? 0xd4af37 : 0x22c55e,
        emissive: isHQ ? 0x92400e : 0x14532d,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      nodeGroup.add(core);

      // Pulse Ring
      const ringG = new THREE.RingGeometry(0.12, 0.16, 24);
      const ringM = new THREE.MeshBasicMaterial({
        color: isHQ ? 0xd4af37 : 0x4ade80,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const pRing = new THREE.Mesh(ringG, ringM);
      pRing.rotation.x = Math.PI / 2;
      nodeGroup.add(pRing);

      // Vertical Telemetry Stalk
      const stalkGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.15, 0),
        new THREE.Vector3(0, 0.35, 0),
      ]);
      const stalkMat = new THREE.LineBasicMaterial({
        color: isHQ ? 0xd4af37 : 0x16a34a,
        transparent: true,
        opacity: 0.5,
      });
      const stalk = new THREE.Line(stalkGeo, stalkMat);
      nodeGroup.add(stalk);

      // Hit Target (invisible larger sphere for comfortable clicking/hover)
      const hitGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { nodeData: node, parentGroup: nodeGroup };
      nodeGroup.add(hitMesh);
      nodeRaycastTargets.push(hitMesh);

      radarGroup.add(nodeGroup);
      nodeMeshes.push(nodeGroup);
    });

    // Raycaster for user interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeRaycastTargets);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
      } else {
        container.style.cursor = 'default';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeRaycastTargets);

      if (intersects.length > 0) {
        const targetNode = intersects[0].object.userData.nodeData as typeof RADAR_TELEMETRY_NODES[0];
        setSelectedNode(targetNode);
        // Gently ease camera towards node
        const nodePos = intersects[0].object.userData.parentGroup.position;
        stateRef.current.targetCameraPos.set(
          nodePos.x * 0.7,
          2.6,
          nodePos.z * 0.7 + 2.0
        );
        stateRef.current.targetLookAt.set(nodePos.x, 0.2, nodePos.z);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // Mouse drag for smooth orbital inspection
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let orbitAzimuth = 0;
    let orbitPolar = Math.PI / 4;
    const orbitDistance = 5.2;

    const onMouseDown = (e: MouseEvent) => {
      // only drag if clicked on canvas
      if (e.button === 0) {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseMoveOrbit = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      orbitAzimuth -= dx * 0.006;
      orbitPolar = Math.max(0.15, Math.min(Math.PI / 2.2, orbitPolar - dy * 0.006));

      stateRef.current.targetCameraPos.set(
        Math.sin(orbitAzimuth) * Math.cos(orbitPolar) * orbitDistance,
        Math.sin(orbitPolar) * orbitDistance,
        Math.cos(orbitAzimuth) * Math.cos(orbitPolar) * orbitDistance
      );
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMoveOrbit);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let angle = 0;
    let frameId = 0;
    let timerId = 0;
    const currentCamPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const scheduleNextFrame = () => {
      if (isSoftwareGl) {
        timerId = window.setTimeout(() => {
          frameId = requestAnimationFrame(tick);
        }, 33);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // 1. Rotate radar scanner
      const sweepDelta = 0.025 * stateRef.current.speed;
      angle += sweepDelta;

      sweepMesh.rotation.z = -angle;
      leadLine.rotation.y = angle;

      // 2. Pulse nodes and rotate octahedrons
      nodeMeshes.forEach((g, i) => {
        const core = g.children[0] as THREE.Mesh;
        if (core) {
          core.rotation.y += 0.015;
          core.rotation.x = Math.sin(angle * 1.5 + i) * 0.2;
        }
        const ring = g.children[1] as THREE.Mesh;
        if (ring) {
          const s = 1.0 + Math.sin(angle * 2.5 + i) * 0.25;
          ring.scale.set(s, s, s);
        }
      });

      // 3. Smooth Camera Damping (Exponential)
      currentCamPos.lerp(stateRef.current.targetCameraPos, 0.05);
      currentLookAt.lerp(stateRef.current.targetLookAt, 0.05);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
      scheduleNextFrame();
    };

    frameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMoveOrbit);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const resetView = () => {
    stateRef.current.targetCameraPos.set(0, 3.8, 5.0);
    stateRef.current.targetLookAt.set(0, 0, 0);
    setSelectedNode(null);
  };

  const focusSector = (preset: 'all' | 'dhaka' | 'chattogram' | 'baf' | 'un') => {
    if (preset === 'all') {
      resetView();
    } else if (preset === 'dhaka') {
      const n = RADAR_TELEMETRY_NODES[0];
      setSelectedNode(n);
      stateRef.current.targetCameraPos.set(0.3, 2.8, 2.6);
      stateRef.current.targetLookAt.set(0.3, 0.2, 0.6);
    } else if (preset === 'chattogram') {
      const n = RADAR_TELEMETRY_NODES[1];
      setSelectedNode(n);
      stateRef.current.targetCameraPos.set(1.4, 2.2, 2.8);
      stateRef.current.targetLookAt.set(1.6, 0.2, 1.2);
    } else if (preset === 'baf') {
      const n = RADAR_TELEMETRY_NODES[3];
      setSelectedNode(n);
      stateRef.current.targetCameraPos.set(0.2, 2.5, 1.8);
      stateRef.current.targetLookAt.set(0.1, 0.3, -0.3);
    } else if (preset === 'un') {
      const n = RADAR_TELEMETRY_NODES[6];
      setSelectedNode(n);
      stateRef.current.targetCameraPos.set(-1.8, 2.4, 2.4);
      stateRef.current.targetLookAt.set(-1.9, 0.2, 1.6);
    }
  };

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] rounded-2xl bg-[#060a08] border border-stone-800/80 overflow-hidden shadow-2xl">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Telemetry Overlay (Header HUD) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-[#c5a059]">
            <Crosshair className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
              <span>TACTICAL RADAR SURVEILLANCE GRID</span>
              <span className="text-stone-500 font-normal">·</span>
              <span className="text-stone-400 font-mono text-[11px]">RANGE: 320 KM</span>
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              INTERACTIVE 3D SECTOR COVERAGE · DRAG TO ROTATE
            </div>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={resetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-xs text-stone-200 transition-colors shadow-sm"
            title="Reset Radar Orientation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>
      </div>

      {/* Inspector Card (when node selected) */}
      {selectedNode && (
        <div className="absolute top-16 right-4 max-w-sm w-full bg-[#090f0c]/95 border border-emerald-800/70 p-4 rounded-xl shadow-2xl z-20 text-left backdrop-blur-none animate-fadeIn">
          <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-2.5 mb-2.5">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                {selectedNode.type}
              </div>
              <h4 className="text-sm font-bold text-stone-100">{selectedNode.name}</h4>
              <div className="text-xs text-stone-400 font-display">{selectedNode.nativeName}</div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-300">
              <span className="text-stone-500">Coordinates:</span>
              <span className="font-mono text-emerald-400">{selectedNode.coordinates}</span>
            </div>
            <div className="flex items-center justify-between text-stone-300">
              <span className="text-stone-500">Readiness:</span>
              <span className="text-[#c5a059] font-medium">{selectedNode.status}</span>
            </div>
            <div>
              <div className="text-stone-500 text-[11px] mb-1">Stationed Units & Roles:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.forces.map((f, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Bottom Control Dock (Collapsible, Zero Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-20 transition-all duration-300">
        <div className="flex justify-center">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1 px-3 py-1 bg-stone-900/95 hover:bg-stone-800 border border-b-0 border-stone-700/80 text-[11px] text-stone-300 rounded-t-lg transition-colors cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Show Radar Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hide Controls</span>
              </>
            )}
          </button>
        </div>

        {!isDockCollapsed && (
          <div className="p-3 bg-[#0a110d]/95 border border-stone-700/80 rounded-xl shadow-2xl flex flex-wrap items-center justify-between gap-3">
            {/* Sector Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-stone-400 uppercase font-mono mr-1">Sector:</span>
              <button
                onClick={() => focusSector('all')}
                className="px-2.5 py-1 text-xs rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                All Grid
              </button>
              <button
                onClick={() => focusSector('dhaka')}
                className="px-2.5 py-1 text-xs rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 transition-colors"
              >
                Dhaka GHQ
              </button>
              <button
                onClick={() => focusSector('chattogram')}
                className="px-2.5 py-1 text-xs rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800/50 transition-colors"
              >
                Navy Fleet
              </button>
              <button
                onClick={() => focusSector('baf')}
                className="px-2.5 py-1 text-xs rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/50 transition-colors"
              >
                Air Intercept
              </button>
              <button
                onClick={() => focusSector('un')}
                className="px-2.5 py-1 text-xs rounded bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800/50 transition-colors"
              >
                UN Vector
              </button>
            </div>

            {/* Sweep Speed Control */}
            <div className="flex items-center gap-2 text-xs text-stone-300 ml-auto">
              <span className="text-stone-400 text-[11px] font-mono">Sweep:</span>
              <button
                onClick={() => setRadarSpeed(0.5)}
                className={`px-2 py-0.5 rounded text-[11px] ${radarSpeed === 0.5 ? 'bg-emerald-600 text-white font-medium' : 'bg-stone-800 text-stone-400'}`}
              >
                0.5×
              </button>
              <button
                onClick={() => setRadarSpeed(1.0)}
                className={`px-2 py-0.5 rounded text-[11px] ${radarSpeed === 1.0 ? 'bg-emerald-600 text-white font-medium' : 'bg-stone-800 text-stone-400'}`}
              >
                1.0×
              </button>
              <button
                onClick={() => setRadarSpeed(2.0)}
                className={`px-2 py-0.5 rounded text-[11px] ${radarSpeed === 2.0 ? 'bg-emerald-600 text-white font-medium' : 'bg-stone-800 text-stone-400'}`}
              >
                2.0×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
