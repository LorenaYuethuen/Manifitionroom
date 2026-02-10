import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

export function VoidScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  
  const isActive = currentStage === 'void';
  const particleCount = lowStimulationMode ? 1000 : 3000;
  
  // Generate particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Sphere distribution for awakening effect
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return pos;
  }, [particleCount]);
  
  useFrame((state) => {
    if (!pointsRef.current || !isActive) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Gentle inward spiral animation
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      const distance = Math.sqrt(x * x + y * y + z * z);
      const speed = 1 - (distance / 20);
      
      // Spiral inward
      positions[i3] *= 1 - (speed * 0.008);
      positions[i3 + 1] *= 1 - (speed * 0.008);
      positions[i3 + 2] *= 1 - (speed * 0.008);
      
      // Add rotation
      const angle = speed * time * 0.5;
      const newX = positions[i3] * Math.cos(angle) - positions[i3 + 2] * Math.sin(angle);
      const newZ = positions[i3] * Math.sin(angle) + positions[i3 + 2] * Math.cos(angle);
      
      positions[i3] = newX;
      positions[i3 + 2] = newZ;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  if (!isActive) return null;
  
  return (
    <group>
      {/* Particle system using drei Points */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          size={0.05}
          color="#FFEEDD"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}