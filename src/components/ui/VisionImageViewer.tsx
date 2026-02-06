/**
 * 愿景图片查看器
 * 展示愿景图片及其五感锚点拆解
 * 支持3D粒子效果联动
 */

import { useState } from 'react';
import { X, Maximize2, Sparkles } from 'lucide-react';
import type { VisionImage } from '../../data/mockVisionData';
import { SensoryVisualization, SensoryIndicator } from './SensoryVisualization';

interface VisionImageViewerProps {
  visionImage: VisionImage;
  onClose: () => void;
  onSensoryActivate?: (sensory: string) => void;
}

export function VisionImageViewer({ 
  visionImage, 
  onClose,
  onSensoryActivate 
}: VisionImageViewerProps) {
  const [imageExpanded, setImageExpanded] = useState(false);

  return (
    <div 
      className="fixed inset-0 bg-[#050505]/98 backdrop-blur-xl z-50 overflow-y-auto"
      style={{
        animation: 'fadeIn 0.4s ease-out both'
      }}
    >
      <div className="min-h-screen p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-[#FFB703]" />
                <h1 className="text-3xl font-light text-[#FFEEDD]">
                  {visionImage.title}
                </h1>
              </div>
              <p className="text-[#FFEEDD]/60 leading-relaxed max-w-2xl">
                {visionImage.description}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-[#FFEEDD]/50">关联维度:</span>
                {visionImage.dimensions.map((dim, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs bg-[#FFEEDD]/10 text-[#FFEEDD]/80 border border-[#FFEEDD]/20"
                  >
                    {dim}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-[#FFEEDD]/10 rounded-lg transition-all duration-300 hover:rotate-90 group"
              aria-label="关闭"
            >
              <X className="w-6 h-6 text-[#FFEEDD]/80 group-hover:text-[#FFEEDD] group-hover:scale-110 transition-all" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image */}
            <div className="space-y-4">
              {/* 主图片 */}
              <div 
                className={`relative rounded-2xl overflow-hidden border border-[#FFEEDD]/20 group cursor-pointer transition-all duration-500 ${
                  imageExpanded ? 'col-span-2' : ''
                }`}
                onClick={() => setImageExpanded(!imageExpanded)}
                style={{
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
                }}
              >
                {/* 图片 */}
                <div className="relative aspect-[4/5] bg-[#050505]">
                  <img
                    src={visionImage.url}
                    alt={visionImage.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* 悬停光晕 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 展开提示 */}
                  <div className="absolute top-4 right-4 p-2 rounded-lg bg-[#050505]/80 backdrop-blur-sm border border-[#FFEEDD]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-[#FFEEDD]/80" />
                  </div>
                </div>

                {/* 底部信息条 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent">
                  <SensoryIndicator visionImage={visionImage} size="md" />
                </div>
              </div>

              {/* 色彩面板 */}
              <div 
                className="p-4 rounded-xl bg-[#050505]/50 border border-[#FFEEDD]/10"
                style={{
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
                }}
              >
                <h3 className="text-sm text-[#FFEEDD]/60 mb-3">主色调提取</h3>
                <div className="flex items-center gap-2">
                  {visionImage.dominantColors.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className="w-full h-12 rounded-lg border-2 border-[#FFEEDD]/20 transition-transform duration-300 hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <span className="text-xs text-[#FFEEDD]/50 font-mono">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sensory Visualization */}
            <div 
              className="space-y-4"
              style={{
                animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
              }}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#050505]/80 to-[#050505]/60 border border-[#FFEEDD]/10">
                <SensoryVisualization
                  visionImage={visionImage}
                  onSensoryActivate={onSensoryActivate}
                  autoExpand={false}
                />
              </div>
            </div>
          </div>

          {/* 显化建议 */}
          <div 
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#FFB703]/10 to-[#FFB703]/5 border border-[#FFB703]/20"
            style={{
              animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both'
            }}
          >
            <h3 className="flex items-center gap-2 text-lg font-light text-[#FFEEDD] mb-4">
              <Sparkles className="w-5 h-5 text-[#FFB703]" />
              显化实践建议
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#FFEEDD]/80">日常显化</h4>
                <ul className="space-y-1.5 text-sm text-[#FFEEDD]/70">
                  <li>• 每日冥想时调用这个愿景的五感记忆</li>
                  <li>• 在实体空间中重现关键元素（色彩、质感）</li>
                  <li>• 用香薰、音乐等感官工具强化锚点</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#FFEEDD]/80">深化练习</h4>
                <ul className="space-y-1.5 text-sm text-[#FFEEDD]/70">
                  <li>• 创建实体的愿景板，打印此图片</li>
                  <li>• 写下五感体验的详细日记</li>
                  <li>• 定期回顾并更新感官锚点</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

/**
 * 愿景图片缩略卡片 - 用于网格展示
 */
interface VisionImageCardProps {
  visionImage: VisionImage;
  onClick: () => void;
}

export function VisionImageCard({ visionImage, onClick }: VisionImageCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden border border-[#FFEEDD]/10 hover:border-[#FFEEDD]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#FFEEDD]/10"
    >
      {/* 图片 */}
      <div className="relative aspect-[4/5] bg-[#050505] overflow-hidden">
        <img
          src={visionImage.url}
          alt={visionImage.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* 悬停渐变 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* 标题和指示器 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-[#FFEEDD] font-light mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {visionImage.title}
          </h3>
          <SensoryIndicator visionImage={visionImage} size="sm" />
        </div>
      </div>
    </div>
  );
}
