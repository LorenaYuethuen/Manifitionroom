import { ChevronLeft, ChevronRight, Upload, Image, Type, Music, Sparkles, Database } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { ImageUploader } from './ImageUploader';
import { generateMockManifestationModules } from '../../data/mockVisionData';
import { useState } from 'react';
import { VisionGallery } from './VisionGallery';

export function LeftPanel() {
  const showLeftPanel = useAppStore((state) => state.showLeftPanel);
  const setShowLeftPanel = useAppStore((state) => state.setShowLeftPanel);
  const lowStimulationMode = useAppStore((state) => state.lowStimulationMode);
  const setLowStimulationMode = useAppStore((state) => state.setLowStimulationMode);
  const currentStage = useAppStore((state) => state.currentStage);
  const setStage = useAppStore((state) => state.setStage);
  const addVisionCard = useAppStore((state) => state.addVisionCard);
  const manifestationModules = useAppStore((state) => state.manifestationModules);
  const setManifestationModules = useAppStore((state) => state.setManifestationModules);
  
  const [showGallery, setShowGallery] = useState(false);
  
  // 加载模拟数据
  const handleLoadMockData = () => {
    const mockModules = generateMockManifestationModules();
    setManifestationModules(mockModules);
    setStage('manifestation');
  };
  
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

  const stages = [
    { id: 'void', label: 'A. 虚空唤醒', icon: '✦', color: '#6EC6FF' },
    { id: 'vision', label: 'B. 愿景环廊', icon: '◆', color: '#FF6B9D' },
    { id: 'mobius', label: 'C. 莫比乌斯环', icon: '∞', color: '#C9A0DC' },
    { id: 'manifestation', label: 'D. 显化核心', icon: '◉', color: '#6BCF7F' }
  ];
  
  return (
    <>
      {/* Toggle button - 优化版 */}
      <button
        onClick={() => setShowLeftPanel(!showLeftPanel)}
        className="fixed top-4 left-4 z-50 bg-black/40 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-black/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFEEDD]/20 border border-white/10 group"
        aria-label={showLeftPanel ? '隐藏左侧面板' : '显示左侧面板'}
      >
        <div className="relative">
          {showLeftPanel ? (
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
          )}
          {/* 脉冲提示 */}
          {!showLeftPanel && (
            <div className="absolute inset-0 rounded-xl bg-[#FFEEDD]/20 animate-ping" />
          )}
        </div>
      </button>
      
      {/* Panel - 优化版 */}
      <div
        className={`fixed top-0 left-0 h-full w-[360px] bg-black/40 backdrop-blur-xl text-white p-6 pt-20 transition-all duration-500 ease-out z-40 overflow-y-auto border-r border-white/10 ${
          showLeftPanel ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="space-y-6">
          {/* Title - 优化版 */}
          <div 
            className="pb-4 border-b border-white/10"
            style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.1s both' : undefined }}
          >
            <h2 className="text-xl font-light mb-1 tracking-wider">MANIFITION ROOM</h2>
            <p className="text-sm text-gray-400">沉浸式愿景显化空间</p>
          </div>
          
          {/* Stage progress - 优化版 */}
          <div 
            className="space-y-3"
            style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.2s both' : undefined }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">阶段导航</p>
            <div className="space-y-2">
              {stages.map((stage, index) => {
                const isActive = currentStage === stage.id;
                
                return (
                  <button
                    key={stage.id}
                    onClick={() => setStage(stage.id as any)}
                    className={`
                      relative w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 overflow-hidden group/stage
                      ${isActive
                        ? 'bg-white/15 text-white shadow-lg'
                        : 'text-gray-400 hover:bg-white/8 hover:text-white'
                      }
                    `}
                    style={{
                      animation: showLeftPanel ? `fadeInUp 0.4s ease-out ${0.3 + index * 0.05}s both` : undefined
                    }}
                  >
                    {/* 激活状态的背景光晕 */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 opacity-20 blur-xl transition-opacity duration-500"
                        style={{ backgroundColor: stage.color }}
                      />
                    )}
                    
                    {/* 悬停光效 */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/stage:translate-x-[100%] transition-transform duration-700"
                    />
                    
                    <div className="relative flex items-center gap-3">
                      <span 
                        className={`text-lg transition-transform duration-300 ${isActive ? 'scale-125' : 'group-hover/stage:scale-110'}`}
                        style={{ color: isActive ? stage.color : undefined }}
                      >
                        {stage.icon}
                      </span>
                      <span className="font-medium">{stage.label}</span>
                    </div>
                    
                    {/* 进度指示器 */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                        style={{ 
                          backgroundColor: stage.color,
                          boxShadow: `0 0 10px ${stage.color}`
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Settings - 优化版 */}
          <div 
            className="space-y-3 pt-4 border-t border-white/10"
            style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.4s both' : undefined }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider">设置</p>
            
            <label className="flex items-center justify-between cursor-pointer group/toggle p-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-sm group-hover/toggle:text-white transition-colors">低刺激模式</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={lowStimulationMode}
                  onChange={(e) => setLowStimulationMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`
                  w-11 h-6 rounded-full transition-all duration-300 cursor-pointer
                  ${lowStimulationMode 
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                    : 'bg-gray-600'
                  }
                `}>
                  <div className={`
                    absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-lg
                    ${lowStimulationMode ? 'translate-x-5' : 'translate-x-0'}
                  `} />
                </div>
              </div>
            </label>
            
            <p className="text-xs text-gray-500 italic px-3">
              减慢动画速度，降低视觉对比
            </p>
          </div>
          
          {/* Image Upload Section - 优化版 */}
          {currentStage === 'vision' && (
            <div 
              className="space-y-3 pt-4 border-t border-white/10"
              style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.5s both' : undefined }}
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                上传愿景图片
              </p>
              <ImageUploader />
              
              {/* 加载模拟数据按钮 */}
              <button
                onClick={handleLoadMockData}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#FFB703]/15 to-[#FFB703]/10 hover:from-[#FFB703]/25 hover:to-[#FFB703]/15 rounded-xl transition-all duration-300 group/mock border border-[#FFB703]/20 hover:border-[#FFB703]/40 hover:shadow-lg hover:shadow-[#FFB703]/20 relative overflow-hidden"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB703]/20 to-transparent translate-x-[-100%] group-hover/mock:translate-x-[100%] transition-transform duration-700" />
                
                <Database size={18} className="relative text-[#FFB703] group-hover/mock:scale-110 transition-transform" />
                <span className="relative text-sm font-medium text-[#FFB703]">
                  加载模拟数据（10个愿景）
                </span>
              </button>
              
              {/* 查看愿景画廊按钮 */}
              <button
                onClick={() => setShowGallery(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F72585]/15 to-[#F72585]/10 hover:from-[#F72585]/25 hover:to-[#F72585]/15 rounded-xl transition-all duration-300 group/gallery border border-[#F72585]/20 hover:border-[#F72585]/40 hover:shadow-lg hover:shadow-[#F72585]/20 relative overflow-hidden"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F72585]/20 to-transparent translate-x-[-100%] group-hover/gallery:translate-x-[100%] transition-transform duration-700" />
                
                <Image size={18} className="relative text-[#F72585] group-hover/gallery:scale-110 transition-transform" />
                <span className="relative text-sm font-medium text-[#F72585]">
                  查看愿景画廊
                </span>
              </button>
              
              {manifestationModules.length > 0 && (
                <div 
                  className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#FFEEDD]/10 to-[#FFEEDD]/5 border border-[#FFEEDD]/30 backdrop-blur-sm relative overflow-hidden group/modules"
                  style={{ animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
                >
                  {/* 背景光效 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFEEDD]/5 via-transparent to-transparent opacity-0 group-hover/modules:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <p className="text-sm text-[#FFEEDD] mb-3 font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      已生成显化模块
                    </p>
                    <div className="space-y-1.5">
                      {manifestationModules.map((module, index) => (
                        <div 
                          key={index} 
                          className="text-xs text-[#FFEEDD]/80 flex items-center gap-2 p-2 rounded-lg bg-[#FFEEDD]/5 hover:bg-[#FFEEDD]/10 transition-colors"
                          style={{ animation: `fadeInLeft 0.3s ease-out ${index * 0.05}s both` }}
                        >
                          <span className="text-base">{module.dimension.icon}</span>
                          <span className="font-medium">{module.dimension.name}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setStage('manifestation')}
                      className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-[#FFEEDD]/15 to-[#FFEEDD]/10 hover:from-[#FFEEDD]/25 hover:to-[#FFEEDD]/15 rounded-lg text-sm text-[#FFEEDD] transition-all duration-300 font-medium border border-[#FFEEDD]/20 hover:border-[#FFEEDD]/40 hover:shadow-lg hover:shadow-[#FFEEDD]/20 group/btn relative overflow-hidden"
                    >
                      {/* 按钮光效 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFEEDD]/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        进入显化核心查看详情
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Actions - Legacy add options */}
          {currentStage === 'vision' && (
            <div 
              className="space-y-3 pt-4 border-t border-white/10"
              style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.6s both' : undefined }}
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider">手动添加素材</p>
              
              <button
                onClick={handleAddText}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group/btn border border-white/10 hover:border-white/20 hover:shadow-lg"
              >
                <div className="p-2 rounded-lg bg-white/10 group-hover/btn:bg-white/20 transition-colors">
                  <Type size={18} className="group-hover/btn:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium">添加文字</span>
              </button>
            </div>
          )}
          
          {/* Guide */}
          <div 
            className="pt-4 border-t border-white/10 text-xs text-gray-500 space-y-2"
            style={{ animation: showLeftPanel ? 'fadeInUp 0.5s ease-out 0.7s both' : undefined }}
          >
            <p className="font-semibold text-gray-400">使用指南</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex items-start gap-2">
                <span className="text-[#6BCF7F] mt-0.5">•</span>
                <span>上传图片自动生成显化模块</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6B9D] mt-0.5">•</span>
                <span>鼠标移动控制视角</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD93D] mt-0.5">•</span>
                <span>切换到显化核心查看详情</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Vision Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[60]">
          <VisionGallery onSensoryActivate={() => {}} />
          <button
            onClick={() => setShowGallery(false)}
            className="fixed top-4 right-4 z-[70] p-3 bg-[#050505]/80 backdrop-blur-md text-[#FFEEDD] rounded-lg hover:bg-[#050505]/95 transition-all duration-300"
          >
            关闭画廊
          </button>
        </div>
      )}
    </>
  );
}