/**
 * 五感粒子系统
 * 为每个感官维度创建独特的粒子视觉效果
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SensoryParticlesProps {
  sensoryType: 'visual' | 'auditory' | 'kinesthetic' | 'olfactory' | 'emotional';
  intensity: number; // 0-100
  active: boolean;
  position?: [number, number, number];
}

export function SensoryParticles({ 
  sensoryType, 
  intensity, 
  active,
  position = [0, 0, 0]
}: SensoryParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // 根据感官类型定义粒子特征
  const config = useMemo(() => {
    const configs = {
      visual: {
        color: new THREE.Color('#FFEEDD'), // 暖白光
        count: 50,
        size: 0.08,
        spread: 1.5,
        speed: 0.3,
        pattern: 'spiral', // 螺旋
        opacity: 0.8
      },
      auditory: {
        color: new THREE.Color('#A8DADC'), // 宁静蓝
        count: 30,
        size: 0.06,
        spread: 2.0,
        speed: 0.5,
        pattern: 'wave', // 波浪
        opacity: 0.6
      },
      kinesthetic: {
        color: new THREE.Color('#F72585'), // 创造紫红
        count: 40,
        size: 0.1,
        spread: 1.2,
        speed: 0.2,
        pattern: 'flow', // 流动
        opacity: 0.7
      },
      olfactory: {
        color: new THREE.Color('#7FB069'), // 生命绿
        count: 35,
        size: 0.07,
        spread: 1.8,
        speed: 0.15,
        pattern: 'drift', // 漂移
        opacity: 0.5
      },
      emotional: {
        color: new THREE.Color('#FFB703'), // 金色
        count: 60,
        size: 0.12,
        spread: 2.5,
        speed: 0.25,
        pattern: 'radial', // 辐射
        opacity: 0.9
      }
    };
    return configs[sensoryType];
  }, [sensoryType]);

  // 生成粒子位置
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(config.count * 3);
    const velocities = new Float32Array(config.count * 3);
    
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      
      // 根据不同的pattern生成初始位置
      if (config.pattern === 'spiral') {
        const angle = (i / config.count) * Math.PI * 4;
        const radius = (i / config.count) * config.spread;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = (i / config.count) * 2 - 1;
        positions[i3 + 2] = Math.sin(angle) * radius;
      } else if (config.pattern === 'wave') {
        positions[i3] = (Math.random() - 0.5) * config.spread;
        positions[i3 + 1] = Math.sin((i / config.count) * Math.PI * 2);
        positions[i3 + 2] = (Math.random() - 0.5) * config.spread;
      } else if (config.pattern === 'flow') {
        positions[i3] = (Math.random() - 0.5) * config.spread;
        positions[i3 + 1] = (Math.random() - 0.5) * config.spread;
        positions[i3 + 2] = (Math.random() - 0.5) * config.spread;
      } else if (config.pattern === 'drift') {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * config.spread;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.random() * 2 - 1;
        positions[i3 + 2] = Math.sin(angle) * radius;
      } else if (config.pattern === 'radial') {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * config.spread;
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }
      
      // 初始速度
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, [config]);

  // 动画循环
  useFrame((state, delta) => {
    if (!particlesRef.current || !active) return;
    
    const geometry = particlesRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    timeRef.current += delta * config.speed;
    
    // 强度影响
    const intensityFactor = intensity / 100;
    
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      
      // 根据pattern更新位置
      if (config.pattern === 'spiral') {
        const angle = timeRef.current + (i / config.count) * Math.PI * 4;
        const radius = ((i / config.count) * config.spread) * intensityFactor;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(timeRef.current * 0.5 + i) * 0.5;
        positions[i3 + 2] = Math.sin(angle) * radius;
      } else if (config.pattern === 'wave') {
        positions[i3 + 1] = Math.sin(timeRef.current * 2 + (i / config.count) * Math.PI * 2) * intensityFactor;
      } else if (config.pattern === 'flow') {
        // 水下漂浮感
        positions[i3] += Math.sin(timeRef.current + i) * 0.01 * intensityFactor;
        positions[i3 + 1] += Math.cos(timeRef.current * 1.3 + i) * 0.01 * intensityFactor;
        positions[i3 + 2] += Math.sin(timeRef.current * 0.7 + i) * 0.01 * intensityFactor;
      } else if (config.pattern === 'drift') {
        // 缓慢向上漂移
        positions[i3 + 1] += delta * 0.1 * intensityFactor;
        positions[i3] += Math.sin(timeRef.current + i) * 0.005;
        
        // 重置到底部
        if (positions[i3 + 1] > 2) {
          positions[i3 + 1] = -2;
        }
      } else if (config.pattern === 'radial') {
        // 呼吸式扩张收缩
        const breath = Math.sin(timeRef.current) * 0.3 + 1;
        const scale = breath * intensityFactor;
        
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = ((i / config.count) * config.spread) * scale;
        
        positions[i3] += (Math.sin(phi) * Math.cos(theta) * radius - positions[i3]) * 0.1;
        positions[i3 + 1] += (Math.sin(phi) * Math.sin(theta) * radius - positions[i3 + 1]) * 0.1;
        positions[i3 + 2] += (Math.cos(phi) * radius - positions[i3 + 2]) * 0.1;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    
    // 材质透明度随强度和激活状态变化
    const material = particlesRef.current.material as THREE.PointsMaterial;
    const targetOpacity = active ? config.opacity * intensityFactor : 0;
    material.opacity += (targetOpacity - material.opacity) * 0.05;
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={config.count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.size}
        color={config.color}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * 五感粒子组合 - 同时显示多个感官维度
 */
interface MultiSensoryParticlesProps {
  sensoryData: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    olfactory: number;
    emotional: number;
  };
  activeSenses?: Set<string>;
}

export function MultiSensoryParticles({ 
  sensoryData, 
  activeSenses 
}: MultiSensoryParticlesProps) {
  return (
    <group>
      <SensoryParticles
        sensoryType="visual"
        intensity={sensoryData.visual}
        active={!activeSenses || activeSenses.has('visual')}
        position={[0, 0, 0]}
      />
      <SensoryParticles
        sensoryType="auditory"
        intensity={sensoryData.auditory}
        active={!activeSenses || activeSenses.has('auditory')}
        position={[0, 0, 0]}
      />
      <SensoryParticles
        sensoryType="kinesthetic"
        intensity={sensoryData.kinesthetic}
        active={!activeSenses || activeSenses.has('kinesthetic')}
        position={[0, 0, 0]}
      />
      <SensoryParticles
        sensoryType="olfactory"
        intensity={sensoryData.olfactory}
        active={!activeSenses || activeSenses.has('olfactory')}
        position={[0, 0, 0]}
      />
      <SensoryParticles
        sensoryType="emotional"
        intensity={sensoryData.emotional}
        active={!activeSenses || activeSenses.has('emotional')}
        position={[0, 0, 0]}
      />
    </group>
  );
}
