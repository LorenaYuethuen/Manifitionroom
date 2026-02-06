/**
 * 图片上传组件
 * 支持拖拽上传和点击选择，自动触发AI分析
 * 优化版：增强微交互、呼吸动画、流畅反馈
 */

import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, X, Loader2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { analyzeImageEmotion, mapColorToDimensions } from '../../lib/imageAnalyzer';
import { generateManifestationModules } from '../../lib/manifestationGenerator';
import { toast } from 'sonner@2.0.3';

export function ImageUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadedImages = useAppStore((state) => state.uploadedImages);
  const addUploadedImage = useAppStore((state) => state.addUploadedImage);
  const removeUploadedImage = useAppStore((state) => state.removeUploadedImage);
  const setManifestationModules = useAppStore((state) => state.setManifestationModules);
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const setIsAnalyzing = useAppStore((state) => state.setIsAnalyzing);

  const processImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    const url = URL.createObjectURL(file);
    addUploadedImage({ url, file });

    // 开始分析，带进度动画
    setIsAnalyzing(true);
    setUploadProgress(0);
    toast.info('正在分析图片的色彩与情感...');

    try {
      // 模拟进度增长
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 15, 85));
      }, 200);

      // 色彩分析
      const colorAnalysis = await analyzeImageEmotion(url);
      setUploadProgress(90);
      
      // 映射人生维度
      const dimensions = mapColorToDimensions(colorAnalysis);
      
      // 生成显化模块
      const modules = generateManifestationModules(dimensions, colorAnalysis);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setManifestationModules(modules);
        
        toast.success(`✨ 已生成 ${modules.length} 个显化维度`, {
          description: dimensions.map(d => d.icon + ' ' + d.name).join(' · ')
        });
      }, 300);
    } catch (error) {
      console.error('图片分析失败:', error);
      toast.error('图片分析失败，请重试');
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setUploadProgress(0);
      }, 500);
    }
  }, [addUploadedImage, setManifestationModules, setIsAnalyzing]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  return (
    <div className="space-y-4">
      {/* 上传区域 - 优化版 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed
          transition-all duration-500 ease-out
          ${isDragging 
            ? 'border-[#FFEEDD] bg-gradient-to-br from-[#FFEEDD]/10 to-[#FFEEDD]/5 scale-[1.02] shadow-lg shadow-[#FFEEDD]/20' 
            : 'border-[#FFEEDD]/20 hover:border-[#FFEEDD]/40 hover:shadow-md hover:shadow-[#FFEEDD]/10'
          }
          ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          group
        `}
        style={{
          animation: !isAnalyzing && !isDragging ? 'breathe 4s ease-in-out infinite' : undefined
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isAnalyzing}
        />
        
        {/* 背景光晕效果 */}
        <div className="absolute inset-0 bg-gradient-radial from-[#FFEEDD]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative p-8 text-center">
          <div className="flex justify-center mb-4 relative">
            {isAnalyzing ? (
              <div className="relative">
                <Sparkles className="w-12 h-12 text-[#FFEEDD] animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="w-12 h-12 text-[#FFEEDD] opacity-30" />
                </div>
              </div>
            ) : (
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-12 h-12 text-[#FFEEDD]/60 group-hover:text-[#FFEEDD]/90 transition-colors" />
                {/* 环绕光圈 */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FFEEDD]/20 group-hover:scale-125 transition-transform duration-500" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg mb-2 text-[#FFEEDD] font-light tracking-wide">
            {isAnalyzing ? '正在解析愿景...' : '上传你的愿景图片'}
          </h3>
          
          <p className="text-sm text-[#FFEEDD]/60 leading-relaxed">
            {isAnalyzing 
              ? 'AI正在分析色彩情感，提取深层意义...'
              : '拖拽图片到此处，或点击选择文件'
            }
          </p>
          
          {/* 进度条 - 优化版 */}
          {isAnalyzing && (
            <div className="mt-6 space-y-2">
              <div className="w-full h-1.5 bg-[#FFEEDD]/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFEEDD]/50 via-[#FFEEDD] to-[#FFEEDD]/50 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {/* 流光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <p className="text-xs text-[#FFEEDD]/40">{Math.round(uploadProgress)}% 完成</p>
            </div>
          )}
        </div>
      </div>

      {/* 已上传图片预览 - 优化版 */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {uploadedImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group rounded-xl overflow-hidden border border-[#FFEEDD]/20 hover:border-[#FFEEDD]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFEEDD]/10 hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* 图片容器 */}
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt="上传的愿景图片"
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* 删除按钮 - 优化版 */}
              <button
                onClick={() => {
                  removeUploadedImage(image.id);
                  URL.revokeObjectURL(image.url);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-[#050505]/90 text-[#FFEEDD] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FFEEDD]/10 hover:scale-110 backdrop-blur-sm"
                aria-label="删除图片"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              
              {/* 分析状态标签 */}
              {image.analyzedAt && (
                <div className="absolute bottom-2 left-2 px-2.5 py-1.5 rounded-lg bg-[#050505]/90 backdrop-blur-sm text-[#FFEEDD] text-xs flex items-center gap-1.5 border border-[#FFEEDD]/20">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span className="font-medium">已分析</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}