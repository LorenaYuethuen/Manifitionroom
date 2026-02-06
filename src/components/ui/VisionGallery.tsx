/**
 * 愿景画廊
 * 以优雅的网格布局展示所有愿景图片
 * 支持筛选、搜索、查看详情
 */

import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { mockVisionImages } from '../../data/mockVisionData';
import type { VisionImage } from '../../data/mockVisionData';
import { VisionImageCard } from './VisionImageViewer';
import { VisionImageViewer } from './VisionImageViewer';

interface VisionGalleryProps {
  onSensoryActivate?: (sensory: string, visionId: string) => void;
}

export function VisionGallery({ onSensoryActivate }: VisionGalleryProps) {
  const [selectedVision, setSelectedVision] = useState<VisionImage | null>(null);
  const [filterDimension, setFilterDimension] = useState<string>('全部');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 获取所有维度
  const allDimensions = ['全部', ...Array.from(
    new Set(mockVisionImages.flatMap(img => img.dimensions))
  )];

  // 筛选图片
  const filteredImages = filterDimension === '全部'
    ? mockVisionImages
    : mockVisionImages.filter(img => img.dimensions.includes(filterDimension));

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-light text-[#FFEEDD] mb-2">
              愿景画廊
            </h1>
            <p className="text-[#FFEEDD]/60">
              探索{mockVisionImages.length}个精心拆解的五感显化锚点
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#050505]/50 border border-[#FFEEDD]/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[#FFEEDD]/20 text-[#FFEEDD]'
                  : 'text-[#FFEEDD]/50 hover:text-[#FFEEDD]/80'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-[#FFEEDD]/20 text-[#FFEEDD]'
                  : 'text-[#FFEEDD]/50 hover:text-[#FFEEDD]/80'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-[#FFEEDD]/50" />
          <span className="text-sm text-[#FFEEDD]/50">维度筛选:</span>
          {allDimensions.map((dimension) => (
            <button
              key={dimension}
              onClick={() => setFilterDimension(dimension)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 border ${
                filterDimension === dimension
                  ? 'bg-[#FFEEDD]/20 text-[#FFEEDD] border-[#FFEEDD]/30'
                  : 'bg-[#050505]/30 text-[#FFEEDD]/60 border-[#FFEEDD]/10 hover:bg-[#FFEEDD]/10 hover:text-[#FFEEDD]/80'
              }`}
            >
              {dimension}
              {dimension !== '全部' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({mockVisionImages.filter(img => img.dimensions.includes(dimension)).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((vision, index) => (
              <div
                key={vision.id}
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s both`
                }}
              >
                <VisionImageCard
                  visionImage={vision}
                  onClick={() => setSelectedVision(vision)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredImages.map((vision, index) => (
              <div
                key={vision.id}
                onClick={() => setSelectedVision(vision)}
                className="flex gap-4 p-4 rounded-xl bg-[#050505]/50 border border-[#FFEEDD]/10 hover:border-[#FFEEDD]/30 transition-all duration-300 cursor-pointer group"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s both`
                }}
              >
                <div className="w-32 h-40 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={vision.url}
                    alt={vision.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-light text-[#FFEEDD] mb-2 group-hover:text-[#FFB703] transition-colors">
                    {vision.title}
                  </h3>
                  <p className="text-sm text-[#FFEEDD]/60 mb-3 line-clamp-2">
                    {vision.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {vision.dimensions.map((dim, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-[#FFEEDD]/10 text-[#FFEEDD]/70 border border-[#FFEEDD]/20"
                      >
                        {dim}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#FFEEDD]/50">
              没有找到匹配的愿景图片
            </p>
          </div>
        )}
      </div>

      {/* Vision Detail Viewer */}
      {selectedVision && (
        <VisionImageViewer
          visionImage={selectedVision}
          onClose={() => setSelectedVision(null)}
          onSensoryActivate={(sensory) => 
            onSensoryActivate?.(sensory, selectedVision.id)
          }
        />
      )}

      <style jsx>{`
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
