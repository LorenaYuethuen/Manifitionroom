import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CameraRig } from './CameraRig';
import { VoidScene } from './stages/VoidScene';
import { VisionBoard } from './stages/VisionBoard';
import { MobiusTransition } from './stages/MobiusTransition';
import { ManifestationSpace } from './stages/ManifestationSpace';
import { Stars } from './effects/Stars';
import { AudioVisualizer } from './effects/AudioVisualizer';
import { Lighting } from './Lighting';
import { useAppStore } from '../store/useAppStore';

export function Scene() {
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const currentStage = useAppStore((state) => state.currentStage);
  
  return (
    <Canvas
      camera={{ position: [0, 1, 15], fov: 50 }}
      dpr={[1, 2]}
      style={{ background: '#050505', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <Lighting />
        
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
      </Suspense>
    </Canvas>
  );
}