/**
 * 模块详情面板
 * 显示选中显化模块的完整信息，包括五官感知锚点、目标、行动计划
 * 优化版：流畅滑入、渐进式内容展现、微妙动画
 */

import { X, Eye, Ear, Hand, Droplet, Heart, Target, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { ManifestationModule } from '../../lib/manifestationGenerator';

interface Props {
  module: ManifestationModule;
  onClose: () => void;
}

export function ModuleDetailPanel({ module, onClose }: Props) {
  const [expandedSensory, setExpandedSensory] = useState<string | null>(null);
  
  const sensoryIcons = {
    visual: Eye,
    auditory: Ear,
    kinesthetic: Hand,
    olfactory: Droplet,
    emotional: Heart
  };

  const sensoryLabels = {
    visual: '视觉',
    auditory: '听觉',
    kinesthetic: '触觉/动觉',
    olfactory: '嗅觉',
    emotional: '情绪'
  };

  const sensoryColors = {
    visual: '#FF6B9D',
    auditory: '#6BCF7F',
    kinesthetic: '#FFD93D',
    olfactory: '#C9A0DC',
    emotional: '#6EC6FF'
  };

  return (
    <div 
      className="fixed right-0 top-0 h-full w-[420px] bg-[#050505]/95 backdrop-blur-xl border-l border-[#FFEEDD]/20 text-[#FFEEDD] p-6 overflow-y-auto z-50"
      style={{
        animation: 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}
    >
      {/* 背景光晕 */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${module.dimension.color} 0%, transparent 70%)`,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      {/* Header */}
      <div 
        className="relative flex items-start justify-between mb-6"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}
      >
        <div className="flex-1">
          <div 
            className="text-4xl mb-3 inline-block"
            style={{ animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
          >
            {module.dimension.icon}
          </div>
          <h2 className="text-2xl font-light tracking-wide mb-2">{module.dimension.name}</h2>
          <p className="text-sm text-[#FFEEDD]/60 leading-relaxed">{module.dimension.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 hover:bg-[#FFEEDD]/10 rounded-lg transition-all duration-300 hover:rotate-90 group"
          aria-label="关闭面板"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Vision */}
      <div 
        className="mb-6 p-5 rounded-xl bg-gradient-to-br from-[#FFEEDD]/10 to-[#FFEEDD]/5 border border-[#FFEEDD]/20 relative overflow-hidden group hover:border-[#FFEEDD]/40 transition-colors duration-300"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}
      >
        {/* 光晕背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FFEEDD]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h3 className="relative text-sm font-semibold text-[#FFEEDD]/80 mb-3 flex items-center gap-2">
          <span className="text-base">✨</span>
          愿景
        </h3>
        <p className="relative text-[#FFEEDD] leading-relaxed">{module.vision}</p>
      </div>

      {/* Affirmation */}
      <div 
        className="mb-6 p-5 rounded-xl bg-gradient-to-br from-[#FFEEDD]/15 to-[#FFEEDD]/5 border-2 border-[#FFEEDD]/30 relative overflow-hidden group"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}
      >
        {/* 闪光效果 */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFEEDD]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
        />
        
        <p className="relative text-[#FFEEDD] italic text-center leading-relaxed font-light">
          "{module.affirmation}"
        </p>
      </div>

      {/* Sensory Anchors - 优化版 */}
      <div 
        className="mb-6"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}
      >
        <h3 className="text-sm font-semibold text-[#FFEEDD]/80 mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          五感锚点系统
        </h3>
        <div className="space-y-2">
          {(Object.keys(module.sensoryAnchors) as Array<keyof typeof module.sensoryAnchors>).map((key, index) => {
            const Icon = sensoryIcons[key];
            const label = sensoryLabels[key];
            const color = sensoryColors[key];
            const content = module.sensoryAnchors[key];
            const isExpanded = expandedSensory === key;

            return (
              <div
                key={key}
                className="rounded-xl bg-[#050505]/50 border border-[#FFEEDD]/10 hover:border-[#FFEEDD]/30 transition-all duration-300 overflow-hidden"
                style={{ 
                  animation: `fadeInUp 0.4s ease-out ${0.5 + index * 0.05}s both`
                }}
              >
                <button
                  onClick={() => setExpandedSensory(isExpanded ? null : key)}
                  className="w-full p-3 flex items-center gap-3 text-left group/item"
                >
                  <div 
                    className="p-2 rounded-lg transition-all duration-300 group-hover/item:scale-110"
                    style={{ 
                      backgroundColor: `${color}15`,
                      boxShadow: isExpanded ? `0 0 20px ${color}40` : 'none'
                    }}
                  >
                    <Icon 
                      className="w-4 h-4 transition-transform duration-300"
                      style={{ 
                        color,
                        transform: isExpanded ? 'scale(1.2)' : 'scale(1)'
                      }} 
                    />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-[#FFEEDD]/70 group-hover/item:text-[#FFEEDD] transition-colors">
                    {label}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-[#FFEEDD]/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* 展开内容 */}
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isExpanded ? '200px' : '0px',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <p className="px-3 pb-3 text-sm text-[#FFEEDD]/90 leading-relaxed ml-12">
                    {content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goals */}
      <div 
        className="mb-6"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.5s both' }}
      >
        <h3 className="text-sm font-semibold text-[#FFEEDD]/80 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          目标路线图
        </h3>
        <div className="space-y-3">
          {module.goals.map((goal, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gradient-to-br from-[#FFEEDD]/8 to-[#FFEEDD]/3 border border-[#FFEEDD]/10 hover:border-[#FFEEDD]/30 hover:shadow-lg hover:shadow-[#FFEEDD]/5 transition-all duration-300 group/goal"
              style={{ animation: `fadeInUp 0.4s ease-out ${0.6 + index * 0.05}s both` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-[#FFEEDD] group-hover/goal:text-[#FFEEDD] transition-colors">
                  {goal.title}
                </h4>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFEEDD]/15 text-[#FFEEDD]/80 border border-[#FFEEDD]/20 whitespace-nowrap ml-2">
                  {goal.timeline}
                </span>
              </div>
              <p className="text-sm text-[#FFEEDD]/70 leading-relaxed">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div 
        className="mb-6"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}
      >
        <h3 className="text-sm font-semibold text-[#FFEEDD]/80 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          行动清单
        </h3>
        <div className="space-y-2">
          {module.actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-[#FFEEDD]/5 border border-[#FFEEDD]/10 hover:bg-[#FFEEDD]/10 hover:border-[#FFEEDD]/20 transition-all duration-300 group/action cursor-pointer"
              style={{ animation: `fadeInUp 0.3s ease-out ${0.7 + index * 0.03}s both` }}
            >
              <span className="text-sm text-[#FFEEDD] group-hover/action:translate-x-1 transition-transform duration-300">
                {action.title}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFEEDD]/10 text-[#FFEEDD]/70 border border-[#FFEEDD]/10">
                {action.frequency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div 
        className="mt-8 pt-4 border-t border-[#FFEEDD]/10 text-xs text-[#FFEEDD]/50 text-center"
        style={{ animation: 'fadeIn 0.5s ease-out 0.8s both' }}
      >
        <p className="leading-relaxed">点击3D空间中的其他模块查看更多维度</p>
      </div>
    </div>
  );
}