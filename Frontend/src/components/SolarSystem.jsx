import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Hedge Fund (Sun) at center - stationary, no rotation
function HedgeFundSun() {
  return (
    <group>
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1fc7d4"
          emissive="#1fc7d4"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Glow effect */}
      <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1fc7d4"
          transparent
          opacity={0.2}
          emissive="#1fc7d4"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color="#1fc7d4"
        anchorX="center"
        anchorY="middle"
      >
        Hedge Fund
      </Text>
    </group>
  );
}

// Agent Planet component - orbits around the stationary sun
function AgentPlanet({ name, initialAngle, radius, orbitSpeed, color, size = 0.4, yPosition = 0 }) {
  const meshRef = useRef();
  const orbitRef = useRef();

  useFrame((state) => {
    if (meshRef.current && orbitRef.current) {
      const time = state.clock.elapsedTime * orbitSpeed;
      const angle = initialAngle + time;
      
      // Orbit around center (0, 0, 0)
      orbitRef.current.position.x = Math.cos(angle) * radius;
      orbitRef.current.position.z = Math.sin(angle) * radius;
      orbitRef.current.position.y = yPosition;
      
      // Planet rotates on its own axis
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <Sphere ref={meshRef} args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Agent name label - always visible */}
      <Text
        position={[0, size + 0.4, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

function SolarSystemScene() {
  const agents = [
    { name: 'Strategy', initialAngle: 0, radius: 4, orbitSpeed: 0.3, color: '#1fc7d4', size: 0.4, yPosition: 0 },
    { name: 'Risk', initialAngle: Math.PI / 2, radius: 5, orbitSpeed: 0.25, color: '#0033ad', size: 0.45, yPosition: 0.5 },
    { name: 'Execution', initialAngle: Math.PI, radius: 5.5, orbitSpeed: 0.35, color: '#7c3aed', size: 0.4, yPosition: 0 },
    { name: 'Portfolio', initialAngle: 3 * Math.PI / 2, radius: 6, orbitSpeed: 0.28, color: '#1fc7d4', size: 0.4, yPosition: 0 },
    { name: 'Reporting', initialAngle: Math.PI / 4, radius: 6.5, orbitSpeed: 0.32, color: '#0033ad', size: 0.35, yPosition: -0.5 },
    { name: 'R&D', initialAngle: 3 * Math.PI / 4, radius: 4.5, orbitSpeed: 0.27, color: '#7c3aed', size: 0.4, yPosition: 0 },
    { name: 'Compliance', initialAngle: 5 * Math.PI / 4, radius: 5.5, orbitSpeed: 0.3, color: '#1fc7d4', size: 0.35, yPosition: 0.3 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 60 }}
      style={{ width: '100%', height: '100vh', background: '#0a0e27' }}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#1fc7d4" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0033ad" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7c3aed" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      
      <HedgeFundSun />
      
      {agents.map((agent, index) => (
        <AgentPlanet
          key={index}
          name={agent.name}
          initialAngle={agent.initialAngle}
          radius={agent.radius}
          orbitSpeed={agent.orbitSpeed}
          color={agent.color}
          size={agent.size}
          yPosition={agent.yPosition}
        />
      ))}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={25}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default SolarSystemScene;

