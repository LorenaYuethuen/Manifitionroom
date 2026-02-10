import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { useAppStore } from '../store/useAppStore';
import type { ManifestationModule } from '../lib/manifestationGenerator';
import * as THREE from 'three';

interface Props {
  module: ManifestationModule;
  index: number;
}

export function ModuleCard({ module, index }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const selectedCardId = useAppStore((state) => state.selectedCardId);
  const setSelectedCardId = useAppStore((state) => state.setSelectedCardId);
  
  const isSelected = selectedCardId === index.toString();
  
  // Calculate position in a circular layout
  const total = 10; // Assuming max 10 modules
  const radius = 6;
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = 0;
  
  const color = module.dimension?.color || '#6a9fb5';
  
  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation
    const floatY = Math.sin(time * 0.5 + index) * 0.1;
    groupRef.current.position.y = y + floatY;
    
    // Smooth scale transition
    const targetScale = isSelected ? 1.3 : (hovered ? 1.1 : 1);
    const currentScale = cardRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.08;
    cardRef.current.scale.setScalar(newScale);
    
    // Rotate to face center
    groupRef.current.lookAt(0, y + floatY, 0);
  });
  
  const handleClick = () => {
    setSelectedCardId(isSelected ? null : index.toString());
  };
  
  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Main card */}
      <RoundedBox
        ref={cardRef}
        args={[1.5, 2, 0.1]}
        radius={0.05}
        smoothness={4}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.5}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={isSelected ? 0.5 : (hovered ? 0.3 : 0.1)}
        />
      </RoundedBox>
      
      {/* Icon */}
      <Text
        position={[0, 0.6, 0.06]}
        fontSize={0.4}
        color="#FFEEDD"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#050505"
      >
        {module.dimension?.icon || '◆'}
      </Text>
      
      {/* Name */}
      <Text
        position={[0, 0.1, 0.06]}
        fontSize={0.18}
        color="#FFEEDD"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
        outlineWidth={0.01}
        outlineColor="#050505"
      >
        {module.dimension?.name || 'Module'}
      </Text>
      
      {/* Vision snippet */}
      {!isSelected && (
        <Text
          position={[0, -0.4, 0.06]}
          fontSize={0.12}
          color="#FFEEDD"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          textAlign="center"
          outlineWidth={0.005}
          outlineColor="#050505"
          lineHeight={1.2}
          opacity={0.7}
        >
          {module.vision?.substring(0, 40) + '...' || ''}
        </Text>
      )}
      
      {/* Point light */}
      <pointLight 
        position={[0, 0, 0.5]} 
        intensity={isSelected ? 2 : (hovered ? 1 : 0.5)} 
        distance={3} 
        color={color}
        decay={2}
      />
      
      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <torusGeometry args={[1, 0.02, 16, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}