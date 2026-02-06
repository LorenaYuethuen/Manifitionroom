import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { VoidScene } from './stages/VoidScene';
import { VisionBoard } from './stages/VisionBoard';
import { MobiusTransition } from './stages/MobiusTransition';
import { ManifestationSpace } from './stages/ManifestationSpace';
import { Stars } from './effects/Stars';
import { AudioVisualizer } from './effects/AudioVisualizer';
import { useAppStore } from '../store/useAppStore';

export function Scene() {
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const currentStage = useAppStore((state) => state.currentStage);
  
  return (
    <Canvas
      camera={{ position: [0, 1, 15], fov: 50 }}
      gl={{ 
        antialias: true, 
        alpha: false,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
      style={{ background: '#050505' }}
      frameloop="always"
    >
      {/* Camera control */}
      <CameraRig />
      
      {/* Background stars (except during mobius) */}
      {currentStage !== 'mobius' && <Stars count={lowStimulationMode ? 500 : 1000} />}
      
      {/* Stages */}
      <VoidScene />
      <VisionBoard />
      <MobiusTransition />
      <ManifestationSpace />
      
      {/* Audio visualizer (manifestation stage only) */}
      <AudioVisualizer />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
    </Canvas>
  );
}
