import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { useAppStore, VisionCard as VisionCardType } from '../store/useAppStore';
import * as THREE from '../lib/three';

interface VisionCardProps {
  card: VisionCardType;
}

// 添加ThreeEvent类型
type ThreeEvent<T> = T & {
  stopPropagation: () => void;
  point: THREE.Vector3;
};

export function VisionCard({ card }: VisionCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const selectedCardId = useAppStore((state) => state.selectedCardId);
  const setSelectedCardId = useAppStore((state) => state.setSelectedCardId);
  const updateVisionCard = useAppStore((state) => state.updateVisionCard);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  
  const isSelected = selectedCardId === card.id;
  const targetScale = isDragging ? 1.15 : (hovered || isSelected) ? 1.08 : 1;
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // 流畅的缩放动画
    const dampSpeed = lowStimulationMode ? 0.15 : 0.1;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * dampSpeed;
    meshRef.current.scale.setScalar(newScale);
    
    // 优雅的漂浮动画（水下感）
    if (!isDragging && !isSelected) {
      const time = state.clock.getElapsedTime();
      const floatY = Math.sin(time * 0.6 + card.position[0]) * 0.08;
      const floatX = Math.cos(time * 0.4 + card.position[2]) * 0.03;
      meshRef.current.position.x = card.position[0] + floatX;
      meshRef.current.position.y = card.position[1] + floatY;
      
      // 微妙旋转
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }
    
    // 悬停时的光晕脉冲
    if (glowRef.current && (hovered || isSelected)) {
      const pulseIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      glowRef.current.scale.setScalar(1 + pulseIntensity * 0.1);
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
      // 拖拽更新位置
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
      {/* 主卡片 */}
      <RoundedBox
        ref={meshRef}
        args={[1.5, 2, 0.05]}
        radius={0.08}
        smoothness={4}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={isSelected ? "#2a2a3a" : "#1a1a1a"}
          roughness={0.6}
          metalness={0.2}
          transparent
          opacity={0.9}
          emissive={isSelected ? "#FFEEDD" : (hovered ? "#444466" : "#000000")}
          emissiveIntensity={isSelected ? 0.3 : (hovered ? 0.15 : 0.1)}
        />
      </RoundedBox>
      
      {/* 背景光晕层 - 悬停/选中时显示 */}
      {(hovered || isSelected) && (
        <RoundedBox
          ref={glowRef}
          args={[1.6, 2.1, 0.06]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, -0.02]}
        >
          <meshBasicMaterial
            color="#FFEEDD"
            transparent
            opacity={isSelected ? 0.15 : 0.08}
            side={THREE.BackSide}
          />
        </RoundedBox>
      )}
      
      {/* 内容 - 基于类型 */}
      {card.type === 'text' && (
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.16}
          color="#FFEEDD"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.3}
          lineHeight={1.2}
          outlineWidth={0.005}
          outlineColor="#050505"
        >
          {card.content}
        </Text>
      )}
      
      {card.type === 'image' && (
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.3, 1.7]} />
          <meshBasicMaterial
            color="#666666"
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* 选中时的点光源 */}
      {isSelected && (
        <pointLight
          position={[0, 0, 0.5]}
          color="#FFEEDD"
          intensity={0.8}
          distance={3}
          decay={2}
        />
      )}
      
      {/* 悬停时的边缘高光 */}
      {hovered && !isSelected && (
        <mesh position={[0, 0, -0.01]}>
          <ringGeometry args={[0.75, 1.05, 32]} />
          <meshBasicMaterial
            color="#FFEEDD"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* 标签显示 */}
      {card.tags.length > 0 && (
        <Text
          position={[0, -0.9, 0.03]}
          fontSize={0.09}
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