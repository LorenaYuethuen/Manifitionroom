/**
 * 模拟愿景数据 - 10张真实愿景图片的五感锚点拆解
 * 基于Wabi-sabi美学和高敏感友好设计
 */

import type { ManifestationModule } from '../lib/manifestationGenerator';

export interface VisionImage {
  id: string;
  url: string;
  title: string;
  description: string;
  dominantColors: string[];
  dimensions: string[]; // 关联的人生维度
  sensoryProfile: {
    visual: {
      description: string;
      keywords: string[];
      intensity: number; // 0-100
    };
    auditory: {
      description: string;
      keywords: string[];
      intensity: number;
    };
    kinesthetic: {
      description: string;
      keywords: string[];
      intensity: number;
    };
    olfactory: {
      description: string;
      keywords: string[];
      intensity: number;
    };
    emotional: {
      description: string;
      keywords: string[];
      intensity: number;
    };
  };
}

export const mockVisionImages: VisionImage[] = [
  {
    id: 'vision-1',
    url: 'figma:asset/095adfc17c4bfe3e11ba2b5650e7716500f2cf56.png',
    title: '温暖的侘寂居所',
    description: '柔和光影中的木质空间，藤编与负空间的平衡美学',
    dominantColors: ['#C4A57B', '#8B7355', '#F5DEB3'],
    dimensions: ['身心健康', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '侧窗投射的柔和光线在木质地板上形成温暖的色块，天然木纹清晰可见，藤编椅的编织纹理富有层次，负空间营造出呼吸感',
        keywords: ['侧光', '木纹', '藤编', '负空间', '温暖色调'],
        intensity: 75
      },
      auditory: {
        description: '极致的静谧，偶尔传来木质家具的轻微吱呀声，远处若有似无的环境音，像是窗外的风声',
        keywords: ['静谧', '木质摩擦音', '环境音', '风声'],
        intensity: 25
      },
      kinesthetic: {
        description: '温润的木头触感，藤编座椅的粗糙质感，光线投射在皮肤上的温暖感，空间的开阔与自由',
        keywords: ['温润木质', '编织粗糙', '光的温度', '开阔感'],
        intensity: 70
      },
      olfactory: {
        description: '天然木材的清新香气，淡淡的蜡烛余香，干净空气中带有一丝阳光晒过的气味',
        keywords: ['木质香', '蜡烛', '阳光气息'],
        intensity: 55
      },
      emotional: {
        description: '深度的宁静感，归属与安全，简约中的力量，不完美的美',
        keywords: ['宁静', '归属', '简约', '侘寂'],
        intensity: 90
      }
    }
  },
  {
    id: 'vision-2',
    url: 'figma:asset/32ffdb3d2de26c770a00b802dd9b1270ab1b728e.png',
    title: '优雅的慢生活',
    description: '浅杏色调中的从容时光，精致首饰与温热茶饮的仪式感',
    dominantColors: ['#D4C4B0', '#F5F5DC', '#C19A6B'],
    dimensions: ['人际关系', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '柔和的肤色与浅杏色服装形成和谐色调，精致的金色首饰点缀，丝绸面料的光泽流动，白色沙发的纯净感',
        keywords: ['柔和色调', '金属光泽', '丝绸质感', '纯净白'],
        intensity: 80
      },
      auditory: {
        description: '瓷杯与桌面的轻触声，宁静的呼吸节奏，衣物的轻微摩擦，深度的安静',
        keywords: ['瓷器轻响', '呼吸声', '衣物摩擦', '静谧'],
        intensity: 30
      },
      kinesthetic: {
        description: '丝绸般的面料滑过皮肤，温热的杯身在掌心，松弛的坐姿带来的舒适，柔软沙发的包裹感',
        keywords: ['丝绸触感', '温热杯身', '松弛姿态', '柔软包裹'],
        intensity: 85
      },
      olfactory: {
        description: '淡雅的香水气息，温热茶水的清香，干净亚麻的气味,新鲜空气的流动',
        keywords: ['淡香水', '茶香', '亚麻', '清新'],
        intensity: 60
      },
      emotional: {
        description: '从容不迫的优雅，内在的平静与自信，温柔对待自己，慢下来的智慧',
        keywords: ['从容', '优雅', '自信', '温柔', '慢生活'],
        intensity: 95
      }
    }
  },
  {
    id: 'vision-3',
    url: 'figma:asset/2e8d06a77c764fe8bd2ab97efd78e33ca7c55d4a.png',
    title: '咖啡的匠人精神',
    description: '深色调中的专业空间，精密器具与仪式感的完美结合',
    dominantColors: ['#2C2C2C', '#8B7355', '#C0C0C0'],
    dimensions: ['事业成就', '创造表达'],
    sensoryProfile: {
      visual: {
        description: '深炭灰墙面提供沉静背景,专业咖啡机的金属光泽,整齐陈列的器具,木质层架的温暖对比,工业美学的秩序感',
        keywords: ['深色背景', '金属光泽', '整齐陈列', '工业美学'],
        intensity: 90
      },
      auditory: {
        description: '咖啡机的蒸汽嘶嘶声,研磨咖啡豆的嗡鸣,液体流动的声音,器具摆放的轻响,专注时的寂静',
        keywords: ['蒸汽声', '研磨声', '流水声', '专注寂静'],
        intensity: 70
      },
      kinesthetic: {
        description: '冰冷的不锈钢表面,温热的蒸汽,咖啡粉的细腻质感,手柄的重量感,专注操作时的身体记忆',
        keywords: ['金属冰凉', '蒸汽温热', '粉末细腻', '重量感'],
        intensity: 80
      },
      olfactory: {
        description: '浓郁的咖啡香气充满空间,新鲜烘焙豆的香味,木质家具的气息,清洁后的金属味',
        keywords: ['浓郁咖啡', '烘焙香', '木质', '金属清洁'],
        intensity: 95
      },
      emotional: {
        description: '专注与匠心,仪式感带来的满足,对细节的追求,工艺的自豪感',
        keywords: ['专注', '匠心', '仪式感', '自豪'],
        intensity: 88
      }
    }
  },
  {
    id: 'vision-4',
    url: 'figma:asset/fc4feaac402c5494ec3054cbc8b78be70ffd65fc.png',
    title: '都市中的独立',
    description: '街头逆光下的自信姿态,简约黑衣与城市活力的对话',
    dominantColors: ['#1C1C1C', '#A9A9A9', '#F5F5DC'],
    dimensions: ['事业成就', '人际关系'],
    sensoryProfile: {
      visual: {
        description: '自然逆光勾勒出发丝轮廓,简约黑衣的质感,街头的流动与模糊背景,清晨光线的柔和,坚定的眼神',
        keywords: ['逆光轮廓', '黑衣质感', '街头活力', '清晨光'],
        intensity: 85
      },
      auditory: {
        description: '城市的远处喧嚣,脚步声在人行道回响,车辆行驶的白噪音,风拂过耳边,呼吸的节奏',
        keywords: ['城市喧嚣', '脚步声', '车流', '风声'],
        intensity: 65
      },
      kinesthetic: {
        description: '微风拂面的清爽,衣服的轻盈感,行走时的步伐节奏,阳光温暖的触感,身体的力量感',
        keywords: ['微风', '轻盈', '步伐', '力量'],
        intensity: 75
      },
      olfactory: {
        description: '城市清晨的空气,咖啡店飘出的香气,新鲜的气息,远处面包房的烘焙味',
        keywords: ['清晨空气', '咖啡', '新鲜', '烘焙'],
        intensity: 50
      },
      emotional: {
        description: '自信与独立,向前的勇气,融入又独立于城市,清醒的自我意识',
        keywords: ['自信', '独立', '勇气', '清醒'],
        intensity: 92
      }
    }
  },
  {
    id: 'vision-5',
    url: 'figma:asset/ae6e7d8f3c1fb7978b9e2207280700f40f563036.png',
    title: '静谧的内观',
    description: '柔焦光线中的自然妆容,花卉装饰与内在对话',
    dominantColors: ['#F5F5DC', '#D4A373', '#FFEFD5'],
    dimensions: ['精神成长', '身心健康'],
    sensoryProfile: {
      visual: {
        description: '极致柔焦的光线营造梦幻感,自然肤色与奶白背景融合,精致耳环的小巧点缀,黑发与浅色的对比',
        keywords: ['柔焦光线', '自然妆容', '梦幻感', '色彩对比'],
        intensity: 70
      },
      auditory: {
        description: '深度的寂静,轻微的呼吸声,内心对话的声音,远处若有似无的自然音',
        keywords: ['深度寂静', '呼吸', '内心声音', '自然音'],
        intensity: 20
      },
      kinesthetic: {
        description: '柔软丝绸贴合皮肤,耳环的轻微重量,温暖光线的抚触,放松的面部肌肉,深呼吸的舒展',
        keywords: ['丝绸柔软', '首饰重量', '光的温暖', '肌肉放松'],
        intensity: 75
      },
      olfactory: {
        description: '淡淡的花香,自然的气息,干净皮肤的清香,空间的宁静气味',
        keywords: ['花香', '自然', '清香', '宁静'],
        intensity: 45
      },
      emotional: {
        description: '内省与觉察,与自我深度对话,温柔接纳,宁静的力量',
        keywords: ['内省', '觉察', '接纳', '宁静'],
        intensity: 93
      }
    }
  },
  {
    id: 'vision-6',
    url: 'figma:asset/e8d66ea85bbdd5c4fd24a2e8b86c600713bf5836.png',
    title: '陪伴的温柔',
    description: '百叶窗光影下的人猫时光,简单幸福的具象化',
    dominantColors: ['#F5F5DC', '#1C1C1C', '#D3D3D3'],
    dimensions: ['人际关系', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '百叶窗切割的光影几何,黑白对比的宁静美感,猫咪轮廓的柔和线条,书本的存在感,木质地板的纹理',
        keywords: ['光影几何', '黑白对比', '柔和轮廓', '木质纹理'],
        intensity: 80
      },
      auditory: {
        description: '猫咪的轻柔呼噜声,翻书页的沙沙声,静谧空间的回声,偶尔的爪子轻触地板',
        keywords: ['呼噜声', '翻书声', '静谧', '爪子轻触'],
        intensity: 40
      },
      kinesthetic: {
        description: '猫咪柔软的毛发,书页的纸张触感,木地板的温度,盘腿坐姿的舒适,温暖的陪伴感',
        keywords: ['柔软毛发', '纸张', '木板温度', '陪伴'],
        intensity: 90
      },
      olfactory: {
        description: '纸张的香气,安静空间的气味,阳光晒过的温暖,淡淡的木质香',
        keywords: ['纸香', '空间气味', '阳光', '木质'],
        intensity: 55
      },
      emotional: {
        description: '陪伴的温柔,简单的幸福,当下的专注,无条件的爱',
        keywords: ['陪伴', '幸福', '当下', '爱'],
        intensity: 96
      }
    }
  },
  {
    id: 'vision-7',
    url: 'figma:asset/d64f6c36a2045dc5cc1f195d6716b96fa36ef390.png',
    title: '身体的自由',
    description: '地中海光线中的身体解放,蕾丝质感与真实自我',
    dominantColors: ['#FFFFFF', '#F5DEB3', '#C19A6B'],
    dimensions: ['身心健康', '创造表达'],
    sensoryProfile: {
      visual: {
        description: '强烈的自然光线,白色基调的纯净感,蕾丝层次的精致,裸露肌肤的自由,建筑线条的简约',
        keywords: ['强光', '白色纯净', '蕾丝层次', '自由肌肤'],
        intensity: 88
      },
      auditory: {
        description: '衣物轻微的摩擦声,自由的呼吸节奏,空间的开阔回声,远处的自然音',
        keywords: ['衣物摩擦', '自由呼吸', '开阔回声', '自然'],
        intensity: 35
      },
      kinesthetic: {
        description: '蕾丝在皮肤上的触感,身体的自由伸展,温暖地板的接触,解放的姿态,力量与柔美的结合',
        keywords: ['蕾丝触感', '自由伸展', '温暖地板', '力量'],
        intensity: 92
      },
      olfactory: {
        description: '清新的空气流动,蕾丝面料的气味,阳光的温暖气息,自由的气味',
        keywords: ['清新空气', '面料', '阳光', '自由'],
        intensity: 48
      },
      emotional: {
        description: '身体的喜悦,解放与自由,真实展现自我,力量的觉醒',
        keywords: ['喜悦', '解放', '真实', '力量'],
        intensity: 94
      }
    }
  },
  {
    id: 'vision-8',
    url: 'figma:asset/04221af05ef62b41ca771dc4a18c61047203f023.png',
    title: '戏剧性的优雅',
    description: '古典空间中的明暗对比,蕾丝与沉静的内在力量',
    dominantColors: ['#3E2723', '#F5F5DC', '#8D6E63'],
    dimensions: ['创造表达', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '强烈的明暗对比,古典建筑的装饰线条,蕾丝的精致层次,沉静的姿态,戏剧性的光影',
        keywords: ['明暗对比', '古典装饰', '蕾丝精致', '戏剧光影'],
        intensity: 95
      },
      auditory: {
        description: '丝绸的轻微响动,古老空间的回声,深呼吸的节奏,历史的静默',
        keywords: ['丝绸响动', '空间回声', '呼吸', '历史静默'],
        intensity: 30
      },
      kinesthetic: {
        description: '蕾丝的精致触感,木质座椅的温度,沉静坐姿的力量,面料的重量,优雅的身体记忆',
        keywords: ['蕾丝', '木质温度', '沉静力量', '身体记忆'],
        intensity: 85
      },
      olfactory: {
        description: '古典空间的气味,花香的点缀,木质家具的陈年香,时间的气息',
        keywords: ['古典气味', '花香', '木质', '时间'],
        intensity: 65
      },
      emotional: {
        description: '神秘与优雅,内在的力量,戏剧性的美,深度的自我认同',
        keywords: ['神秘', '优雅', '力量', '自我'],
        intensity: 90
      }
    }
  },
  {
    id: 'vision-9',
    url: 'figma:asset/dbec0acd0fe85e0fe010d2db5b0068f99bb74b36.png',
    title: '禅意的生活',
    description: '低矮家具中的东方美学,原木与混凝土的和谐对话',
    dominantColors: ['#A67C52', '#F5DEB3', '#808080'],
    dimensions: ['身心健康', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '大面积原木的温暖,混凝土的质朴,低矮家具的开阔视野,自然光的流动,编织物的纹理,开放空间的呼吸感',
        keywords: ['原木温暖', '混凝土', '低矮开阔', '自然光'],
        intensity: 85
      },
      auditory: {
        description: '深度的静谧,远处自然的声音,呼吸的节奏,偶尔木头的轻响,禅定的寂静',
        keywords: ['深度静谧', '自然音', '呼吸', '禅定'],
        intensity: 25
      },
      kinesthetic: {
        description: '天然木材的温润,编织物的粗糙质感,温暖地板的接触,开阔空间的自由,低矮坐卧的放松',
        keywords: ['木材温润', '编织粗糙', '温暖地板', '放松'],
        intensity: 88
      },
      olfactory: {
        description: '木材的清新香气,混凝土的矿物气息,自然的气味,纯粹的空气',
        keywords: ['木材香', '矿物气息', '自然', '纯粹'],
        intensity: 70
      },
      emotional: {
        description: '禅定与和谐,回归本质,东方智慧,与空间合一',
        keywords: ['禅定', '和谐', '本质', '合一'],
        intensity: 97
      }
    }
  },
  {
    id: 'vision-10',
    url: 'figma:asset/4a4f372e4fd3a685717b20d5ce0f4ebaa7e75ffa.png',
    title: 'Wabi-sabi的居所',
    description: '不完美纹理中的侘寂美学,编织篮与立镜的简约诗意',
    dominantColors: ['#F5DEB3', '#8B7355', '#D2B48C'],
    dimensions: ['身心健康', '精神成长'],
    sensoryProfile: {
      visual: {
        description: '墙面的自然纹理与不完美,编织篮的手工质感,立镜的简约框架,木质的温润色调,侘寂美学的完美呈现',
        keywords: ['不完美纹理', '手工编织', '简约镜框', '侘寂'],
        intensity: 78
      },
      auditory: {
        description: '极致的安静,微风轻响,编织物的轻微摩擦,内心的声音,接纳的寂静',
        keywords: ['极致安静', '微风', '摩擦声', '内心'],
        intensity: 18
      },
      kinesthetic: {
        description: '粗糙墙面的质感,编织物的天然触感,木头的温润,镜面的光滑,不完美的舒适',
        keywords: ['粗糙墙面', '编织触感', '木头温润', '不完美'],
        intensity: 82
      },
      olfactory: {
        description: '天然材料的气息,墙面的矿物味,编织草的香气,简朴的气味,时间的沉淀',
        keywords: ['天然材料', '矿物', '草香', '时间'],
        intensity: 60
      },
      emotional: {
        description: '接纳不完美,质朴的力量,侘寂的智慧,简约中的丰盛',
        keywords: ['接纳', '质朴', '侘寂', '简约丰盛'],
        intensity: 98
      }
    }
  }
];

