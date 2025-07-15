"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import type { Object3D } from "three";
import { MeshStandardMaterial, Mesh } from "three";

function HeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 z-10 text-center md:text-left flex flex-col justify-center"
    >
      <h1 className="font-sora text-4xl xs:text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold leading-tight mb-10 tracking-tight text-white drop-shadow-2xl">
        <span className="block">Pushing</span>
        <span className="block">Beyond the&nbsp;Stars</span>
      </h1>
      <p className="font-sora text-lg xs:text-xl sm:text-3xl md:text-4xl xl:text-5xl text-[#e0e7ff] mb-6 max-w-3xl mx-auto md:mx-0">
        Elevate your brand with Asto X — an award-winning digital marketing agency specializing in creative design, branding, web development, SEO, social media, and technology solutions for the next generation.
      </p>
      <p className="font-sora text-base sm:text-lg text-[#b6c3ff] mb-10 max-w-2xl mx-auto md:mx-0">
        Grow your business with expert digital marketing, innovative branding, high-converting websites, and data-driven strategies tailored for your success.
      </p>
      <div className="flex flex-col sm:flex-row gap-8 mb-14 justify-center md:justify-start">
        <button className="font-sora px-10 py-4 rounded-full bg-gradient-to-r from-[#7b5cff] via-[#00eaff] to-[#7b5cff] text-white font-bold shadow-2xl border-2 border-white/20 transition-all text-lg sm:text-2xl md:text-3xl animate-gradient-move relative overflow-hidden group hover:scale-105 hover:shadow-[0_8px_48px_0_rgba(123,92,255,0.55)] focus:outline-none">
          <span className="relative z-10">Discover</span>
          <span className="absolute inset-0 z-0 bg-white/30 opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-sm" />
        </button>
        <button className="font-sora px-10 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 shadow-lg transition-all text-lg sm:text-2xl md:text-3xl backdrop-blur-md relative overflow-hidden group hover:scale-105 focus:outline-none">
          <span className="relative z-10">Create</span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#7b5cff]/30 to-[#00eaff]/30 opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-sm" />
        </button>
      </div>
    </motion.div>
  );
}

// Add type for onLoaded prop
interface ModelProps {
  onLoaded?: () => void;
}

// WebGL support check component
function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function Model3D({ onLoaded }: ModelProps) {
  const [loading, setLoading] = useState(true);
  const [modelVisible, setModelVisible] = useState(false);
  const webglSupported = useWebGLSupport();
  // Animated SVG Loader
  const Spinner = (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <svg className="animate-spin-slow" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="#7b5cff" strokeWidth="6" strokeDasharray="44 44" strokeLinecap="round" opacity="0.5" />
        <circle cx="32" cy="32" r="20" stroke="#00eaff" strokeWidth="4" strokeDasharray="32 32" strokeLinecap="round" opacity="0.7" />
        <circle cx="32" cy="32" r="12" stroke="#fff" strokeWidth="2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.9" />
      </svg>
    </div>
  );
  // Animate model entrance
  useEffect(() => {
    if (!loading) {
      setTimeout(() => setModelVisible(true), 100); // slight delay for effect
    }
  }, [loading]);
  if (!webglSupported) {
    return (
      <div className="flex-1 flex items-center justify-center w-full min-h-[400px] text-center text-red-400 bg-black/30 rounded-2xl shadow-lg">
        WebGL is not supported or available. 3D content cannot be displayed on this device/browser.
      </div>
    );
  }
  return (
    <div className="flex-1 flex items-center justify-center w-full sm:min-h-[60vw] sm:h-[60vw] md:min-h-[80vh] md:h-[80vh] bg-transparent relative" style={{ width: '400px', height: '950px', maxWidth: '100%' }}>
      <div className="absolute inset-0 z-0 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-[#7b5cff] via-[#00eaff] to-[#7b5cff] animate-pulse-slow" />
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
        {loading && Spinner}
        <Canvas camera={{ position: [0, 1, 2], fov: 50 }} dpr={[1, 1.5]} style={{ width: '100%', height: '650px', maxWidth: '100%', background: 'transparent', display: 'block', boxShadow: 'none', borderRadius: 0 }}>
          <Suspense fallback={null}>
            <pointLight position={[-1, 2, 2]} intensity={2} color="#00eaff" distance={5} decay={2} />
            <pointLight position={[1, 2, 2]} intensity={2} color="#ff00cc" distance={5} decay={2} />
            <directionalLight position={[0, 2, -3]} intensity={1} color="#7b5cff" />
            <ambientLight intensity={0.15} />
            <Environment preset="city" />
            <ModelMemo 
              onLoaded={() => { setLoading(false); if (onLoaded) onLoaded?.(); }} 
              visible={modelVisible} 
            />
            <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={1} />
          </Suspense>
        </Canvas>
        {/* Neon glow under the model */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: '60%',
          height: '40px',
          background: 'radial-gradient(circle, #00eaff 0%, #7b5cff 60%, transparent 100%)',
          filter: 'blur(18px)',
          opacity: 0.7,
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        {/* Hologram light beam effect from bottom to up */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: '70%',
          height: '90px',
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.29) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.01) 80%, rgba(255,255,255,0) 100%)',
          filter: 'blur(18px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2
        }} />
        {/* Thin glowing white line at the base of the Canvas */}
        <div style={{width: '100%', height: '2px', background: 'white', borderRadius: '9999px', boxShadow: '0 0 24px 8px rgba(255,255,255,0.6)', marginTop: '-2px', position: 'relative', zIndex: 3}} />
      </div>
    </div>
  );
}

// Upgrade ModelMemo to support entrance and floating animation
const ModelMemo = React.memo(function Model({ onLoaded, visible }: ModelProps & { visible?: boolean }) {
  const fbx = useFBX("/model.fbx");
  const ref = useRef<Object3D>(null);
  // Floating animation state
  const [entrance, setEntrance] = useState(0.7);
  useEffect(() => {
    if (fbx) {
      fbx.traverse((child: unknown) => {
        if (child instanceof Mesh) {
          const mat = new MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.05,
            metalness: 1,
            envMapIntensity: 2,
          });
          (mat as unknown as { clearcoat: number; clearcoatRoughness: number }).clearcoat = 1;
          (mat as unknown as { clearcoatRoughness: number }).clearcoatRoughness = 0.05;
          child.material = mat;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      if (onLoaded) onLoaded();
    }
  }, [fbx, onLoaded]);
  useFrame((state) => {
    if (ref.current) {
      // Animate entrance scale
      if (visible && entrance < 1) {
        setEntrance((prev) => Math.min(1, prev + 0.04));
      }
      ref.current.scale.set(entrance * 0.01, entrance * 0.01, entrance * 0.01);
      // Floating effect
      const t = state.clock.getElapsedTime();
      ref.current.position.y = -1.3 + Math.sin(t * 1.2) * 0.08;
      ref.current.rotation.y += 0.005;
    }
  });
  return <primitive ref={ref} object={fbx} position={[0, -1.3, 0]} />;
});

export default function HeroSection() {
  useEffect(() => {
    document.getElementById('hero-section')?.classList.add('animate-fade-in');
  }, []);
  return (
    <section id="hero-section" className="relative flex flex-col md:flex-row items-center justify-center gap-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-8 xl:px-16 py-8 md:py-16">
      <HeroText />
      <Model3D />
    </section>
  );
} 