import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';
import { Points, PointMaterial } from '@react-three/drei';
import { BufferGeometry, BufferAttribute } from 'three';
import * as THREE from 'three';

export function MobiusTransition() {
  const meshRef = useRef<any>(null);
  const cameraPathRef = useRef(0);
  const currentStage = useAppStore((state) => state.currentStage);
  const setStage = useAppStore((state) => state.setStage);
  
  // Create mobius strip geometry
  const { geometry, particlePositions } = useMemo(() => {
    const verts: number[] = [];
    const inds: number[] = [];
    const uvCoords: number[] = [];
    
    const segments = 80;
    const width = 2;
    
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      
      for (let j = 0; j <= 1; j++) {
        const v = (j - 0.5) * width;
        
        // Mobius strip parametric equations
        const x = (1 + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (1 + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);
        
        verts.push(x * 3, y * 3, z * 3);
        uvCoords.push(i / segments, j);
      }
    }
    
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      
      inds.push(a, b, c);
      inds.push(b, d, c);
    }
    
    // Create geometry
    const geom = new BufferGeometry();
    geom.setAttribute('position', new BufferAttribute(new Float32Array(verts), 3));
    geom.setAttribute('uv', new BufferAttribute(new Float32Array(uvCoords), 2));
    geom.setIndex(inds);
    geom.computeVertexNormals();
    
    // Particle trail positions
    const particlePos = new Float32Array(
      Array.from({ length: 50 }, (_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        return [
          Math.cos(angle) * 3,
          Math.sin(angle) * 3,
          Math.sin(angle / 2) * 1.5
        ];
      }).flat()
    );
    
    return { 
      geometry: geom,
      particlePositions: particlePos
    };
  }, []);
  
  useFrame((state, delta) => {
    if (!meshRef.current || currentStage !== 'mobius') return;
    
    // Rotate the mobius strip
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    
    // Camera path progression
    const speed = 0.25;
    cameraPathRef.current += delta * speed;
    
    // Move camera along the path
    const t = cameraPathRef.current;
    const radius = 8;
    state.camera.position.x = Math.cos(t) * radius;
    state.camera.position.z = Math.sin(t) * radius;
    state.camera.position.y = Math.sin(t * 2) * 2;
    
    // Look at center
    state.camera.lookAt(0, 0, 0);
    
    // Transition to next stage after one complete rotation
    if (cameraPathRef.current > Math.PI * 2) {
      cameraPathRef.current = 0;
      setStage('manifestation');
    }
  });
  
  useEffect(() => {
    if (currentStage === 'mobius') {
      cameraPathRef.current = 0;
    }
  }, [currentStage]);
  
  const isActive = currentStage === 'mobius';
  
  if (!isActive) return null;
  
  return (
    <group>
      {/* Additional lighting for mobius effect */}
      <pointLight position={[0, 0, 0]} intensity={0.8} distance={10} decay={2} />
      
      {/* Mobius strip mesh */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.6}
          metalness={0.3}
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
          emissive="#444466"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Particle trail following the strip */}
      <Points positions={particlePositions} stride={3}>
        <PointMaterial
          size={0.1}
          color="#FFEEDD"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </Points>
    </group>
  );
}