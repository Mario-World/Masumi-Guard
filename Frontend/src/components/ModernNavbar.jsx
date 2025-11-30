import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import Logo from './Logo';

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#1fc7d4"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

function FloatingParticles({ count = 20 }) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, [count]);

  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      t: Math.random() * 100,
      factor: 10 + Math.random() * 50,
      speed: 0.01 + Math.random() / 200,
      xFactor: (Math.random() - 0.5) * 10,
      yFactor: (Math.random() - 0.5) * 5,
      zFactor: (Math.random() - 0.5) * 5,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || !mesh.current.geometry) return;
    const positions = mesh.current.geometry.attributes.position;
    particleData.forEach((particle, i) => {
      particle.t += particle.speed / 2;
      const a = Math.cos(particle.t) + Math.sin(particle.t * 1) / 10;
      const b = Math.sin(particle.t) + Math.cos(particle.t * 2) / 10;
      const s = Math.cos(particle.t);
      positions.setXYZ(
        i,
        particle.xFactor + a * particle.factor * 0.05,
        particle.yFactor + b * particle.factor * 0.05,
        particle.zFactor + s * particle.factor * 0.05
      );
    });
    positions.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} color="#1fc7d4" transparent opacity={0.4} />
    </points>
  );
}

function Navbar3DBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#1fc7d4" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#0033ad" />
      <AnimatedSphere />
      <FloatingParticles count={15} />
    </Canvas>
  );
}

function NavLink({ to, pathname, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = pathname === to || (to === '/agents' && pathname === '/');

  const linkStyle = {
    color: isActive ? '#1fc7d4' : (isHovered ? '#1fc7d4' : '#ffffff'),
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: isActive ? '700' : '500',
    padding: '8px 15px',
    margin: '0 10px',
    borderRadius: '4px',
    transition: 'color 0.3s, background-color 0.3s, transform 0.1s',
    backgroundColor: isHovered ? 'rgba(31, 199, 212, 0.1)' : 'transparent',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 10px rgba(31, 199, 212, 0.2)' : 'none',
    cursor: 'pointer',
  };

  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}

function ModernNavbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    height: '70px',
    transition: 'background-color 0.3s, backdrop-filter 0.3s',
    backgroundColor: scrolled ? 'rgba(10, 25, 41, 0.95)' : 'rgba(10, 25, 41, 0.7)',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.5)' : 'none',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    position: 'relative',
    zIndex: 1,
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    cursor: 'pointer',
  };

  const logoTextStyle = {
    marginLeft: '10px',
  };

  const linksStyle = {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center', // Center the links
    alignItems: 'center',
  };

  const backgroundContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  return (
    <nav style={navbarStyle}>
      <div style={backgroundContainerStyle}>
        <Navbar3DBackground />
      </div>
      <div style={contentStyle}>
        <Link to="/agents" style={brandStyle}>
          <Logo size={32} />
          <span style={logoTextStyle}>Super Quant</span>
        </Link>
        <div style={linksStyle}>
          <NavLink to="/agents" pathname={location.pathname}>
            Platform
          </NavLink>
          <NavLink to="/risk-management" pathname={location.pathname}>
            Risk Management Agent
          </NavLink>
          <NavLink to="/hedge-fund" pathname={location.pathname}>
            Hedge Fund Agent
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default ModernNavbar;
