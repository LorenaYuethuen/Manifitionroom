import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export function Instructions() {
  const [show, setShow] = useState(true);
  const currentStage = useAppStore((state) => state.currentStage);
  
  useEffect(() => {
    // Show instructions when entering void stage
    if (currentStage === 'void') {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);
  
  if (!show || currentStage !== 'void') return null;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
      style={{
        animation: 'fadeIn 900ms cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="text-center space-y-4 max-w-md px-8">
        <h1 className="text-4xl font-light text-white tracking-wide">
          欢迎来到
        </h1>
        <h2 className="text-5xl font-extralight text-[#FFEEDD] tracking-widest">
          MANIFITION ROOM
        </h2>
        <p className="text-gray-400 text-sm mt-6 leading-relaxed">
          在这个空间中，你将穿越虚空，构建愿景，<br />
          并将其显化为具象的人生模块
        </p>
        <p className="text-gray-500 text-xs mt-4">
          移动鼠标探索 • 空间将自动引导你前进
        </p>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
