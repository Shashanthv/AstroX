"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
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
      <h1 className="font-sora text-4xl xs:text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold leading-tight mb-10 tracking-tight text-[var(--text-primary)] drop-shadow-2xl">
        Pushing Beyond the Stars
      </h1>
      <p className="font-sora text-lg xs:text-xl sm:text-3xl md:text-4xl xl:text-5xl text-[var(--text-secondary)] mb-6 max-w-4xl mx-auto md:mx-0">
        Elevate your brand with Asto X — an award-winning digital marketing agency specializing in creative design, branding, web development, SEO, social media, and technology solutions for the next generation.
      </p>
      <p className="font-sora text-base sm:text-lg text-[var(--text-muted)] mb-6 max-w-3xl mx-auto md:mx-0">
        Grow your business with expert digital marketing, innovative branding, high-converting websites, and data-driven strategies tailored for your success.
      </p>
      <p className="font-sora text-sm sm:text-base text-[var(--text-muted)] mb-10 max-w-4xl mx-auto md:mx-0">
        From search engine optimization and content marketing to conversion rate optimization and analytics, we deliver measurable results that drive organic traffic, increase brand visibility, and boost your online presence across all digital channels.
      </p>
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
  const [modelVisible, setModelVisible] = useState(true);
  const webglSupported = useWebGLSupport();

  if (!webglSupported) {
    return (
      <div className="flex-1 flex items-center justify-center w-full min-h-[400px] text-center text-red-400 bg-black/30 rounded-2xl shadow-lg">
        WebGL is not supported or available. 3D content cannot be displayed on this device/browser.
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center w-full sm:min-h-[60vw] sm:h-[60vw] md:min-h-[80vh] md:h-[80vh] bg-transparent relative" style={{ width: '400px', height: '950px', maxWidth: '100%' }}>
      {/* Layered blurred background glow for soft spread (reshaped) */}
      <div className="absolute inset-0 z-0 opacity-25 bg-gradient-to-br from-[#7b5cff] via-[#00eaff] to-[#7b5cff]" style={{ width: '95%', height: '70%', left: '2.5%', top: '15%', borderRadius: '60% 60% 0 0', filter: 'blur(160px)' }} />
      <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-br from-[#7b5cff] via-[#00eaff] to-[#7b5cff]" style={{ width: '90%', height: '72%', left: '5%', top: '14%', borderRadius: '60% 60% 0 0', filter: 'blur(120px)' }} />
      <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-br from-[#7b5cff] via-[#00eaff] to-[#7b5cff]" style={{ width: '85%', height: '75%', left: '7.5%', top: '12%', borderRadius: '60% 60% 0 0', filter: 'blur(48px)' }} />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <Canvas camera={{ position: [0, 1, 2], fov: 50 }} dpr={[1, 1.5]} style={{ width: '100%', height: '750px', maxWidth: '100%', background: 'transparent', display: 'block', boxShadow: 'none', borderRadius: 0, overflow: 'visible', transform: 'translateY(10px)' }}>
          <Suspense fallback={null}>
                         {/* HDR-style lighting for enhanced glassy shine */}
             <pointLight position={[-1, 2, 2]} intensity={3} color="#00eaff" distance={8} decay={1.5} />
             <pointLight position={[1, 2, 2]} intensity={3} color="#ff00cc" distance={8} decay={1.5} />
             <pointLight position={[0, 3, 1]} intensity={2.5} color="#ffffff" distance={6} decay={2} />
             <pointLight position={[0, -1, 2]} intensity={1.5} color="#7b5cff" distance={5} decay={2.5} />
             <directionalLight position={[0, 2, -3]} intensity={1.2} color="#7b5cff" />
             <directionalLight position={[2, 1, 1]} intensity={0.8} color="#ffffff" />
             <ambientLight intensity={0.08} />
             <Environment preset="sunset" />
                       <ModelMemo
             onLoaded={() => { 
               if (onLoaded) onLoaded?.(); 
               // Dispatch event to notify splash screen that model is ready
               window.dispatchEvent(new Event('model-ready'));
             }}
             visible={modelVisible}
           />
            <OrbitControls 
             enablePan={false} 
             enableZoom={true} 
             enableRotate={false}
             enableDamping={false}
             minPolarAngle={Math.PI / 2} 
             maxPolarAngle={Math.PI / 2} 
             minDistance={1} 
             maxDistance={1}
             touches={{
               ONE: 0, // Disable one-finger touch (rotation)
               TWO: 0  // Disable two-finger touch (zoom)
             }}
           />
          </Suspense>
        </Canvas>



        {/* Hologram light beam */}
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

        {/* Thin glowing white line - 84px below glow bottom edge */}
        <div style={{ width: '80%', height: '2px', background: 'white', borderRadius: '9999px', boxShadow: '0 0 24px 8px rgba(255,255,255,0.6)', position: 'absolute', left: '10%', top: 'calc(10% + 80% + 84px)', zIndex: 3 }} />
      </div>
    </div>
  );
}

// Replacing FBX with GLB:
const ModelMemo = React.memo(function Model({ onLoaded, visible }: ModelProps & { visible?: boolean }) {
  const { scene } = useGLTF("https://websitemodel.s3.eu-north-1.amazonaws.com/model1.glb");
  const ref = useRef<Object3D>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child: unknown) => {
        if (child instanceof Mesh) {
                     const mat = new MeshStandardMaterial({
             color: 0x111111,
             roughness: 0.02,
             metalness: 0.95,
             envMapIntensity: 3.5,
           });
          (child as any).material = mat;
          (child as any).castShadow = true;
          (child as any).receiveShadow = true;
        }
      });
      
      // Set model scale to 0.9 (medium size) immediately
      if (ref.current) {
        ref.current.scale.set(0.9, 0.9, 0.9);
      }
      
      if (onLoaded) onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      if (ref.current) {
        ref.current.position.y = -1.3 + Math.sin(t * 1.2) * 0.08;
        ref.current.rotation.y += 0.005;
      }
    }
  });

  return <primitive ref={ref} object={scene} position={[0, -1.3, 0]} />;
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

// Preload for performance
useGLTF.preload("https://websitemodel.s3.eu-north-1.amazonaws.com/model1.glb");
