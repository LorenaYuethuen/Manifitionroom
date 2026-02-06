import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Help button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-black/35 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-all"
        aria-label="帮助"
      >
        <HelpCircle size={20} />
      </button>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-light text-white">使用指南</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="关闭"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6 text-gray-300">
              {/* Stages */}
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">四个阶段</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">✦</span>
                      <h4 className="font-semibold text-white">A. 虚空唤醒</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      通过粒子系统和氛围营造，帮助你从外界杂念进入内观状态。空间会自动引导你前进。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">◆</span>
                      <h4 className="font-semibold text-white">B. 愿景环廊</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      在 3D 画廊中构建你的愿景板。使用左侧面板添加图片和文字，拖拽卡片进行排列。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">∞</span>
                      <h4 className="font-semibold text-white">C. 莫比乌斯环</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      穿越非欧几何的过渡通道，将愿景素材串联到具象空间。相机会沿着莫比乌斯带平滑移动。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">◉</span>
                      <h4 className="font-semibold text-white">D. 显化核心</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      探索具象化的人生模块（职业、健康、关系等），你的愿景卡片会分布在相关模块周围。
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Controls */}
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">控制方式</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-semibold text-white mb-1">鼠标移动</div>
                    <div className="text-gray-400">控制视角</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-semibold text-white mb-1">拖拽</div>
                    <div className="text-gray-400">移动卡片</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-semibold text-white mb-1">键盘 1-4</div>
                    <div className="text-gray-400">切换阶段</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-semibold text-white mb-1">Ctrl+Z / Ctrl+Y</div>
                    <div className="text-gray-400">撤销/重做</div>
                  </div>
                </div>
              </section>
              
              {/* Features */}
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">特色功能</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEEDD] mt-0.5">•</span>
                    <span><strong className="text-white">低刺激模式：</strong>减慢动画速度，降低视觉对比度，适合高敏感人群</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEEDD] mt-0.5">•</span>
                    <span><strong className="text-white">Wabi-sabi 美学：</strong>采用侘寂设计理念，营造自然、朴素的视觉体验</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEEDD] mt-0.5">•</span>
                    <span><strong className="text-white">平滑动线：</strong>所有相机移动都带有阻尼效果，如同在水中漂浮</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEEDD] mt-0.5">•</span>
                    <span><strong className="text-white">时间轴管理：</strong>支持历史快照、撤销/重做功能</span>
                  </li>
                </ul>
              </section>
              
              {/* Tips */}
              <section className="bg-[#FFEEDD]/5 p-4 rounded border border-[#FFEEDD]/20">
                <h3 className="text-sm font-semibold text-[#FFEEDD] mb-2">💡 使用提示</h3>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• 建议在安静的环境中体验，获得最佳沉浸感</li>
                  <li>• 第一次进入会有简短的自动引导动画</li>
                  <li>• 可以随时手动切换阶段，不必按顺序进行</li>
                  <li>• 支持系统的"减少动画"无障碍设置</li>
                </ul>
              </section>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-all"
              >
                开始体验
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
