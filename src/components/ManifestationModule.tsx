/**
 * 显化模块3D可视化组件
 * 展示AI分析生成的人生规划模块，包含五官感知锚点
 * 优化版：渐进式五感展开、涟漪效果、流畅动画
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import { useAppStore } from '../store/useAppStore';
import * as THREE from '../lib/three';
import type { ManifestationModule } from '../lib/manifestationGenerator';

interface Props {
  module: ManifestationModule;
  position: [number, number, number];
  moduleIndex: number;
}

export function ManifestationModuleComponent({ module, position, moduleIndex }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const sensoryGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const selectedCardId = useAppStore((state) => state.selectedCardId);
  const setSelectedCardId = useAppStore((state) => state.setSelectedCardId);
  
  const isSelected = selectedCardId === moduleIndex.toString();

  // 五感锚点的位置配置（螺旋展开）
  const sensoryPositions = [
    { pos: [0, 1.5, 0], angle: 0 },      // visual - 顶部
    { pos: [1.3, 0.8, 0], angle: 72 },   // auditory - 右上
    { pos: [1.1, -0.6, 0.8], angle: 144 }, // kinesthetic - 右下前
    { pos: [-1.1, -0.6, 0.8], angle: 216 }, // olfactory - 左下前
    { pos: [-1.3, 0.8, 0], angle: 288 }  // emotional - 左上
  ];

  const handleClick = () => {
    setSelectedCardId(isSelected ? null : moduleIndex.toString());
  };

  useFrame((state) => {
    if (!groupRef.current || !sphereRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // 优雅的漂浮动画（水下感）
    const floatY = Math.sin(time * 0.5 + position[0]) * 0.12;
    const floatX = Math.cos(time * 0.3 + position[2]) * 0.05;
    groupRef.current.position.set(
      position[0] + floatX, 
      position[1] + floatY, 
      position[2]
    );
    
    // 微妙旋转
    sphereRef.current.rotation.y = time * 0.15;
    sphereRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    
    // 流畅的缩放过渡
    const targetScale = isSelected ? 1.2 : (hovered ? 1.1 : 1);
    sphereRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 
      0.08
    );

    // 五感锚点渐进式展开动画
    if (sensoryGroupRef.current) {
      const targetOpacity = isSelected ? 1 : 0;
      sensoryGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material.opacity !== undefined) {
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
          }
        }
      });

      // 螺旋展开动画
      if (isSelected) {
        sensoryGroupRef.current.rotation.y = time * 0.3;
      }
    }
  });

  const color = module.dimension.color;
  const sensoryColors = ['#FF6B9D', '#6BCF7F', '#FFD93D', '#C9A0DC', '#6EC6FF'];

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* 主球体 */}
      <Sphere
        ref={sphereRef}
        args={[1, 32, 32]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={isSelected ? 0.6 : (hovered ? 0.4 : 0.2)}
        />
      </Sphere>

      {/* 涟漪效果 - hover时显示 */}
      {hovered && !isSelected && (
        <>
          <Sphere args={[1.15, 32, 32]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </Sphere>
          <Sphere args={[1.25, 32, 32]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.08}
              side={THREE.BackSide}
            />
          </Sphere>
        </>
      )}

      {/* 维度图标和名称 */}
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.45}
        color="#FFEEDD"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#050505"
      >
        {module.dimension.icon}
      </Text>
      
      <Text
        position={[0, 1.15, 0]}
        fontSize={0.28}
        color="#FFEEDD"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#050505"
        fontWeight={300}
      >
        {module.dimension.name}
      </Text>

      {/* 愿景文本 - 选中时显示 */}
      {isSelected && (
        <Text
          position={[0, -1.6, 0]}
          fontSize={0.2}
          color="#FFEEDD"
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="#050505"
          lineHeight={1.3}
        >
          {module.vision}
        </Text>
      )}

      {/* 主光源 */}
      <pointLight
        position={[0, 0, 0]}
        color={color}
        intensity={isSelected ? 1.5 : (hovered ? 1 : 0.5)}
        distance={6}
        decay={2}
      />

      {/* 五感锚点系统 - 渐进式展开 */}
      <group ref={sensoryGroupRef}>
        {sensoryPositions.map((config, index) => {
          const sensoryColor = sensoryColors[index];
          const [x, y, z] = config.pos;
          
          return (
            <group key={index}>
              {/* 锚点球体 */}
              <Sphere 
                args={[0.18, 20, 20]} 
                position={[x, y, z]}
              >
                <meshStandardMaterial 
                  color={sensoryColor}
                  emissive={sensoryColor} 
                  emissiveIntensity={0.7}
                  transparent
                  opacity={0}
                  roughness={0.2}
                  metalness={0.8}
                />
              </Sphere>

              {/* 连接线 - 从主球体到锚点 */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([
                      0, 0, 0,
                      x, y, z
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={sensoryColor}
                  transparent
                  opacity={0}
                  linewidth={2}
                />
              </line>

              {/* 锚点光晕 */}
              <pointLight
                position={[x, y, z]}
                color={sensoryColor}
                intensity={0.8}
                distance={2}
                decay={2}
              />
            </group>
          );
        })}
      </group>

      {/* 中心连接线（连到显化空间中心） */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              0, 0, 0,
              -position[0] * 0.3, -position[1] * 0.3, -position[2] * 0.3
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FFEEDD"
          transparent
          opacity={isSelected ? 0.5 : 0.2}
          linewidth={isSelected ? 2 : 1}
        />
      </line>

      {/* 选中时的外环 */}
      {isSelected && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.02, 16, 64]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.4}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.6, 0.015, 16, 64]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2}
            />
          </mesh>
        </>
      )}
    </group>
  );
}