/**
 * 根据愿景图片生成对应的显化模块
 */
export function generateMockManifestationModules(): ManifestationModule[] {
  return [
    {
      id: '身心健康',
      dimension: {
        name: '身心健康',
        icon: '🌿',
        description: '身心平衡，充满活力，与自然和谐共振',
        color: '#7FB069', // 生命绿
        intensity: 85,
        keywords: ['健康', '活力', '平衡', '自然']
      },
      vision: '建立深度的身心连接，在Wabi-sabi的生活空间中找到内在平静',
      goals: [
        { 
          title: '营造侘寂生活空间', 
          description: '用天然材质和不完美的美学重构居住环境，让空间成为疗愈的容器', 
          timeline: '3个月' 
        },
        { 
          title: '建立身体觉察练习', 
          description: '每日正念呼吸和温和瑜伽，深化与身体的对话', 
          timeline: '6个月' 
        },
        { 
          title: '自然连接仪式', 
          description: '定期在自然中恢复能量，与大地重新建立联系', 
          timeline: '1年' 
        }
      ],
      actions: [
        { title: '晨起5分钟正念呼吸', frequency: '每日' },
        { title: '温润木质空间整理', frequency: '每周' },
        { title: '森林浴或海边漫步', frequency: '每月' }
      ],
      affirmation: '我的身体是神圣的殿堂，我在不完美中看见完整的自己',
      sensoryAnchors: {
        visual: '温暖的侧光洒在木质地板上，藤编的纹理，负空间的呼吸感',
        auditory: '深度的静谧，木头轻微的吱呀声，远处的风声和鸟鸣',
        kinesthetic: '温润木头的触感，编织物的粗糙质感，温暖光线投射在皮肤上',
        olfactory: '天然木材的清新香气，淡淡的蜡烛余香，阳光晒过的气味',
        emotional: '深度宁静，归属与安全，简约中的力量，接纳不完美'
      }
    },
    {
      id: '人际关系',
      dimension: {
        name: '人际关系',
        icon: '💝',
        description: '建立深度连接，与重要的人共创美好',
        color: '#E63946', // 温暖红
        intensity: 78,
        keywords: ['连接', '陪伴', '温柔', '爱']
      },
      vision: '在温柔的陪伴中，创造简单而深刻的幸福时光',
      goals: [
        { 
          title: '高质量的陪伴时光', 
          description: '与爱的人共度无手机的专注时刻，建立深度连接', 
          timeline: '3个月' 
        },
        { 
          title: '建立仪式感的日常', 
          description: '创造共同的慢生活仪式，如一起喝茶、阅读、对话', 
          timeline: '6个月' 
        },
        { 
          title: '无条件的爱与接纳', 
          description: '学会真正的倾听和温柔的表达', 
          timeline: '1年' 
        }
      ],
      actions: [
        { title: '真诚的早安与晚安', frequency: '每日' },
        { title: '共同的慢生活时光', frequency: '每周' },
        { title: '策划特别的相聚', frequency: '每月' }
      ],
      affirmation: '我给予和接收爱的能力不断增长，在陪伴中我看见彼此的光',
      sensoryAnchors: {
        visual: '柔和的肤色与浅杏色调，百叶窗的光影几何，温暖的灯光',
        auditory: '瓷杯轻触的声音，猫咪的呼噜声，宁静的呼吸节奏',
        kinesthetic: '丝绸的触感，温热的杯身，猫咪柔软的毛发，拥抱的温暖',
        olfactory: '淡雅的香水，温热的茶香，纸张的香气，空间的温柔气味',
        emotional: '从容优雅，陪伴的温柔，简单的幸福，无条件的爱'
      }
    },
    {
      id: '事业成就',
      dimension: {
        name: '事业成就',
        icon: '🎯',
        description: '在专业领域建立影响力，实现职业突破',
        color: '#FFB703', // 金色
        intensity: 88,
        keywords: ['匠心', '专注', '卓越', '自信']
      },
      vision: '以匠人精神深耕专业，在都市中保持清醒的独立姿态',
      goals: [
        { 
          title: '建立专业仪式感', 
          description: '像对待一杯咖啡一样对待每个工作细节，追求卓越', 
          timeline: '3个月' 
        },
        { 
          title: '深化核心技能', 
          description: '刻意练习，让专业能力成为竞争优势', 
          timeline: '6个月' 
        },
        { 
          title: '建立个人品牌', 
          description: '在都市中展现独立自信的专业形象', 
          timeline: '1年' 
        }
      ],
      actions: [
        { title: '深度工作时段', frequency: '每日' },
        { title: '技能刻意练习', frequency: '每周' },
        { title: '专业网络拓展', frequency: '每月' }
      ],
      affirmation: '我以匠人之心专注使命，每一步都在创造独特的价值',
      sensoryAnchors: {
        visual: '深色调的专业空间，金属光泽，街头的自然逆光，坚定的眼神',
        auditory: '咖啡机的蒸汽声，研磨豆的声音，城市的活力，专注的寂静',
        kinesthetic: '冰冷的不锈钢，温热的蒸汽，行走的步伐节奏，身体的力量感',
        olfactory: '浓郁的咖啡香，城市清晨的空气，新鲜的气息',
        emotional: '专注匠心，仪式感的满足，自信独立，向前的勇气'
      }
    },
    {
      id: '精神成长',
      dimension: {
        name: '精神成长',
        icon: '🧘',
        description: '深化觉知，与更高的智慧连接',
        color: '#A8DADC', // 宁静蓝
        intensity: 95,
        keywords: ['觉察', '内观', '智慧', '禅定']
      },
      vision: '在侘寂美学中深化内在觉知，与真实的自己对话',
      goals: [
        { 
          title: '建立内观冥想练习', 
          description: '每日静心，培养深度的自我觉察能力', 
          timeline: '3个月' 
        },
        { 
          title: '接纳不完美的智慧', 
          description: '在Wabi-sabi中学习接纳生命的无常与不完美', 
          timeline: '6个月' 
        },
        { 
          title: '活出真实自己', 
          description: '将觉知带入日常，成为觉醒的观察者', 
          timeline: '1年' 
        }
      ],
      actions: [
        { title: '晨间冥想静心', frequency: '每日' },
        { title: '记录内在洞见', frequency: '每周' },
        { title: '参与灵性读书会', frequency: '每月' }
      ],
      affirmation: '我与宇宙的智慧连接，在不完美中看见完美，在当下中看见永恒',
      sensoryAnchors: {
        visual: '柔焦光线的梦幻感，禅意空间的开阔，不完美墙面的纹理，星空的无限',
        auditory: '深度的寂静，内心对话的声音，呼吸的节奏，禅定的静默',
        kinesthetic: '柔软丝绸，放松的肌肉，深呼吸的舒展，粗糙墙面的质感',
        olfactory: '淡淡的花香，木材的香气，香薰的宁静气息，时间的沉淀',
        emotional: '内省觉察，宁静的力量，禅定和谐，接纳不完美的智慧'
      }
    },
    {
      id: '创造表达',
      dimension: {
        name: '创造表达',
        icon: '🎨',
        description: '释放创造力，通过作品表达真实的自己',
        color: '#F72585', // 创造紫红
        intensity: 82,
        keywords: ['创造', '表达', '自由', '力量']
      },
      vision: '在自由的身体表达中，释放真实的创造力与力量',
      goals: [
        { 
          title: '建立创作仪式', 
          description: '像咖啡师对待咖啡一样对待创作，追求精致与自由的平衡', 
          timeline: '3个月' 
        },
        { 
          title: '身体创作练习', 
          description: '通过舞蹈、瑜伽等身体艺术释放创造能量', 
          timeline: '6个月' 
        },
        { 
          title: '完成重要作品', 
          description: '创造具有戏剧性美感和深度的作品', 
          timeline: '1年' 
        }
      ],
      actions: [
        { title: '创意时间块', frequency: '每日' },
        { title: '身体创作练习', frequency: '每周' },
        { title: '艺术展览观摩', frequency: '每月' }
      ],
      affirmation: '我的创造力如泉水般自由流动，在真实表达中我看见自己的力量',
      sensoryAnchors: {
        visual: '戏剧性的明暗对比，蕾丝的精致层次，强烈的自然光，身体的自由线条',
        auditory: '衣物的摩擦声，丝绸的响动，自由的呼吸，创作的寂静',
        kinesthetic: '蕾丝触感，身体的自由伸展，温暖地板，力量与柔美的结合',
        olfactory: '清新的空气，面料的气味，古典空间的花香，自由的气息',
        emotional: '身体的喜悦，解放自由，戏剧性的美，内在力量的觉醒'
      }
    }
  ];
}

/**
 * 获取单个愿景图片的详细数据
 */
export function getVisionImageById(id: string): VisionImage | undefined {
  return mockVisionImages.find(img => img.id === id);
}

/**
 * 根据人生维度筛选愿景图片
 */
export function getVisionImagesByDimension(dimension: string): VisionImage[] {
  return mockVisionImages.filter(img => img.dimensions.includes(dimension));
}

/**
 * 计算五感强度的平均值
 */
export function calculateAverageSensoryIntensity(image: VisionImage): number {
  const { visual, auditory, kinesthetic, olfactory, emotional } = image.sensoryProfile;
  return (visual.intensity + auditory.intensity + kinesthetic.intensity + olfactory.intensity + emotional.intensity) / 5;
}