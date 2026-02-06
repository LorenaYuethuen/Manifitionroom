import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { useAppStore, VisionCard as VisionCardType } from '../store/useAppStore';
import * as THREE from 'three';

interface VisionCardProps {
  card: VisionCardType;
}

export function VisionCard({ card }: VisionCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const selectedCardId = useAppStore((state) => state.selectedCardId);
  const setSelectedCardId = useAppStore((state) => state.setSelectedCardId);
  const updateVisionCard = useAppStore((state) => state.updateVisionCard);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  
  const isSelected = selectedCardId === card.id;
  const targetScale = isDragging ? 1.1 : (hovered || isSelected) ? 1.05 : 1;
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smooth scale animation using Vector3
    const dampSpeed = lowStimulationMode ? 0.15 : 0.08;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * dampSpeed;
    meshRef.current.scale.setScalar(newScale);
    
    // Gentle floating animation
    if (!isDragging && !isSelected) {
      const time = state.clock.getElapsedTime();
      const floatOffset = Math.sin(time + card.position[0]) * 0.05;
      meshRef.current.position.y = card.position[1] + floatOffset;
    }
  });
  
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    setSelectedCardId(card.id);
  };
  
  const handlePointerUp = () => {
    setIsDragging(false);
  };
  
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && meshRef.current) {
      e.stopPropagation();
      // Simple drag - update position
      const newPosition: [number, number, number] = [
        e.point.x,
        e.point.y,
        card.position[2]
      ];
      updateVisionCard(card.id, { position: newPosition });
    }
  };
  
  return (
    <group position={card.position} rotation={card.rotation}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 2, 0.05]}
        radius={0.05}
        smoothness={4}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={isSelected ? "#2a2a3a" : "#1a1a1a"}
          roughness={0.7}
          transparent
          opacity={0.85}
          emissive={isSelected ? "#444466" : "#000000"}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      
      {/* Content based on type */}
      {card.type === 'text' && (
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.15}
          color="#CCCCCC"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {card.content}
        </Text>
      )}
      
      {card.type === 'image' && (
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.2, 1.6]} />
          <meshBasicMaterial
            color="#666666"
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* Glow effect when selected */}
      {isSelected && (
        <pointLight
          position={[0, 0, 0.5]}
          color="#FFEEDD"
          intensity={0.5}
          distance={2}
        />
      )}
      
      {/* Tags display */}
      {card.tags.length > 0 && (
        <Text
          position={[0, -0.85, 0.03]}
          fontSize={0.08}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {card.tags.join(' · ')}
        </Text>
      )}
    </group>
  );
}