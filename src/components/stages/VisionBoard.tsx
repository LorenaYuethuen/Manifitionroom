import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';
import { VisionCard as VisionCardComponent } from '../VisionCard';

export function VisionBoard() {
  const groupRef = useRef<THREE.Group>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const visionCards = useAppStore((state) => state.visionCards);
  const setStage = useAppStore((state) => state.setStage);
  
  useFrame((state) => {
    if (!groupRef.current || currentStage !== 'vision') return;
    
    // Gentle rotation of the gallery
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.15;
  });
  
  if (currentStage !== 'vision') return null;
  
  return (
    <group ref={groupRef}>
      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 8, 30]} />
      
      {/* Lighting setup */}
      <hemisphereLight args={['#ffffff', '#444466', 0.6]} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#fff3e0"
        castShadow
      />
      
      {/* Gallery backdrop - circular panels */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 10;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <RoundedBox
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            args={[3, 4, 0.1]}
            radius={0.05}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.8}
              transparent
              opacity={0.3}
            />
          </RoundedBox>
        );
      })}
      
      {/* Vision cards */}
      {visionCards.map((card) => (
        <VisionCardComponent key={card.id} card={card} />
      ))}
      
      {/* Placeholder instruction */}
      {visionCards.length === 0 && (
        <group position={[0, 0, 0]}>
          <Text
            position={[0, 2, 0]}
            fontSize={0.4}
            color="#CCCCCC"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            拖拽素材到空间中
          </Text>
          <Text
            position={[0, 1.3, 0]}
            fontSize={0.25}
            color="#888888"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            使用左侧面板上传图片、文字或音频
          </Text>
        </group>
      )}
      
      {/* Ground plane for reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
