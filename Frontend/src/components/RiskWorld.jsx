import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Risk assessment modules as floating cubes
function RiskModule({ name, position, color, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[1, 1, 1]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Box>
      {/* Glow effect */}
      <Box args={[1.2, 1.2, 1.2]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Box>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

// Central risk manager core
function RiskManagerCore() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1fc7d4"
          emissive="#1fc7d4"
          emissiveIntensity={1}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1fc7d4"
          transparent
          opacity={0.2}
          emissive="#1fc7d4"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#1fc7d4"
        anchorX="center"
        anchorY="middle"
      >
        Risk Manager
      </Text>
    </group>
  );
}

function RiskWorldScene() {
  const riskModules = [
    { name: 'Trading Risk', position: [4, 2, 0], color: '#1fc7d4', rotationSpeed: 0.5 },
    { name: 'Lending Risk', position: [-4, 2, 0], color: '#0033ad', rotationSpeed: 0.4 },
    { name: 'Protocol Security', position: [0, 2, 4], color: '#7c3aed', rotationSpeed: 0.6 },
    { name: 'Liquidity', position: [0, 2, -4], color: '#1fc7d4', rotationSpeed: 0.45 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 6, 10], fov: 60 }}
      style={{ width: '100%', height: '100vh', background: '#0a0e27' }}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#1fc7d4" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#0033ad" />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#7c3aed" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      
      <RiskManagerCore />
      
      {riskModules.map((module, index) => (
        <RiskModule
          key={index}
          name={module.name}
          position={module.position}
          color={module.color}
          rotationSpeed={module.rotationSpeed}
        />
      ))}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={20}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default RiskWorldScene;

