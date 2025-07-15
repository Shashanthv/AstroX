import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, useAnimations } from '@react-three/drei';
import { Suspense, useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const meshTextureMap = {

  'sun_sun1_0': '/textures/2k_sun.jpg', // Sun (handled separately)
};

function Model() {
  const gltf = useGLTF('/model2.glb');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);
  const textures = useLoader(THREE.TextureLoader, Object.values(meshTextureMap));
  const ref = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Play all animations at 0.1x speed
    names.forEach(name => {
      if (actions[name]) {
        actions[name].timeScale = 0.04;
        actions[name].play();
      }
    });
  }, [actions, names]);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        // Hide all THREE.Line or THREE.LineSegments objects
        if ((child as THREE.Line).isLine || (child as THREE.LineSegments).isLineSegments) {
          child.visible = false;
        }
        // Hide meshes with 'orbit' in their name (case-insensitive)
        if ((child as THREE.Mesh).isMesh && child.name && child.name.toLowerCase().includes('orbit')) {
          child.visible = false;
        }
        // Sun: texture + warm orange emissive for realistic glow, no reflections
        if ((child as THREE.Mesh).isMesh) {
          if (child.name === 'sun_sun1_0') {
            const idx = Object.keys(meshTextureMap).indexOf('sun_sun1_0');
            (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
              map: textures[idx],
              emissive: new THREE.Color(0xffa500),
              emissiveIntensity: 4,
              metalness: 0,
              roughness: 1,
              envMap: null,
              reflectivity: 0,
            });
          } else if (child.name in meshTextureMap) {
            const idx = Object.keys(meshTextureMap).indexOf(child.name);
            if (textures[idx]) {
              (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
                map: textures[idx],
                emissive: new THREE.Color(0x222244),
                emissiveIntensity: 0.25,
                metalness: 0.4,
                roughness: 0.3,
              });
            }
          }
        }
      });
    }
  }, [gltf, textures]);

  useFrame(() => {
    if (ref.current && 'rotation' in ref.current) {
      (ref.current as THREE.Object3D).rotation.y += 0;
    }
  });
  return <primitive ref={ref} object={gltf.scene} scale={1.5} />;
}

function Dust({ count = 12000, radius = 400 }) {
  // Memoize dust positions
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Spherical shell, more spread out
      const r = radius * (0.8 + 0.2 * Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(arr);
  }, [count, radius]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.1} sizeAttenuation color="#b6c3ff" opacity={0.18} transparent />
    </points>
  );
}

function SpaceClouds() {
  // Placeholder nebula textures
  const textures = useLoader(THREE.TextureLoader, [
    '/nebula1.png',
    '/nebula2.png',
  ]);
  // Array of cloud configs: [textureIndex, position, scale, rotation]
  const clouds: [number, [number, number, number], [number, number, number], number][] = [
    // Far left
    [0, [-400, 0, -400], [320, 120, 1], 0.2],
    // Far right
    [1, [400, 0, -420], [320, 120, 1], -0.3],
    // Far top
    [0, [0, 300, -480], [320, 120, 1], 0.1],
    // Far bottom
    [1, [0, -300, -450], [320, 120, 1], 0.5],
  ];
  return (
    <group>
      {clouds.map(([texIdx, position, scale, rot], i) => (
        <mesh key={i} position={position} rotation={[0, 0, rot]} scale={scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[texIdx]}
            transparent
            opacity={0.06}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function ColorManagement() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    if ('encoding' in gl) {
      gl.encoding = (THREE as any).sRGBEncoding || (THREE as any).LinearEncoding;
    }
  }, [gl]);
  return null;
}

export default function SolarSystemCanvas() {
  // Sun position (assuming [0,0,0], change if needed)
  const sunPosition: [number, number, number] = [0, 0, 0];
  return (
    <Canvas
      camera={{ position: [50, 30, 50], fov: 15 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ColorManagement />
      {/* Space clouds (nebula planes) behind everything */}
      <Suspense fallback={null}>
        <SpaceClouds />
      </Suspense>
      {/* Dust behind everything */}
      <Dust />
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} />
      {/* PointLight at the Sun's position for realistic lighting */}
      <pointLight position={sunPosition} intensity={20} distance={20} color="#fffbe6" />
      <Suspense fallback={<Html center><div style={{color:'#fff'}}>Loading 3D Model...</div></Html>}>
        <Model />
      </Suspense>
      {/* Bloom effect for glow and highlight */}
      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.0} luminanceSmoothing={0.1} radius={0.18} />
      </EffectComposer>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

// Required for GLTF loading
// @ts-ignore
useGLTF.preload && useGLTF.preload('/model2.glb'); 