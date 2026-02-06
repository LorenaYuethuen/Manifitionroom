/**
 * 图片色彩分析和情感映射系统
 * 基于色彩心理学提取图片的深层情感特征
 */

export interface ColorAnalysis {
  dominantColors: Array<{
    rgb: [number, number, number];
    hsl: [number, number, number];
    percentage: number;
  }>;
  emotionalTone: {
    energy: number; // 0-100: 饱和度和明度的综合
    warmth: number; // -100 到 100: 冷暖色调
    depth: number; // 0-100: 明暗对比度
  };
  dominantHue: number; // 0-360: 主色相
  vibrance: number; // 0-100: 整体鲜艳度
}

export interface ManifestationDimension {
  name: string;
  icon: string;
  color: string;
  description: string;
  keywords: string[];
}

/**
 * 从图片提取主色调
 */
export async function extractDominantColors(
  imageUrl: string,
  numColors: number = 5
): Promise<ColorAnalysis['dominantColors']> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('无法创建canvas上下文'));
        return;
      }
      
      // 缩小图片以提高性能
      const scaleFactor = 0.2;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // 使用颜色聚类算法（简化版K-means）
      const colorCounts = new Map<string, { rgb: [number, number, number]; count: number }>();
      
      // 采样像素（每10个像素采样1个）
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        
        // 忽略透明像素
        if (a < 128) continue;
        
        // 量化颜色到32级以减少噪声
        const quantize = (val: number) => Math.round(val / 32) * 32;
        const key = `${quantize(r)},${quantize(g)},${quantize(b)}`;
        
        const existing = colorCounts.get(key);
        if (existing) {
          existing.count++;
        } else {
          colorCounts.set(key, { rgb: [quantize(r), quantize(g), quantize(b)], count: 1 });
        }
      }
      
      // 排序并取前N个颜色
      const sortedColors = Array.from(colorCounts.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, numColors);
      
      const totalCount = sortedColors.reduce((sum, c) => sum + c.count, 0);
      
      const dominantColors = sortedColors.map(({ rgb, count }) => ({
        rgb,
        hsl: rgbToHsl(rgb[0], rgb[1], rgb[2]),
        percentage: (count / totalCount) * 100
      }));
      
      resolve(dominantColors);
    };
    
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = imageUrl;
  });
}

/**
 * RGB转HSL
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return [h * 360, s * 100, l * 100];
}

/**
 * 分析图片的情感特征
 */
export async function analyzeImageEmotion(imageUrl: string): Promise<ColorAnalysis> {
  const dominantColors = await extractDominantColors(imageUrl, 5);
  
  // 计算平均色相（主色调）
  let avgHue = 0;
  let avgSat = 0;
  let avgLight = 0;
  
  dominantColors.forEach(({ hsl, percentage }) => {
    avgHue += hsl[0] * (percentage / 100);
    avgSat += hsl[1] * (percentage / 100);
    avgLight += hsl[2] * (percentage / 100);
  });
  
  // 计算冷暖度（基于色相）
  // 红-橙-黄（0-60）和红-品红（300-360）为暖色
  // 蓝-青-绿（120-270）为冷色
  let warmth = 0;
  if (avgHue <= 60 || avgHue >= 300) {
    warmth = 100 - Math.min(avgHue, 360 - avgHue); // 接近红色越暖
  } else if (avgHue >= 120 && avgHue <= 270) {
    warmth = -(avgHue - 195) * (100 / 75); // 接近青色越冷
  } else {
    warmth = avgHue < 120 ? 50 - (avgHue - 60) : -50 + (300 - avgHue);
  }
  warmth = Math.max(-100, Math.min(100, warmth));
  
  // 计算能量（饱和度 + 明度的综合）
  const energy = (avgSat + (avgLight > 50 ? (100 - avgLight) : avgLight)) / 2;
  
  // 计算深度（明暗对比）
  const lightnesses = dominantColors.map(c => c.hsl[2]);
  const maxLight = Math.max(...lightnesses);
  const minLight = Math.min(...lightnesses);
  const depth = maxLight - minLight;
  
  return {
    dominantColors,
    emotionalTone: {
      energy: Math.round(energy),
      warmth: Math.round(warmth),
      depth: Math.round(depth)
    },
    dominantHue: Math.round(avgHue),
    vibrance: Math.round(avgSat)
  };
}

