"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const ACCENT = "#c6f806";
const BLUE_GLOW = "#c6f806";
const CYAN_GLOW = "#ffffff";
const HEAD_MODEL_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb";

// ─────────────────────────────────────────────────────────────
// Glitch vertex shader
// ─────────────────────────────────────────────────────────────
const glitchVertexShader = `
  uniform float uTime;
  uniform float uGlitchIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;

    vec3 pos = position;

    // Sliced fragmentation offsets
    float sliceY = floor(pos.y * 10.0) / 10.0;
    float slice = step(0.90, sin(sliceY * 30.0 + uTime * 4.0));
    pos.x += slice * uGlitchIntensity * hash(uTime + sliceY) * 0.25;
    pos.z += slice * uGlitchIntensity * hash(uTime - sliceY) * 0.15;

    // Concrete rough micro displacement
    float microNoise = hash(pos.x + pos.y * 37.0 + pos.z * 11.0);
    pos += normal * microNoise * 0.005;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────
// Glitch fragment shader — concrete + wireframe + lime rim + glitch blocks
// ─────────────────────────────────────────────────────────────
const glitchFragmentShader = `
  uniform float uTime;
  uniform float uGlitchIntensity;
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }

  void main() {
    // 1. Shaded Concrete / Photogrammetry Base (Grayscale)
    float diffuse = max(dot(vNormal, vec3(0.5, 0.8, 1.0)), 0.0);
    float ambient = 0.2;
    float noiseVal = hash3(floor(vPosition * 40.0)) * 0.12 + hash3(floor(vPosition * 100.0)) * 0.08;
    vec3 concreteBase = vec3(0.45 + noiseVal) * (diffuse * 0.8 + ambient);

    // 2. Wireframe Edges (Digital Overlay)
    float edgeY = 1.0 - smoothstep(0.0, 0.02, abs(fract(vPosition.y * 60.0) - 0.5));
    float edgeX = 1.0 - smoothstep(0.0, 0.02, abs(fract(vPosition.x * 60.0) - 0.5));
    float edgeZ = 1.0 - smoothstep(0.0, 0.02, abs(fract(vPosition.z * 60.0) - 0.5));
    float edge = clamp(edgeY + edgeX + edgeZ, 0.0, 1.0);
    vec3 wireframeColor = vec3(0.8) * edge * 0.5;

    // 3. CRT Scanline overlay on texture
    float scanLine = sin(vPosition.y * 220.0 + uTime * 4.0) * 0.08 + 0.92;

    // Combine base grayscale look
    vec3 finalColor = concreteBase * scanLine + wireframeColor;

    // 4. Lime Green / Yellow Glitch blocks (Digital Corruption)
    float glitchBar = step(0.94, sin(vPosition.y * 14.0 + uTime * 6.0));
    float glitchNoise = hash3(floor(vPosition * 15.0 + uTime * 0.5));
    float glitchActive = glitchBar * glitchNoise * uGlitchIntensity;
    
    // Inject neon green glitch blocks directly
    vec3 limeNeon = vec3(0.78, 0.97, 0.02);
    finalColor = mix(finalColor, limeNeon * 1.5, step(0.4, glitchActive));

    // 5. Fresnel Rim Light (Subtle Lime Glow)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 8.0);
    vec3 rimLight = limeNeon * fresnel * 0.45;
    finalColor += rimLight;

    float alpha = 0.85 + edge * 0.15;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ─────────────────────────────────────────────────────────────
// Particle field vertex/fragment shaders
// ─────────────────────────────────────────────────────────────
const particleVertexShader = `
  attribute float aScale;
  attribute float aAlpha;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vAlpha = aAlpha;
    vec3 pos = position;
    // Slow drifting animation
    pos.y += sin(uTime * 0.4 + position.x * 3.0) * 0.12;
    pos.x += cos(uTime * 0.2 + position.z * 3.0) * 0.08;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    // Tiny point sizes for fine static noise
    gl_PointSize = aScale * (24.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    // Sharp square pixel block for digital noise look
    gl_FragColor = vec4(uColor, vAlpha * 0.65);
  }
`;

// ─────────────────────────────────────────────────────────────
// HUD overlay data component (memoized)
// ─────────────────────────────────────────────────────────────
interface HudCoords {
  x: string;
  y: string;
  z: string;
}

const HudOverlay = memo(function HudOverlay({
  coords,
  scanProgress,
}: {
  coords: HudCoords;
  scanProgress: number;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none font-mono select-none z-10">
      {/* Background Tech Grid Crosshairs (Plus signs) */}
      <div className="absolute top-[10%] left-[20%] text-[#c6f806]/40 text-xs font-bold">+</div>
      <div className="absolute top-[25%] left-[80%] text-[#c6f806]/40 text-xs font-bold">+</div>
      <div className="absolute top-[75%] left-[30%] text-[#c6f806]/40 text-xs font-bold">+</div>
      <div className="absolute top-[60%] left-[85%] text-[#c6f806]/40 text-xs font-bold">+</div>
      <div className="absolute top-[45%] left-[15%] text-[#c6f806]/40 text-xs font-bold">+</div>

      {/* Grid lines spanning across the HUD container */}
      <div className="absolute inset-0 opacity-[0.03] border-l border-r border-[#c6f806]/30 mx-10 sm:mx-16" />
      <div className="absolute inset-x-0 top-16 opacity-[0.03] border-b border-[#c6f806]/30" />
      <div className="absolute inset-x-0 bottom-16 opacity-[0.03] border-b border-[#c6f806]/30" />

      {/* Top-left: Rendering label & progress */}
      <div className="absolute top-4 left-6 md:top-8 md:left-8 text-[10px] md:text-xs text-zinc-500 space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[#c6f806] font-bold">&gt;</span>
          <span className="text-zinc-300 font-bold uppercase tracking-wider">RENDERING...</span>
        </div>
        <div className="text-zinc-500 font-bold tracking-wider">{scanProgress}%</div>
      </div>

      {/* Top-right: Globe wireframe icon & crosshairs */}
      <div className="absolute top-4 right-6 md:top-8 md:right-8 flex items-center gap-6">
        {/* Globe icon */}
        <div className="text-zinc-500 opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6f806" strokeWidth="1" className="opacity-80">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        {/* Neon Green Plus sign */}
        <div className="text-[#c6f806] text-sm font-bold opacity-80">+</div>
      </div>

      {/* Middle-left: /01 indicator and vertical barcode */}
      <div className="absolute left-6 md:left-8 top-[20%] flex flex-col items-start gap-4">
        {/* /01 */}
        <div className="text-[#c6f806] text-base font-black tracking-widest">
          /01
        </div>

        {/* Scattered green blocks */}
        <div className="flex flex-col gap-1 my-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-1.5 rounded-sm"
              style={{
                backgroundColor: ACCENT,
                opacity: 0.7 + i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Vertical barcode/stripes */}
        <div className="w-6 h-36 md:h-48 flex flex-col gap-[2px] opacity-40 border-l border-zinc-800 pl-1">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="h-[2px] bg-white"
              style={{
                width: `${[16, 24, 8, 20, 12, 4, 18, 10, 22, 14, 6, 24][i % 12]}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-right: Structured Cyber Coordinate Box */}
      <div className="absolute bottom-[20%] right-6 md:right-8 z-20">
        <div className="border border-[#c6f806]/40 bg-zinc-950/90 bg-gradient-to-br from-[#c6f806]/5 to-transparent px-4 py-3 min-w-[140px] shadow-[0_0_15px_rgba(198,248,6,0.05)]">
          <div className="text-[9px] text-[#c6f806]/50 mb-2 font-bold tracking-widest uppercase border-b border-[#c6f806]/10 pb-1">
            SYS_REF_POS
          </div>
          <div className="space-y-1 font-mono text-[10px] md:text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-[#c6f806]/60">X_</span>
              <span className="text-[#c6f806] font-bold tabular-nums">{coords.x}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#c6f806]/60">Y_</span>
              <span className="text-[#c6f806] font-bold tabular-nums">{coords.y}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#c6f806]/60">Z_</span>
              <span className="text-[#c6f806] font-bold tabular-nums">{coords.z}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-right corner label: //SCN_01 */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-[10px] text-zinc-500 tracking-widest font-bold">
        {"//SCN_01"}
      </div>

      {/* Outer borders and scan line details */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c6f806]/30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c6f806]/30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#c6f806]/30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c6f806]/30" />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// CRT / Scan-line overlay (CSS-driven, memoized)
// ─────────────────────────────────────────────────────────────
const ScanlineOverlay = memo(function ScanlineOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-[0.03]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Animated gradient background (memoized)
// ─────────────────────────────────────────────────────────────
const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black select-none">
      {/* Base Dark Graphite Canvas */}
      <div className="absolute inset-0 bg-[#060607]" />

      {/* Fine grid (dark graphite) */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "15px 15px",
        }}
      />

      {/* Engineering grid (lime-green) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(198,248,6,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(198,248,6,0.15) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* Technical guidelines and grid ticks */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] stroke-[#c6f806]" strokeWidth="0.5">
        <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="5,5" />
        <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="5,5" />
      </svg>

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Technical coordinate references */}
      <div className="absolute top-[8%] left-[5%] opacity-25 text-[8px] text-zinc-600 font-mono tracking-widest">
        GRID_UNIT: 90MM // REF_AXIS: GEO_GRID_A
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Button component with compress/expand micro-interaction
// ─────────────────────────────────────────────────────────────
function CyberButton({
  children,
  primary = false,
  href = "#",
}: {
  children: React.ReactNode;
  primary?: boolean;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest
        border cursor-pointer transition-all duration-300 select-none font-mono
        ${
          primary
            ? `bg-[${ACCENT}] text-black border-[${ACCENT}] shadow-[0_0_20px_rgba(198,248,6,0.3)] hover:shadow-[0_0_35px_rgba(198,248,6,0.5)]`
            : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white"
        }
      `}
      style={
        primary
          ? {
              backgroundColor: ACCENT,
              borderColor: ACCENT,
              color: "#000",
              boxShadow: `0 0 20px rgba(198,248,6,0.3)`,
            }
          : undefined
      }
    >
      {children}
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
// Three.js Canvas hook — sets up scene, head model, particles
// ─────────────────────────────────────────────────────────────
function useThreeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  mouseRef: React.RefObject<{ x: number; y: number }>
) {
  const animFrameRef = useRef<number>(0);
  const coordsRef = useRef<HudCoords>({ x: "0.0000", y: "0.0000", z: "0.0000" });
  const [coords, setCoords] = useState<HudCoords>({ x: "0.0000", y: "0.0000", z: "0.0000" });
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    setSize();

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0x222222, 0.6);
    scene.add(ambientLight);

    // Key light (cinematic cold white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    // Rim light (subtle lime rim light from behind)
    const rimLight = new THREE.DirectionalLight(0xc6f806, 1.8);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    // Fill light (soft gray fill light)
    const fillLight = new THREE.PointLight(0x444444, 1.2, 15);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Halo removed per layout request

    // ── Floating Particles ──
    const particleCount = 300;
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);
    const pAlphas = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      pScales[i] = Math.random() * 3 + 0.5;
      pAlphas[i] = Math.random() * 0.8 + 0.2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute("aScale", new THREE.BufferAttribute(pScales, 1));
    particleGeo.setAttribute("aAlpha", new THREE.BufferAttribute(pAlphas, 1));

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x888888) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Head Model ──
    const headUniforms = {
      uTime: { value: 0 },
      uGlitchIntensity: { value: 0.5 },
      uColor: { value: new THREE.Color(CYAN_GLOW) },
      uGlowColor: { value: new THREE.Color(BLUE_GLOW) },
    };

    const headMaterial = new THREE.ShaderMaterial({
      vertexShader: glitchVertexShader,
      fragmentShader: glitchFragmentShader,
      uniforms: headUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    let headMesh: THREE.Mesh | null = null;

    // Try loading the model, fallback to a sphere
    const loader = new GLTFLoader();
    loader.load(
      HEAD_MODEL_URL,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = headMaterial;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            headMesh = mesh;
          }
        });
        gltf.scene.scale.setScalar(0.22);
        gltf.scene.position.set(0, -0.3, 0);
        scene.add(gltf.scene);
        setScanProgress(100);
      },
      (progress) => {
        if (progress.total > 0) {
          setScanProgress(Math.round((progress.loaded / progress.total) * 100));
        }
      },
      () => {
        // Fallback: procedural icosahedron head
        const fallbackGeo = new THREE.IcosahedronGeometry(1.2, 4);
        const fallbackMesh = new THREE.Mesh(fallbackGeo, headMaterial);
        fallbackMesh.position.set(0, 0, 0);
        fallbackMesh.castShadow = true;
        fallbackMesh.receiveShadow = true;
        scene.add(fallbackMesh);
        headMesh = fallbackMesh;
        setScanProgress(100);
      }
    );

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let coordsThrottle = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;

      // Update uniforms
      headUniforms.uTime.value = elapsed;
      particleMat.uniforms.uTime.value = elapsed;

      // Mouse-driven glitch intensity
      if (mouse) {
        const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        headUniforms.uGlitchIntensity.value = THREE.MathUtils.lerp(
          headUniforms.uGlitchIntensity.value,
          0.3 + dist * 0.8,
          0.05
        );
      }

      // Slow head rotation + mouse follow
      if (headMesh) {
        const parent = headMesh.parent || headMesh;
        parent.rotation.y = elapsed * 0.15 + (mouse?.x || 0) * 0.3;
        parent.rotation.x = (mouse?.y || 0) * 0.15;
      }

      // Halo pulse animation removed

      // Throttled coordinate updates (15 fps for DOM)
      coordsThrottle++;
      if (coordsThrottle % 4 === 0) {
        const newCoords = {
          x: ((mouse?.x || 0) * 56.1749).toFixed(4),
          y: ((mouse?.y || 0) * -86.7676).toFixed(4),
          z: (Math.sin(elapsed) * 46.6827).toFixed(4),
        };
        coordsRef.current = newCoords;
        setCoords(newCoords);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [canvasRef, containerRef, mouseRef]);

  return { coords, scanProgress };
}

