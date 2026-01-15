
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, MeshReflectorMaterial, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const AbstractCar = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Body */}
      <Box args={[4, 0.8, 1.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#002C5F" metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[2, 0.6, 1.6]} position={[-0.2, 1.1, 0]}>
        <meshStandardMaterial color="#002C5F" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Windows */}
      <Box args={[1.5, 0.4, 1.62]} position={[-0.1, 1.15, 0]}>
        <meshStandardMaterial color="#111" transparent opacity={0.7} />
      </Box>

      {/* Wheels */}
      {[[-1.2, 0.3, 0.9], [1.2, 0.3, 0.9], [-1.2, 0.3, -0.9], [1.2, 0.3, -0.9]].map((pos, i) => (
        <Cylinder key={i} args={[0.35, 0.35, 0.3, 32]} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#222" metalness={0.5} />
        </Cylinder>
      ))}

      {/* Headlights */}
      <Box args={[0.1, 0.2, 0.4]} position={[2, 0.6, 0.6]}>
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </Box>
      <Box args={[0.1, 0.2, 0.4]} position={[2, 0.6, -0.6]}>
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </Box>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={35} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#00AAD2" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <AbstractCar />
        </Float>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
          />
        </mesh>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
