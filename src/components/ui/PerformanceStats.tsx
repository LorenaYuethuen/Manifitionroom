import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export function PerformanceStats() {
  const [show, setShow] = useState(false);
  const [fps, setFps] = useState(60);
  
  useEffect(() => {
    if (!show) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFps);
    };
    
    const rafId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(rafId);
  }, [show]);
  
  // Only show in development or when explicitly enabled
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV !== false;
  
  if (!isDev) return null;
  
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-black/35 backdrop-blur-sm text-white px-3 py-1.5 rounded text-xs hover:bg-black/50 transition-all flex items-center gap-2"
        aria-label="性能统计"
      >
        <Activity size={14} />
        {show && <span>{fps} FPS</span>}
      </button>
      
      {show && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-xs space-y-1 min-w-[200px]">
          <div className="flex justify-between">
            <span className="text-gray-400">帧率:</span>
            <span className={fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
              {fps} FPS
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">内存:</span>
            <span>{((performance as any).memory?.usedJSHeapSize / 1048576).toFixed(1) || 'N/A'} MB</span>
          </div>
          <div className="pt-2 border-t border-white/10 text-gray-500 text-[10px]">
            Dev mode only
          </div>
        </div>
      )}
    </>
  );
}