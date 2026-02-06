import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sphere } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

interface Module {
  id: string;
  title: string;
  color: string;
  position: [number, number, number];
}

export function ManifestationSpace() {
  const groupRef = useRef<THREE.Group>(null);
  const currentStage = useAppStore((state) => state.currentStage);
  const visionCards = useAppStore((state) => state.visionCards);
  
  // Define manifestation modules based on life areas
  const modules = useMemo<Module[]>(() => [
    { id: 'career', title: '职业', color: '#3a5a7a', position: [4, 0, 0] },
    { id: 'health', title: '健康', color: '#5a7a3a', position: [2.8, 0, 2.8] },
    { id: 'relationships', title: '关系', color: '#7a3a5a', position: [0, 0, 4] },
    { id: 'creativity', title: '创作', color: '#7a5a3a', position: [-2.8, 0, 2.8] },
    { id: 'growth', title: '成长', color: '#3a7a5a', position: [-4, 0, 0] },
    { id: 'spirituality', title: '精神', color: '#5a3a7a', position: [-2.8, 0, -2.8] },
  ], []);
  
  useFrame((state) => {
    if (!groupRef.current || currentStage !== 'manifestation') return;
    
    // Gentle rotation of the entire space
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;
  });
  
  if (currentStage !== 'manifestation') return null;
  
  return (
    <group ref={groupRef}>
      {/* Subtle fog */}
      <fog attach="fog" args={['#050505', 10, 35]} />
      
      {/* Lighting */}
      <hemisphereLight args={['#ffffff', '#444466', 0.7]} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.8}
        color="#fff3e0"
        castShadow
      />
      
      {/* Central nexus */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FFEEDD"
          emissive="#FFEEDD"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      
      {/* Manifestation modules */}
      {modules.map((module, index) => (
        <group key={module.id} position={module.position}>
          {/* Module sphere */}
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial
              color={module.color}
              roughness={0.6}
              metalness={0.4}
              transparent
              opacity={0.7}
              emissive={module.color}
              emissiveIntensity={0.3}
            />
          </Sphere>
          
          {/* Module label */}
          <Text
            position={[0, 1.2, 0]}
            fontSize={0.3}
            color="#CCCCCC"
            anchorX="center"
            anchorY="middle"
          >
            {module.title}
          </Text>
          
          {/* Connection line to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  -module.position[0], -module.position[1], -module.position[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#444466"
              transparent
              opacity={0.3}
              linewidth={1}
            />
          </line>
          
          {/* Glow effect */}
          <pointLight
            position={[0, 0, 0]}
            color={module.color}
            intensity={0.5}
            distance={3}
          />
        </group>
      ))}
      
      {/* Vision cards distributed around modules */}
      {visionCards.map((card, index) => {
        const moduleIndex = index % modules.length;
        const module = modules[moduleIndex];
        const offset = (index / visionCards.length) * Math.PI * 2;
        const radius = 1.5;
        
        const x = module.position[0] + Math.cos(offset) * radius;
        const z = module.position[2] + Math.sin(offset) * radius;
        
        return (
          <RoundedBox
            key={card.id}
            position={[x, 0.5, z]}
            args={[0.6, 0.8, 0.05]}
            radius={0.02}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.7}
              transparent
              opacity={0.8}
            />
          </RoundedBox>
        );
      })}
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Instruction text */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.35}
        color="#CCCCCC"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        探索你的愿景模块
      </Text>
      <Text
        position={[0, 2.4, 0]}
        fontSize={0.2}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        点击模块查看关联的愿景卡片
      </Text>
    </group>
  );
}
