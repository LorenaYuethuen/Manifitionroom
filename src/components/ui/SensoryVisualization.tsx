/**
 * 五感可视化交互组件
 * 为愿景图片提供沉浸式的五感锚点展示
 * 支持渐进式展开、交互激活、强度可视化
 */

import { useState, useEffect } from 'react';
import { Eye, Ear, Hand, Droplet, Heart, Sparkles } from 'lucide-react';
import type { VisionImage } from '../../data/mockVisionData';

interface SensoryVisualizationProps {
  visionImage: VisionImage;
  onSensoryActivate?: (sensory: string) => void;
  autoExpand?: boolean;
}

export function SensoryVisualization({ 
  visionImage, 
  onSensoryActivate,
  autoExpand = false 
}: SensoryVisualizationProps) {
  const [activeSensory, setActiveSensory] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(false);
  const [progressiveIndex, setProgressiveIndex] = useState(-1);

  const sensoryTypes = ['visual', 'auditory', 'kinesthetic', 'olfactory', 'emotional'] as const;
  
  const sensoryConfig = {
    visual: {
      icon: Eye,
      label: '视觉',
      color: '#FFEEDD',
      gradient: 'from-[#FFEEDD]/20 to-[#FFEEDD]/5',
      description: '色彩、光影、质感的视觉记忆'
    },
    auditory: {
      icon: Ear,
      label: '听觉',
      color: '#A8DADC',
      gradient: 'from-[#A8DADC]/20 to-[#A8DADC]/5',
      description: '声音、节奏、静谧的听觉锚点'
    },
    kinesthetic: {
      icon: Hand,
      label: '触觉/动觉',
      color: '#F72585',
      gradient: 'from-[#F72585]/20 to-[#F72585]/5',
      description: '触感、温度、身体记忆'
    },
    olfactory: {
      icon: Droplet,
      label: '嗅觉',
      color: '#7FB069',
      gradient: 'from-[#7FB069]/20 to-[#7FB069]/5',
      description: '气味、香气、嗅觉联想'
    },
    emotional: {
      icon: Heart,
      label: '情绪',
      color: '#FFB703',
      gradient: 'from-[#FFB703]/20 to-[#FFB703]/5',
      description: '核心感受状态、情绪锚点'
    }
  };

  // 渐进式展开动画
  useEffect(() => {
    if (!autoExpand) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setProgressiveIndex(index);
      index++;
      if (index >= sensoryTypes.length) {
        clearInterval(interval);
        setExpandedAll(true);
      }
    }, 600); // 每600ms展开一个

    return () => clearInterval(interval);
  }, [autoExpand]);

  const handleSensoryClick = (sensory: string) => {
    setActiveSensory(activeSensory === sensory ? null : sensory);
    onSensoryActivate?.(sensory);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-lg font-light text-[#FFEEDD]">
          <Sparkles className="w-5 h-5 text-[#FFB703]" />
          五感显化锚点
        </h3>
        <button
          onClick={() => setExpandedAll(!expandedAll)}
          className="px-3 py-1.5 text-xs rounded-lg bg-[#FFEEDD]/10 hover:bg-[#FFEEDD]/20 text-[#FFEEDD]/80 hover:text-[#FFEEDD] transition-all duration-300 border border-[#FFEEDD]/20"
        >
          {expandedAll ? '收起全部' : '展开全部'}
        </button>
      </div>

      {/* 整体感官强度雷达 */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#050505]/80 to-[#050505]/60 border border-[#FFEEDD]/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#FFEEDD]/60">整体感官强度</span>
          <span className="text-sm text-[#FFEEDD]/80">
            {Math.round(
              (visionImage.sensoryProfile.visual.intensity +
                visionImage.sensoryProfile.auditory.intensity +
                visionImage.sensoryProfile.kinesthetic.intensity +
                visionImage.sensoryProfile.olfactory.intensity +
                visionImage.sensoryProfile.emotional.intensity) / 5
            )}%
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sensoryTypes.map((type) => {
            const intensity = visionImage.sensoryProfile[type].intensity;
            const config = sensoryConfig[type];
            return (
              <div key={type} className="flex flex-col items-center gap-1">
                <div 
                  className="w-full h-20 rounded-lg bg-[#050505]/50 border border-[#FFEEDD]/10 relative overflow-hidden"
                  style={{
                    boxShadow: activeSensory === type ? `0 0 20px ${config.color}40` : 'none'
                  }}
                >
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${config.gradient} transition-all duration-500`}
                    style={{
                      height: `${intensity}%`,
                      backgroundColor: `${config.color}20`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <config.icon 
                      className="w-4 h-4 transition-all duration-300"
                      style={{ 
                        color: config.color,
                        opacity: intensity / 100,
                        transform: activeSensory === type ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#FFEEDD]/50">{intensity}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 五感详细展开卡片 */}
      <div className="space-y-2">
        {sensoryTypes.map((type, index) => {
          const sensory = visionImage.sensoryProfile[type];
          const config = sensoryConfig[type];
          const Icon = config.icon;
          const isExpanded = expandedAll || activeSensory === type || progressiveIndex >= index;
          const intensity = sensory.intensity;

          return (
            <div
              key={type}
              className="rounded-xl bg-[#050505]/50 border border-[#FFEEDD]/10 hover:border-[#FFEEDD]/30 transition-all duration-300 overflow-hidden group/card"
              style={{
                opacity: progressiveIndex >= index || !autoExpand ? 1 : 0,
                transform: progressiveIndex >= index || !autoExpand ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {/* Header */}
              <button
                onClick={() => handleSensoryClick(type)}
                className="w-full p-4 flex items-center gap-3 text-left group/button"
              >
                {/* Icon with glow */}
                <div 
                  className="relative p-2.5 rounded-lg transition-all duration-300 group-hover/button:scale-110"
                  style={{ 
                    backgroundColor: `${config.color}15`,
                    boxShadow: activeSensory === type ? `0 0 25px ${config.color}40, inset 0 0 15px ${config.color}20` : 'none'
                  }}
                >
                  {/* 呼吸光晕 */}
                  {activeSensory === type && (
                    <div 
                      className="absolute inset-0 rounded-lg animate-ping"
                      style={{ backgroundColor: `${config.color}30` }}
                    />
                  )}
                  <Icon 
                    className="relative w-5 h-5 transition-transform duration-300"
                    style={{ 
                      color: config.color,
                      transform: activeSensory === type ? 'rotate(360deg) scale(1.2)' : 'rotate(0deg)'
                    }} 
                  />
                </div>

                {/* Label and intensity */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#FFEEDD]/80 group-hover/button:text-[#FFEEDD] transition-colors">
                      {config.label}
                    </span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${config.color}10`,
                        borderColor: `${config.color}30`,
                        color: config.color
                      }}
                    >
                      强度 {intensity}%
                    </span>
                  </div>
                  <p className="text-xs text-[#FFEEDD]/50">
                    {config.description}
                  </p>
                </div>

                {/* Expand indicator */}
                <div 
                  className="text-[#FFEEDD]/40 transition-transform duration-300"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  ▼
                </div>
              </button>

              {/* Expanded content */}
              <div 
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: isExpanded ? '500px' : '0px',
                  opacity: isExpanded ? 1 : 0
                }}
              >
                <div className="px-4 pb-4 space-y-3">
                  {/* Description */}
                  <div 
                    className="p-3 rounded-lg bg-gradient-to-br border"
                    style={{
                      background: `linear-gradient(135deg, ${config.color}10 0%, ${config.color}05 100%)`,
                      borderColor: `${config.color}20`
                    }}
                  >
                    <p className="text-sm text-[#FFEEDD]/90 leading-relaxed">
                      {sensory.description}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">关键词标签</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sensory.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs border transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: `${config.color}10`,
                            borderColor: `${config.color}25`,
                            color: `${config.color}`,
                            animation: `fadeInScale 0.3s ease-out ${i * 0.05}s both`
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Intensity bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#FFEEDD]/50 mb-1.5">
                      <span>感官强度</span>
                      <span>{intensity}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#050505]/50 border border-[#FFEEDD]/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{
                          width: `${intensity}%`,
                          backgroundColor: config.color,
                          boxShadow: `0 0 10px ${config.color}60`
                        }}
                      >
                        {/* 流光动画 */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          style={{
                            animation: 'shimmer 2s ease-in-out infinite'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS动画定义 */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * 简化版五感指示器 - 用于卡片预览
 */
interface SensoryIndicatorProps {
  visionImage: VisionImage;
  size?: 'sm' | 'md' | 'lg';
}

export function SensoryIndicator({ visionImage, size = 'sm' }: SensoryIndicatorProps) {
  const sensoryTypes = ['visual', 'auditory', 'kinesthetic', 'olfactory', 'emotional'] as const;
  
  const sensoryColors = {
    visual: '#FFEEDD',
    auditory: '#A8DADC',
    kinesthetic: '#F72585',
    olfactory: '#7FB069',
    emotional: '#FFB703'
  };

  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className="flex items-center gap-1.5">
      {sensoryTypes.map((type) => {
        const intensity = visionImage.sensoryProfile[type].intensity;
        const color = sensoryColors[type];
        
        return (
          <div
            key={type}
            className={`rounded-full transition-all duration-300 ${sizeClasses[size]}`}
            style={{
              backgroundColor: color,
              opacity: intensity / 100,
              boxShadow: intensity > 70 ? `0 0 8px ${color}60` : 'none'
            }}
            title={`${type}: ${intensity}%`}
          />
        );
      })}
    </div>
  );
}
