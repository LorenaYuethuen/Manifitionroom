import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';

export function AudioVisualizer() {
  const meshRef = useRef<any>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const audioEnabled = useAppStore((state) => state.audioEnabled);
  
  // Mock audio data (in production, connect to actual audio source)
  const audioDataRef = useRef<number[]>(new Array(32).fill(0));
  
  useFrame((state) => {
    if (!meshRef.current || currentStage !== 'manifestation' || !audioEnabled) return;
    
    const time = state.clock.getElapsedTime();
    
    // Mock audio reactivity
    const bassIntensity = Math.abs(Math.sin(time * 2)) * 0.3;
    const midIntensity = Math.abs(Math.sin(time * 3 + 1)) * 0.2;
    const trebleIntensity = Math.abs(Math.sin(time * 4 + 2)) * 0.1;
    
    // Scale based on audio
    const scale = 1 + bassIntensity + midIntensity;
    meshRef.current.scale.setScalar(scale);
    
    // Rotate
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
    
    // Update material emissive intensity
    if (meshRef.current.material) {
      meshRef.current.material.emissiveIntensity = 0.5 + bassIntensity * 2;
    }
  });
  
  if (currentStage !== 'manifestation' || !audioEnabled) return null;
  
  return (
    <Icosahedron ref={meshRef} args={[1, 4]} position={[0, 2, -3]}>
      <meshStandardMaterial
        color="#6a9fb5"
        emissive="#6a9fb5"
        emissiveIntensity={0.5}
        wireframe={false}
        roughness={0.3}
        metalness={0.7}
      />
    </Icosahedron>
  );
}