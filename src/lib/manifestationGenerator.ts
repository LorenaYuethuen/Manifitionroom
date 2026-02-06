/**
 * 显化模块生成器
 * 基于图片分析结果生成具体的人生规划模块
 */

import type { ColorAnalysis, ManifestationDimension } from './imageAnalyzer';

export interface ManifestationModule {
  dimension: ManifestationDimension;
  vision: string; // 愿景描述
  goals: Array<{
    title: string;
    description: string;
    timeline: string; // "3个月" / "6个月" / "1年"
  }>;
  actions: Array<{
    title: string;
    frequency: string; // "每日" / "每周" / "每月"
  }>;
  affirmation: string; // 确认语/显化语句
  // 五官感知锚点系统
  sensoryAnchors: {
    visual: string; // 视觉：色彩、画面、光影
    auditory: string; // 听觉：声音、音乐、节奏
    kinesthetic: string; // 触觉/动觉：质感、温度、身体感受
    olfactory: string; // 嗅觉：气味联想
    emotional: string; // 情绪：核心感受状态
  };
}

/**
 * 为每个维度生成显化模块
 */
export function generateManifestationModules(
  dimensions: ManifestationDimension[],
  colorAnalysis: ColorAnalysis
): ManifestationModule[] {
  return dimensions.map(dimension => {
    const template = getTemplateForDimension(dimension.name);
    const customized = customizeWithColorEnergy(template, colorAnalysis);
    
    return {
      dimension,
      ...customized
    };
  });
}

/**
 * 获取维度的基础模板
 */
function getTemplateForDimension(dimensionName: string) {
  const templates: Record<string, Omit<ManifestationModule, 'dimension'>> = {
    '事业成就': {
      vision: '在专业领域建立影响力，实现职业突破',
      goals: [
        { title: '掌握核心技能', description: '深化专业知识，建立竞争优势', timeline: '3个月' },
        { title: '扩展影响力', description: '建立个人品牌，分享专业价值', timeline: '6个月' },
        { title: '实现关键突破', description: '达成重要里程碑目标', timeline: '1年' }
      ],
      actions: [
        { title: '专注深度工作', frequency: '每日' },
        { title: '记录成长复盘', frequency: '每周' },
        { title: '拓展专业网络', frequency: '每月' }
      ],
      affirmation: '我专注于自己的使命，每一步都在创造价值',
      sensoryAnchors: {
        visual: '金色光芒，象征成功与成就',
        auditory: '胜利的鼓掌声，激励前行',
        kinesthetic: '坚实的步伐，坚定信念',
        olfactory: '新鲜的咖啡香，激发灵感',
        emotional: '自豪感，成就的喜悦'
      }
    },
    '人际关系': {
      vision: '建立深度连接，与重要的人共创美好',
      goals: [
        { title: '深化亲密关系', description: '投入时间和情感，建立信任', timeline: '3个月' },
        { title: '拓展有意义的连接', description: '认识志同道合的伙伴', timeline: '6个月' },
        { title: '创造共同回忆', description: '与爱的人共度特别时光', timeline: '1年' }
      ],
      actions: [
        { title: '真诚表达关心', frequency: '每日' },
        { title: '高质量陪伴时间', frequency: '每周' },
        { title: '策划特别相聚', frequency: '每月' }
      ],
      affirmation: '我给予和接收爱的能力不断增长',
      sensoryAnchors: {
        visual: '温暖的灯光，象征家的温馨',
        auditory: '轻柔的音乐，放松心情',
        kinesthetic: '拥抱的触感，亲密的联系',
        olfactory: '花香，带来愉悦',
        emotional: '爱，连接彼此'
      }
    },
    '身心健康': {
      vision: '身心平衡，充满活力，与自然和谐共振',
      goals: [
        { title: '建立健康习惯', description: '稳定的运动和营养节奏', timeline: '3个月' },
        { title: '深化身心连接', description: '培养正念觉察能力', timeline: '6个月' },
        { title: '达到理想状态', description: '身心能量饱满充盈', timeline: '1年' }
      ],
      actions: [
        { title: '身体活动滋养', frequency: '每日' },
        { title: '正念冥想练习', frequency: '每日' },
        { title: '自然中恢复能量', frequency: '每周' }
      ],
      affirmation: '我的身体是神圣的殿堂，我悉心呵护它',
      sensoryAnchors: {
        visual: '绿色植物，象征生命力',
        auditory: '鸟鸣声，带来宁静',
        kinesthetic: '深呼吸，放松身心',
        olfactory: '泥土的芬芳，连接自然',
        emotional: '平静，内心的宁静'
      }
    },
    '创造表达': {
      vision: '释放创造力，通过作品表达真实的自己',
      goals: [
        { title: '建立创作习惯', description: '让创造成为日常一部分', timeline: '3个月' },
        { title: '完成重要作品', description: '实现一个创意项目', timeline: '6个月' },
        { title: '分享创造价值', description: '让作品触达他人', timeline: '1年' }
      ],
      actions: [
        { title: '创意时间块', frequency: '每日' },
        { title: '技艺刻意练习', frequency: '每周' },
        { title: '灵感采集整理', frequency: '每周' }
      ],
      affirmation: '我的创造力如泉水般自由流动',
      sensoryAnchors: {
        visual: '多彩的画布，象征无限可能',
        auditory: '创作的音乐，激发灵感',
        kinesthetic: '手指在键盘上的触感，创作的喜悦',
        olfactory: '墨香，激发创意',
        emotional: '兴奋，创作的激情'
      }
    },
    '财富丰盛': {
      vision: '建立健康的财富观，让资源自由流动',
      goals: [
        { title: '理清财务状况', description: '建立清晰的财务系统', timeline: '3个月' },
        { title: '创造价值收入', description: '开拓新的收入渠道', timeline: '6个月' },
        { title: '实现财务自由度', description: '达到理想的财务状态', timeline: '1年' }
      ],
      actions: [
        { title: '记录财务流动', frequency: '每日' },
        { title: '提升价值能力', frequency: '每周' },
        { title: '审视财富策略', frequency: '每月' }
      ],
      affirmation: '我值得拥有丰盛，资源自然流向我',
      sensoryAnchors: {
        visual: '金色的硬币，象征财富',
        auditory: '清脆的铃声，象征交易',
        kinesthetic: '触摸硬币的触感，象征财富',
        olfactory: '纸币的香味，象征财富',
        emotional: '满足，财富带来的安全感'
      }
    },
    '精神成长': {
      vision: '深化觉知，与更高的智慧连接',
      goals: [
        { title: '建立灵性练习', description: '找到适合自己的修行方式', timeline: '3个月' },
        { title: '深化内在连接', description: '培养直觉和觉察力', timeline: '6个月' },
        { title: '活出真实自己', description: '将觉知带入日常生活', timeline: '1年' }
      ],
      actions: [
        { title: '冥想静心', frequency: '每日' },
        { title: '记录内在洞见', frequency: '每周' },
        { title: '参与灵性社群', frequency: '每月' }
      ],
      affirmation: '我与宇宙的智慧连接，信任生命的展开',
      sensoryAnchors: {
        visual: '星空，象征无限可能',
        auditory: '冥想的音乐，带来宁静',
        kinesthetic: '冥想的姿势，象征平静',
        olfactory: '香薰的香味，带来宁静',
        emotional: '平静，内心的宁静'
      }
    }
  };
  
  return templates[dimensionName] || templates['事业成就'];
}

