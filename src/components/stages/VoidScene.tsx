import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

export function VoidScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const setStage = useAppStore((state) => state.setStage);
  
  const particleCount = lowStimulationMode ? 150 : 300;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, [particleCount]);
  
  useFrame((state) => {
    if (!pointsRef.current || currentStage !== 'void') return;
    
    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    // Gentle rotation
    pointsRef.current.rotation.z = time * 0.02;
    pointsRef.current.rotation.y = Math.sin(time * 0.15) * 0.05;
    
    // Particle drift
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Boundary wrapping
      if (Math.abs(positions[i * 3]) > 12) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 8) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 20) velocities[i * 3 + 2] *= -1;
    }
    
    geometry.attributes.position.needsUpdate = true;
    
    // Mouse interaction - particles avoid pointer
    const pointer = state.pointer;
    for (let i = 0; i < particleCount; i++) {
      const dx = positions[i * 3] - pointer.x * 10;
      const dy = positions[i * 3 + 1] - pointer.y * 8;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) {
        const force = (3 - distance) * 0.01;
        positions[i * 3] += (dx / distance) * force;
        positions[i * 3 + 1] += (dy / distance) * force;
      }
    }
  });
  
  useEffect(() => {
    // Auto-transition after 8 seconds
    const timer = setTimeout(() => {
      if (currentStage === 'void') {
        setStage('vision');
      }
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentStage, setStage]);
  
  if (currentStage !== 'void') return null;
  
  return (
    <group>
      {/* Fog effect */}
      <fog attach="fog" args={['#050505', 5, 25]} />
      
      {/* Particle system */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FFEEDD"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Ambient hemisphere light */}
      <hemisphereLight args={['#ffffff', '#444444', 0.3]} />
      
      {/* Central hint sphere - fades in after 3 seconds */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#FFEEDD"
          emissive="#FFEEDD"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
