import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from '../../lib/three';
import { useAppStore } from '../../store/useAppStore';

export function AudioVisualizer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const audioEnabled = useAppStore((state) => state.audioEnabled);
  
  // Create a liquid metal-like geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1, 4);
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current || currentStage !== 'manifestation' || !audioEnabled) return;
    
    const time = state.clock.getElapsedTime();
    
    // Simulate audio reactivity with sine waves
    const frequency1 = Math.sin(time * 2) * 0.5 + 0.5;
    const frequency2 = Math.sin(time * 3) * 0.5 + 0.5;
    const frequency3 = Math.sin(time * 1.5) * 0.5 + 0.5;
    
    // Update vertex positions for liquid effect
    const positionAttribute = meshRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      const distance = Math.sqrt(x * x + y * y + z * z);
      const wave = Math.sin(distance * 3 + time * 2) * 0.1;
      const pulse = frequency1 * 0.15 + frequency2 * 0.1;
      
      positions[i] = x * (1 + wave + pulse);
      positions[i + 1] = y * (1 + wave + pulse);
      positions[i + 2] = z * (1 + wave + pulse);
    }
    
    positionAttribute.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    
    // Rotate slowly
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    
    // Pulse emissive intensity
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.5 + frequency3 * 0.5;
  });
  
  if (currentStage !== 'manifestation' || !audioEnabled) return null;
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 2, -3]}>
      <meshStandardMaterial
        color="#6a9fb5"
        metalness={0.9}
        roughness={0.1}
        emissive="#6a9fb5"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}