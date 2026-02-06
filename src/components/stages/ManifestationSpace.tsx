import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, OrbitControls, Html } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import { ManifestationModuleComponent } from '../ManifestationModule';
import * as THREE from '../../lib/three';

interface Module {
  id: string;
  title: string;
  color: string;
  position: [number, number, number];
}

export function ManifestationSpace() {
  const groupRef = useRef<THREE.Group>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const manifestationModules = useAppStore((state) => state.manifestationModules);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(null);
  
  // Calculate positions for modules in a circle
  const modulePositions = useMemo(() => {
    const count = manifestationModules.length || 1;
    return manifestationModules.map((_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = 5;
      return [
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ] as [number, number, number];
    });
  }, [manifestationModules]);
  
  useFrame((state) => {
    if (!groupRef.current || currentStage !== 'manifestation') return;
    
    // Very gentle rotation of the entire space
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.02;
  });
  
  if (currentStage !== 'manifestation') return null;
  
  return (
    <group ref={groupRef}>
      {/* Subtle fog */}
      <fog attach="fog" args={['#050505', 10, 35]} />
      
      {/* Lighting */}
      <hemisphereLight args={['#ffffff', '#444466', 0.7]} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.8}
        color="#fff3e0"
        castShadow
      />
      
      {/* Central nexus */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#FFEEDD"
            emissive="#FFEEDD"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <pointLight color="#FFEEDD" intensity={1.5} distance={15} />
      </group>
      
      {/* AI-generated manifestation modules */}
      {manifestationModules.length > 0 ? (
        manifestationModules.map((module, index) => (
          <ManifestationModuleComponent
            key={index}
            module={module}
            position={modulePositions[index]}
            moduleIndex={index}
          />
        ))
      ) : (
        // Placeholder text when no modules exist
        <group>
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            color="#FFEEDD"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            尚未生成显化模块
          </Text>
          <Text
            position={[0, 1.3, 0]}
            fontSize={0.25}
            color="#FFEEDD"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            opacity={0.6}
          >
            请在"愿景环廊"阶段上传图片
          </Text>
        </group>
      )}
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Orbit controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
      />
    </group>
  );
}