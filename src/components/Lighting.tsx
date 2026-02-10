import { useRef } from 'react';
import type { DirectionalLight } from 'three';

export function Lighting() {
  const dirLightRef = useRef<DirectionalLight>(null);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        ref={dirLightRef}
        position={[5, 5, 5]} 
        intensity={0.3} 
      />
    </>
  );
}