// ─────────────────────────────────────────────────────────────
// Text reveal animation variants
// ─────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const lineVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const headlineRef = useRef<HTMLDivElement>(null);

  const { coords, scanProgress } = useThreeCanvas(
    canvasRef,
    canvasContainerRef,
    mouseRef
  );

  // Mouse tracking for 3D scene
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  // GSAP headline animation
  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.6,
        }
      );
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden font-mono select-none"
    >
      {/* Background layers */}
      <AnimatedBackground />
      <ScanlineOverlay />

      {/* Main content grid */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-0 gap-10 lg:gap-0">
        {/* ─── LEFT: Typography & Content ─── */}
        <motion.div
          className="flex-1 flex flex-col justify-center space-y-8 lg:pr-12 w-full lg:w-1/2 z-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status tag */}
          <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-zinc-500 uppercase">
              [ STATUS: ACTIVE ]
            </span>
          </motion.div>

          {/* Headline */}
          <div ref={headlineRef}>
            <motion.div variants={containerVariants}>
              {/* DEVELOPER'S (Line 1 - Reduced Sizing) */}
              <div className="overflow-hidden">
                <motion.h1
                  variants={lineVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[0.85] tracking-tight text-white"
                  style={{
                    textShadow: `0 0 40px rgba(255,255,255,0.05)`,
                  }}
                >
                  {"DEVELOPER'S"}
                </motion.h1>
              </div>

              {/* KUTUMB (Line 2 - Bolder Sizing) */}
              <div className="overflow-hidden">
                <motion.h1
                  variants={lineVariants}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] tracking-tight text-transparent"
                  style={{
                    WebkitTextStroke: `2px ${ACCENT}`,
                    textShadow: `0 0 40px rgba(198,248,6,0.15)`,
                  }}
                >
                  KUTUMB
                </motion.h1>
              </div>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed"
          >
            <span className="text-white font-bold">THE FUTURE ISN&apos;T MINIMAL.</span>
            <br />
            <span className="text-white font-bold">IT&apos;S SYSTEMATIC.</span>
            <br />
            <br />
            <span className="text-zinc-500">
              A creative digital agency building bold, functional, and
              unapologetically future&#8209;ready experiences for the machine&nbsp;age.
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <CyberButton primary href="#work">
              <span>EXPLORE WORK</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </CyberButton>
            <CyberButton href="#manifesto">VIEW MANIFESTO</CyberButton>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: 3D Canvas + HUD ─── */}
        <div
          ref={canvasContainerRef}
          className="flex-1 relative w-full lg:w-1/2 h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-screen"
        >
          {/* Three.js canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* HUD data overlay */}
          <HudOverlay coords={coords} scanProgress={scanProgress} />
        </div>
      </div>

      {/* Bottom edge accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c6f806]/20 to-transparent z-30" />
    </section>
  );
}
