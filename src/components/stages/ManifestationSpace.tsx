import { ModuleCard } from '../ModuleCard';
import { useAppStore } from '../../store/useAppStore';

export function ManifestationSpace() {
  const currentStage = useAppStore((state) => state.currentStage);
  const manifestationModules = useAppStore((state) => state.manifestationModules);
  
  const isActive = currentStage === 'manifestation';
  
  if (!isActive) return null;
  
  return (
    <group>
      {/* Additional lighting for core space */}
      <directionalLight position={[0, 8, 0]} intensity={0.3} />
      <spotLight 
        position={[0, 10, 0]} 
        angle={Math.PI / 6} 
        penumbra={0.3} 
        intensity={1.0}
        distance={20}
        decay={2}
      />
      
      {/* Manifestation module cards */}
      {manifestationModules.map((module, index) => (
        <ModuleCard
          key={module.id}
          module={module}
          index={index}
        />
      ))}
    </group>
  );
}