/**
 * 基于色彩能量定制模板
 */
function customizeWithColorEnergy(
  template: Omit<ManifestationModule, 'dimension'>,
  colorAnalysis: ColorAnalysis
): Omit<ManifestationModule, 'dimension'> {
  const { emotionalTone } = colorAnalysis;
  const { energy, warmth } = emotionalTone;
  
  // 根据能量水平调整时间线
  let timelineMultiplier = 1;
  if (energy > 70) {
    timelineMultiplier = 0.75; // 高能量 -> 缩短时间
  } else if (energy < 40) {
    timelineMultiplier = 1.5; // 低能量 -> 延长时间
  }
  
  // 根据温度调整语气
  const toneAdjustment = warmth > 50 ? 'warm' : 'cool';
  
  const adjustedGoals = template.goals.map((goal, index) => {
    let adjustedTimeline = goal.timeline;
    if (timelineMultiplier !== 1) {
      const months = parseInt(goal.timeline);
      if (!isNaN(months)) {
        const newMonths = Math.max(1, Math.round(months * timelineMultiplier));
        adjustedTimeline = `${newMonths}个月`;
      } else if (goal.timeline.includes('年')) {
        const years = parseInt(goal.timeline);
        const newMonths = Math.round(years * 12 * timelineMultiplier);
        adjustedTimeline = newMonths >= 12 ? `${Math.round(newMonths / 12)}年` : `${newMonths}个月`;
      }
    }
    
    return {
      ...goal,
      timeline: adjustedTimeline
    };
  });
  
  // 根据温度调整确认语的情感色彩
  let adjustedAffirmation = template.affirmation;
  if (toneAdjustment === 'warm') {
    // 温暖 -> 更情感化的表达
    adjustedAffirmation = adjustedAffirmation.replace(/我/g, '我❤️');
  } else {
    // 冷静 -> 更理性的表达
    adjustedAffirmation = adjustedAffirmation.replace(/每一步/g, '每个选择');
  }
  
  return {
    ...template,
    goals: adjustedGoals,
    affirmation: adjustedAffirmation
  };
}

/**
 * 生成时间轴数据（用于可视化）
 */
export function generateTimeline(modules: ManifestationModule[]) {
  const timeline: Array<{
    month: number;
    items: Array<{
      dimension: string;
      goal: string;
      color: string;
    }>;
  }> = [];
  
  // 初始化12个月
  for (let i = 1; i <= 12; i++) {
    timeline.push({ month: i, items: [] });
  }
  
  // 填充目标到时间轴
  modules.forEach(module => {
    module.goals.forEach(goal => {
      const months = parseTimeline(goal.timeline);
      if (months <= 12) {
        timeline[months - 1].items.push({
          dimension: module.dimension.name,
          goal: goal.title,
          color: module.dimension.color
        });
      }
    });
  });
  
  return timeline;
}

/**
 * 解析时间线字符串为月数
 */
function parseTimeline(timeline: string): number {
  if (timeline.includes('年')) {
    const years = parseInt(timeline);
    return years * 12;
  } else if (timeline.includes('个月')) {
    return parseInt(timeline);
  }
  return 12; // 默认1年
}