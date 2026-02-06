import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

export function MobiusTransition() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraPathRef = useRef(0);
  const currentStage = useAppStore((state) => state.currentStage);
  const setStage = useAppStore((state) => state.setStage);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  
  // Create mobius strip geometry
  const mobiusGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];
    
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
        
        vertices.push(x * 3, y * 3, z * 3);
        uvs.push(i / segments, j);
      }
    }
    
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);
  
  useFrame((state, delta) => {
    if (!meshRef.current || currentStage !== 'mobius') return;
    
    // Rotate the mobius strip
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    
    // Camera path progression
    const speed = lowStimulationMode ? 0.15 : 0.25;
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
  
  if (currentStage !== 'mobius') return null;
  
  return (
    <group>
      {/* Dark fog for tunnel effect */}
      <fog attach="fog" args={['#050505', 3, 18]} />
      
      {/* Mobius strip */}
      <mesh ref={meshRef} geometry={mobiusGeometry}>
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
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(
              Array.from({ length: 50 }, (_, i) => {
                const angle = (i / 50) * Math.PI * 2;
                return [
                  Math.cos(angle) * 3,
                  Math.sin(angle) * 3,
                  Math.sin(angle / 2) * 1.5
                ];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#FFEEDD"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#444466" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FFEEDD" distance={10} />
    </group>
  );
}