/**
 * 基于色彩分析映射人生维度
 */
export function mapColorToDimensions(analysis: ColorAnalysis): ManifestationDimension[] {
  const { dominantHue, emotionalTone } = analysis;
  const { energy, warmth, depth } = emotionalTone;
  
  const allDimensions: ManifestationDimension[] = [
    {
      name: '事业成就',
      icon: '🎯',
      color: '#FF6B6B',
      description: '职业发展与专业成就',
      keywords: ['目标', '行动', '专注', '突破']
    },
    {
      name: '人际关系',
      icon: '💝',
      color: '#FFB6C1',
      description: '情感连接与社交网络',
      keywords: ['爱', '连接', '温暖', '理解']
    },
    {
      name: '身心健康',
      icon: '🌿',
      color: '#98D8C8',
      description: '身体活力与心理平衡',
      keywords: ['平衡', '活力', '宁静', '滋养']
    },
    {
      name: '创造表达',
      icon: '🎨',
      color: '#FFD93D',
      description: '艺术创作与自我表达',
      keywords: ['创造', '灵感', '表达', '美']
    },
    {
      name: '财富丰盛',
      icon: '💎',
      color: '#C9A0DC',
      description: '物质丰盛与资源流动',
      keywords: ['丰盛', '流动', '价值', '富足']
    },
    {
      name: '精神成长',
      icon: '✨',
      color: '#6C5CE7',
      description: '内在智慧与灵性觉醒',
      keywords: ['觉知', '智慧', '超越', '合一']
    }
  ];
  
  // 根据色彩特征选择最匹配的3-4个维度
  const selectedDimensions: ManifestationDimension[] = [];
  
  // 基于色相选择维度
  if (dominantHue >= 0 && dominantHue < 30 || dominantHue >= 330) {
    // 红色系 -> 事业、人际
    selectedDimensions.push(allDimensions[0], allDimensions[1]);
  } else if (dominantHue >= 30 && dominantHue < 90) {
    // 黄-橙色系 -> 创造、财富
    selectedDimensions.push(allDimensions[3], allDimensions[4]);
  } else if (dominantHue >= 90 && dominantHue < 150) {
    // 绿色系 -> 健康、精神
    selectedDimensions.push(allDimensions[2], allDimensions[5]);
  } else if (dominantHue >= 150 && dominantHue < 270) {
    // 蓝-青色系 -> 精神、健康
    selectedDimensions.push(allDimensions[5], allDimensions[2]);
  } else {
    // 紫色系 -> 精神、创造
    selectedDimensions.push(allDimensions[5], allDimensions[3]);
  }
  
  // 基于能量和温度补充维度
  if (energy > 70 && !selectedDimensions.includes(allDimensions[0])) {
    selectedDimensions.push(allDimensions[0]); // 高能量 -> 事业
  }
  if (warmth > 50 && !selectedDimensions.includes(allDimensions[1])) {
    selectedDimensions.push(allDimensions[1]); // 温暖 -> 人际
  }
  if (depth < 30 && !selectedDimensions.includes(allDimensions[2])) {
    selectedDimensions.push(allDimensions[2]); // 低对比 -> 健康
  }
  
  // 确保至少有3个维度
  while (selectedDimensions.length < 3) {
    const remaining = allDimensions.filter(d => !selectedDimensions.includes(d));
    if (remaining.length > 0) {
      selectedDimensions.push(remaining[0]);
    } else {
      break;
    }
  }
  
  return selectedDimensions.slice(0, 4); // 最多返回4个维度
}
