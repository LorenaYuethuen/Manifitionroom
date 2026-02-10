import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../store/useAppStore';

// Custom damping functions to replace maath
function damp3(
  current: { x: number; y: number; z: number },
  target: [number, number, number],
  smoothing: number,
  delta: number
) {
  const factor = 1 - Math.exp(-smoothing * delta);
  current.x += (target[0] - current.x) * factor;
  current.y += (target[1] - current.y) * factor;
  current.z += (target[2] - current.z) * factor;
}

function dampE(
  current: { x: number; y: number; z: number },
  target: [number, number, number],
  smoothing: number,
  delta: number
) {
  const factor = 1 - Math.exp(-smoothing * delta);
  current.x += (target[0] - current.x) * factor;
  current.y += (target[1] - current.y) * factor;
  current.z += (target[2] - current.z) * factor;
}

export function CameraRig() {
  const { camera } = useThree();
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const currentStage = useAppStore((state) => state.currentStage);
  
  useFrame((state, delta) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (reducedMotion) {
      // Skip all animations for accessibility
      return;
    }
    
    // Damping coefficient - slower in low stimulation mode
    const dampingPosition = lowStimulationMode ? 0.8 : 0.5;
    const dampingRotation = lowStimulationMode ? 1.2 : 0.8;
    
    // Different camera behaviors for each stage
    switch (currentStage) {
      case 'void':
        // Subtle head movement following pointer
        damp3(
          camera.position,
          [
            state.pointer.x * 1.5,
            state.pointer.y * 0.8 + 1,
            15
          ],
          dampingPosition,
          delta
        );
        
        dampE(
          camera.rotation,
          [state.pointer.y * -0.08, state.pointer.x * 0.08, 0],
          dampingRotation,
          delta
        );
        break;
        
      case 'vision':
        // Orbital feel - user at center
        damp3(
          camera.position,
          [
            state.pointer.x * 2,
            state.pointer.y * 1.5 + 2,
            12
          ],
          dampingPosition,
          delta
        );
        
        dampE(
          camera.rotation,
          [state.pointer.y * -0.1, state.pointer.x * 0.1, 0],
          dampingRotation,
          delta
        );
        break;
        
      case 'manifestation':
        // Closer, more intimate view
        damp3(
          camera.position,
          [
            state.pointer.x * 1,
            state.pointer.y * 0.5 + 1.5,
            8
          ],
          dampingPosition,
          delta
        );
        
        dampE(
          camera.rotation,
          [state.pointer.y * -0.05, state.pointer.x * 0.05, 0],
          dampingRotation,
          delta
        );
        break;
    }
  });
  
  return null;
}