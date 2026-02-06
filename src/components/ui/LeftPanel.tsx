import { ChevronLeft, ChevronRight, Upload, Image, Type, Music } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function LeftPanel() {
  const showLeftPanel = useAppStore((state) => state.showLeftPanel);
  const setShowLeftPanel = useAppStore((state) => state.setShowLeftPanel);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const setLowStimulationMode = useAppStore((state) => state.setLowStimulationMode);
  const currentStage = useAppStore((state) => state.currentStage);
  const setStage = useAppStore((state) => state.setStage);
  const addVisionCard = useAppStore((state) => state.addVisionCard);
  
  const handleAddText = () => {
    const text = prompt('输入愿景文字：');
    if (text) {
      addVisionCard({
        type: 'text',
        content: text,
        position: [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 2 - 1],
        rotation: [0, 0, 0],
        scale: 1,
        tags: []
      });
    }
  };
  
  const handleAddImage = () => {
    addVisionCard({
      type: 'image',
      content: 'placeholder',
      position: [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 2 - 1],
      rotation: [0, 0, 0],
      scale: 1,
      tags: []
    });
  };
  
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setShowLeftPanel(!showLeftPanel)}
        className="fixed top-4 left-4 z-50 bg-black/35 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/50 transition-all"
        aria-label={showLeftPanel ? '隐藏左侧面板' : '显示左侧面板'}
      >
        {showLeftPanel ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-black/35 backdrop-blur-sm text-white p-6 pt-20 transition-transform duration-300 z-40 ${
          showLeftPanel ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-xl font-light mb-1">MANIFITION ROOM</h2>
            <p className="text-sm text-gray-400">沉浸式愿景显化空间</p>
          </div>
          
          {/* Stage progress */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider">当前阶段</p>
            <div className="space-y-2">
              {[
                { id: 'void', label: 'A. 虚空唤醒', icon: '✦' },
                { id: 'vision', label: 'B. 愿景环廊', icon: '◆' },
                { id: 'mobius', label: 'C. 莫比乌斯环', icon: '∞' },
                { id: 'manifestation', label: 'D. 显化核心', icon: '◉' }
              ].map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setStage(stage.id as any)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                    currentStage === stage.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{stage.icon}</span>
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Settings */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400 uppercase tracking-wider">设置</p>
            
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">低刺激模式</span>
              <input
                type="checkbox"
                checked={lowStimulationMode}
                onChange={(e) => setLowStimulationMode(e.target.checked)}
                className="w-10 h-5 bg-gray-600 rounded-full relative cursor-pointer appearance-none transition-colors checked:bg-blue-600"
              />
            </label>
            
            <p className="text-xs text-gray-500 italic">
              减慢动画速度，降低视觉对比
            </p>
          </div>
          
          {/* Actions */}
          {currentStage === 'vision' && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-wider">添加素材</p>
              
              <button
                onClick={handleAddImage}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <Image size={18} />
                <span className="text-sm">图片</span>
              </button>
              
              <button
                onClick={handleAddText}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <Type size={18} />
                <span className="text-sm">文字</span>
              </button>
              
              <button
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all opacity-50 cursor-not-allowed"
                disabled
              >
                <Music size={18} />
                <span className="text-sm">音频（即将推出）</span>
              </button>
            </div>
          )}
          
          {/* Guide */}
          <div className="pt-4 border-t border-white/10 text-xs text-gray-500 space-y-2">
            <p className="font-semibold text-gray-400">使用指南</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>鼠标移动控制视角</li>
              <li>拖拽卡片调整位置</li>
              <li>点击切换不同阶段</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
