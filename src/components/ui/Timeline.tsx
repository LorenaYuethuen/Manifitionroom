import { ChevronUp, ChevronDown, Undo, Redo } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function Timeline() {
  const showTimeline = useAppStore((state) => state.showTimeline);
  const setShowTimeline = useAppStore((state) => state.setShowTimeline);
  const visionCards = useAppStore((state) => state.visionCards);
  const history = useAppStore((state) => state.history);
  const historyIndex = useAppStore((state) => state.historyIndex);
  const undo = useAppStore((state) => state.undo);
  const redo = useAppStore((state) => state.redo);
  const currentStage = useAppStore((state) => state.currentStage);
  
  if (currentStage !== 'vision' && currentStage !== 'manifestation') return null;
  
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/35 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/50 transition-all flex items-center gap-2"
      >
        {showTimeline ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        <span className="text-sm">时间轴 ({visionCards.length})</span>
      </button>
      
      {/* Timeline panel */}
      {showTimeline && (
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-black/35 backdrop-blur-sm border-t border-white/10 z-30 p-4">
          <div className="flex items-center gap-4 h-full">
            {/* Undo/Redo controls */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="撤销"
              >
                <Undo size={18} className="text-white" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="重做"
              >
                <Redo size={18} className="text-white" />
              </button>
            </div>
            
            {/* Timeline visualization */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 h-full items-center">
                {visionCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="shrink-0 w-20 h-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-xs text-gray-400"
                  >
                    <div className="text-center">
                      <div className="font-semibold text-white">{card.type === 'text' ? '文字' : '图片'}</div>
                      <div className="mt-1">{index + 1}</div>
                    </div>
                  </div>
                ))}
                
                {visionCards.length === 0 && (
                  <p className="text-gray-500 text-sm italic">还没有添加任何素材</p>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="shrink-0 text-right text-sm text-gray-400">
              <div>总计: {visionCards.length} 项</div>
              <div className="text-xs mt-1">历史: {historyIndex + 1}/{history.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
