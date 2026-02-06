import { Suspense } from 'react';
import { Scene } from './components/Scene';
import { LeftPanel } from './components/ui/LeftPanel';
import { StageIndicator } from './components/ui/StageIndicator';
import { Instructions } from './components/ui/Instructions';
import { Timeline } from './components/ui/Timeline';
import { KeyboardShortcuts } from './components/ui/KeyboardShortcuts';
import { HelpModal } from './components/ui/HelpModal';
import { PerformanceStats } from './components/ui/PerformanceStats';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/globals.css';

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050505]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-[#FFEEDD] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[#CCCCCC] text-sm">Loading experience...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="w-full h-full relative">
        {/* 3D Scene */}
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
        
        {/* UI Overlays */}
        <LeftPanel />
        <StageIndicator />
        <Instructions />
        <Timeline />
        <HelpModal />
        <PerformanceStats />
        
        {/* Keyboard shortcuts */}
        <KeyboardShortcuts />
        
        {/* Accessibility message */}
        <div 
          role="status" 
          aria-live="polite" 
          className="sr-only"
        >
          MANIFITION ROOM - 沉浸式虚拟人生规划显化空间已加载
        </div>
      </div>
    </ErrorBoundary>
  );
}