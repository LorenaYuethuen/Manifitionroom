/**
 * SOP显化系统数据
 * 将愿景图片映射到可执行的SOP框架和现实行动计划
 */

export interface SOPModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  tasks: SOPTask[];
}

export interface SOPTask {
  title: string;
  description: string;
  frequency?: string;
  timeline?: string;
  completed?: boolean;
}

export interface DailyRoutine {
  timeRange: string;
  activities: {
    time: string;
    action: string;
    sensoryFocus?: string;
  }[];
}

export interface ManifestationPath {
  visionImageId: string;
  
  // AI视觉分析结果
  visualDNA: {
    colorPalette: string[];
    materials: string[];
    lighting: string;
    spatialFeeling?: string;
    emotionalCore: string[];
    archetype: string;
  };
  
  // 生活方式推断
  lifestyleInference: {
    pace: string;
    values: string[];
    dailyRituals: string[];
  };
  
  // SOP自动映射
  sopMapping: {
    dailyRoutine?: DailyRoutine;
    inventoryManagement?: SOPTask[];
    bodyManagement?: SOPTask[];
    spaceManagement?: SOPTask[];
    habitTracking?: SOPTask[];
    knowledgeManagement?: SOPTask[];
    creativeSystem?: SOPTask[];
    relationshipManagement?: SOPTask[];
    financialManagement?: SOPTask[];
  };
  
  // 现实行动计划（30天）
  manifestationPlan: {
    week1: {
      focus: string;
      actions: string[];
    };
    week2: {
      focus: string;
      actions: string[];
    };
    week3: {
      focus: string;
      actions: string[];
    };
    week4: {
      focus: string;
      actions: string[];
    };
  };
  
  // 五感触发器（3D空间实现）
  sensoryTriggers: {
    visual: {
      description: string;
      implementation: string; // 如何在3D中实现
    };
    auditory: {
      description: string;
      implementation: string;
    };
    olfactory: {
      description: string;
      implementation: string; // 现实提示
    };
    kinesthetic: {
      description: string;
      implementation: string;
    };
    taste?: {
      description: string;
      implementation: string;
    };
  };
  
  // 每日显化提示
  dailyPrompts: string[];
}

/**
 * 基于用户上传的8张图片的深度分析数据
 */
export const manifestationPaths: ManifestationPath[] = [
  // 图片1 & 3: Mediterranean Elegance
  {
    visionImageId: 'mediterranean-elegance',
    visualDNA: {
      colorPalette: ['#F5F0E8', '#8B6F47', '#FFFFFF', '#2C2420'],
      materials: ['terra_cotta_floor', 'raw_concrete_ceiling', 'linen_fabric', 'vintage_wood'],
      lighting: 'golden_hour_diffused_through_windows',
      spatialFeeling: 'expansive_yet_intimate',
      emotionalCore: ['confident', 'sensual', 'unhurried', 'theatrical'],
      archetype: 'Mediterranean_muse_living_in_historical_architecture'
    },
    lifestyleInference: {
      pace: 'slow mornings (9-11am起床) → 下午创作/社交 → 深夜独处时间',
      values: ['美即是日常', '身体即艺术品', '空间即舞台'],
      dailyRituals: [
        '赤脚在冰凉地板上行走(接地气)',
        '穿着宽松亚麻衣物做瑜伽',
        '在自然光下阅读/写作',
        '低照明下独自用餐(烛光)'
      ]
    },
    sopMapping: {
      dailyRoutine: {
        timeRange: '晨间增强',
        activities: [
          { time: '06:30-07:00', action: '赤脚行走冥想(连接大地能量)', sensoryFocus: '触觉' },
          { time: '07:00-07:30', action: '在自然光下做流瑜伽(focus on 身体线条延展)', sensoryFocus: '视觉+触觉' },
          { time: '穿着', action: '亚麻/棉质宽松衣物(白色/米色)' }
        ]
      },
      inventoryManagement: [
        { title: '清理所有塑料/现代感过强的物品', timeline: '本周' },
        { title: '购买亚麻床品(白色/米色)', timeline: '本周' },
        { title: '购买陶土花盆 × 3', timeline: '2周内' },
        { title: '购买老式木椅(藤编或实木)', timeline: '1个月' },
        { title: '购买黄铜/铁艺烛台', timeline: '1个月' }
      ],
      bodyManagement: [
        { title: '每日练习"有意识的站姿"', description: '想象头顶有线拉着', frequency: '每日' },
        { title: '普拉提核心训练', frequency: '3次/周' },
        { title: '记录身体感受日记', description: '如何穿衣时感受到织物质感', frequency: '每日' }
      ],
      creativeSystem: [
        { title: '拍摄"光影私人时刻"', description: '模仿电影感构图', frequency: '每周' },
        { title: '研究摄影大师风格', description: 'Helmut Newton / Peter Lindbergh' }
      ]
    },
    manifestationPlan: {
      week1: {
        focus: '空间清理',
        actions: [
          '移除所有"快时尚"痕迹(塑料收纳盒/IKEA家具)',
          '只保留天然材质物品',
          '开始每日赤脚行走15分钟'
        ]
      },
      week2: {
        focus: '身体重塑',
        actions: [
          '开始普拉提课程',
          '每日身体觉察日记',
          '购买第一套亚麻睡衣'
        ]
      },
      week3: {
        focus: '日常仪式化',
        actions: [
          '晨间瑜伽固定在自然光下进行',
          '尝试低照明晚餐',
          '每日有意识的站姿练习'
        ]
      },
      week4: {
        focus: '美学内化',
        actions: [
          '拍摄一组个人"光影肖像"',
          '在MANIFESTATION ROOM中对比虚拟场景 vs 现实进展',
          '邀请朋友来家中感受新空间'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '虚拟空间重建地中海风格房间,金色阳光透过窗户',
        implementation: '3D建模房间 + 实时光影系统 + 用户可在VR中"走进去"'
      },
      auditory: {
        description: '远处教堂钟声 + 轻微脚步声回响 + 亚麻衣物摩擦声',
        implementation: 'WebAudio API空间音频 + 循环播放环境音'
      },
      olfactory: {
        description: '无花果香薰 + 老木头气味',
        implementation: '文字提示 + 购物清单: "建议准备无花果精油扩香仪"'
      },
      kinesthetic: {
        description: '冰凉的陶土地板触感 + 亚麻布料滑过皮肤',
        implementation: 'VR手柄震动降低(模拟冰凉) + 轻微摩擦震动'
      },
      taste: {
        description: '黑咖啡 + 无花果干',
        implementation: '建议品尝清单 + 仪式感提示'
      }
    },
    dailyPrompts: [
      '今天是实现"地中海优雅"愿景的第{day}天',
      '晨间提示: 赤脚走在地板上,感受大地的连接',
      '午间提示: 在自然光下坐10分钟,观察光影变化',
      '晚间提示: 用烛光照明晚餐,放慢进食节奏'
    ]
  },
  
  // 图片2: Urban Minimalist
  {
    visionImageId: 'urban-minimalist',
    visualDNA: {
      colorPalette: ['#4A3C2E', '#1C1C1C', '#D4C5B0'],
      materials: ['wool_coat', 'stone_archway', 'aged_architecture'],
      lighting: 'overcast_diffused_natural',
      emotionalCore: ['introspective', 'independent', 'intellectual'],
      archetype: 'Urban_flâneur_with_literary_soul'
    },
    lifestyleInference: {
      pace: '独立自由的城市漫游者节奏',
      values: ['思考', '观察', '独立', '质感'],
      dailyRituals: [
        '每日下午城市漫步',
        '咖啡馆/公园长椅阅读',
        '观察陌生人并记录'
      ]
    },
    sopMapping: {
      dailyRoutine: {
        timeRange: '下午漫步时光',
        activities: [
          { time: '14:00-15:30', action: '独自在城市中漫步30-60分钟(无耳机,纯观察)', sensoryFocus: '视觉+听觉' },
          { time: '携带物品', action: '小笔记本记录观察到的细节' }
        ]
      },
      inventoryManagement: [
        { title: '只保留5件高质量外套', description: '羊毛/羊绒', timeline: '本月' },
        { title: '极简衣橱配色', description: '棕、黑、灰、驼色,全部可混搭', timeline: '本月' }
      ],
      knowledgeManagement: [
        { title: '每周一本哲学/文学类书籍', frequency: '每周' },
        { title: '在咖啡馆/公园长椅上阅读(不在家)', frequency: '每日' }
      ],
      creativeSystem: [
        { title: '观察日记', description: '每日记录今天看到的一个陌生人(外貌/猜测TA的故事)', frequency: '每日' }
      ]
    },
    manifestationPlan: {
      week1: {
        focus: '建立城市漫步习惯',
        actions: [
          '每日下午固定漫步1小时',
          '购买质感笔记本',
          '去一家从未去过的咖啡馆'
        ]
      },
      week2: {
        focus: '极简衣橱改造',
        actions: [
          '清理衣橱,只保留经典单品',
          '购买一件oversized羊毛大衣',
          '练习快速穿搭(5分钟内)'
        ]
      },
      week3: {
        focus: '深化观察练习',
        actions: [
          '每日观察日记',
          '在咖啡馆坐2小时,不用手机',
          '阅读一本城市漫游主题书籍'
        ]
      },
      week4: {
        focus: '内化独立气质',
        actions: [
          '总结本月观察日记',
          '策划一次"陌生城市区域探索"',
          '拍摄一组城市街拍'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '模糊的城市街景背景 + 逆光轮廓',
        implementation: '3D城市场景 + 景深效果 + 动态人流'
      },
      auditory: {
        description: '城市白噪音 + 脚步回响 + 远处车流',
        implementation: '分层音频: 环境音60% + 脚步音20% + 风声20%'
      },
      olfactory: {
        description: '城市清晨空气 + 咖啡店飘香',
        implementation: '提示: "建议在清晨漫步,感受城市苏醒的气味"'
      },
      kinesthetic: {
        description: '微风拂面 + 行走步伐节奏 + 大衣重量',
        implementation: 'VR中模拟行走节奏 + 轻微风感'
      }
    },
    dailyPrompts: [
      '今天去哪个从未去过的街区漫步?',
      '观察提示: 注意一个陌生人的细节(穿着/表情/步态)',
      '今天在户外阅读30分钟',
      '记录: 城市今天给你的一个惊喜'
    ]
  },
  
  // 图片4: Wabi-Sabi Sanctuary
  {
    visionImageId: 'wabi-sabi-sanctuary',
    visualDNA: {
      colorPalette: ['#C4A574', '#8B7355', '#3D3D3D'],
      materials: ['raw_concrete', 'natural_wood', 'linen_textiles'],
      lighting: 'warm_ambient_minimal_sources',
      spatialFeeling: 'horizontal_low_furniture_zen_flow',
      emotionalCore: ['grounded', 'meditative', 'uncluttered_mind'],
      archetype: 'Zen_minimalist_living_close_to_earth'
    },
    lifestyleInference: {
      pace: '缓慢、低矮、接地气的生活节奏',
      values: ['断舍离', '接地', '禅定', '简朴'],
      dailyRituals: [
        '坐在地板上喝茶',
        '地板生活(减少椅子使用)',
        '预留"什么都不做"的时间'
      ]
    },
    sopMapping: {
      inventoryManagement: [
        { title: '执行"一入一出"原则', description: '买一件新物品必须丢弃一件旧物', timeline: '立即开始' },
        { title: '家具降低高度', description: '床垫直接放地上/矮桌', timeline: '1个月' }
      ],
      dailyRoutine: {
        timeRange: '地板生活',
        activities: [
          { time: '晨间', action: '坐在地板上喝茶(不用椅子)', sensoryFocus: '触觉+味觉' },
          { time: '阅读时', action: '躺在地板垫子上(减少眼睛高度)', sensoryFocus: '视觉+触觉' }
        ]
      },
      spaceManagement: [
        { title: '移除所有顶灯', timeline: '本周' },
        { title: '只使用地灯 + 蜡烛 + 温暖色调LED(2700K)', timeline: '本周' }
      ],
      habitTracking: [
        { title: '每日预留1小时"什么都不做"', description: '躺在地板上,盯着天花板', frequency: '每日' }
      ]
    },
    manifestationPlan: {
      week1: {
        focus: '地板生活体验',
        actions: [
          '体验一次"地板日"(整天不用任何椅子)',
          '购买亚麻地板垫',
          '移除一半家具'
        ]
      },
      week2: {
        focus: '灯光革命',
        actions: [
          '拆除所有顶灯',
          '购买地灯 + 蜡烛',
          '测试2700K暖光照明'
        ]
      },
      week3: {
        focus: '断舍离深化',
        actions: [
          '执行"一入一出"原则',
          '每天丢弃一件不必要的物品',
          '购买低矮木桌'
        ]
      },
      week4: {
        focus: '禅定习惯',
        actions: [
          '每日1小时"什么都不做"',
          '记录留白时间的内在体验',
          '邀请朋友体验地板生活'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '低矮视角的开阔空间 + 温暖地灯光线',
        implementation: '3D场景相机降低至地面视角 + 柔和光源'
      },
      auditory: {
        description: '深度静谧 + 偶尔木头轻响',
        implementation: '99%静音 + 1%环境微音(风/木头吱呀)'
      },
      olfactory: {
        description: '木材清新香气 + 混凝土矿物气息',
        implementation: '提示: "桧木香薰 + 开窗通风感受混凝土的清凉"'
      },
      kinesthetic: {
        description: '温润木头 + 温暖地板 + 编织物粗糙触感',
        implementation: 'VR中模拟坐姿降低 + 木质温润震动'
      }
    },
    dailyPrompts: [
      '今天坐在地板上喝茶',
      '尝试躺在地板上阅读30分钟',
      '今天"什么都不做"1小时',
      '记录: 低矮生活给你带来的身体感受变化'
    ]
  },
  
  // 图片5: Coffee Ritual Corner
  {
    visionImageId: 'coffee-ritual',
    visualDNA: {
      colorPalette: ['#3C3C3C', '#000000', '#A88B6F'],
      materials: ['espresso_machine', 'pour_over_kettle', 'minimal_shelving'],
      lighting: 'focused_task_lighting',
      emotionalCore: ['precision', 'self_care', 'slow_start'],
      archetype: 'Coffee_artisan_morning_ritualist'
    },
    lifestyleInference: {
      pace: '缓慢而专注的晨间仪式',
      values: ['匠心', '专注', '自我照顾', '仪式感'],
      dailyRituals: [
        '手冲咖啡仪式(不可跳过)',
        '神圣的早晨时光',
        '咖啡知识学习'
      ]
    },
    sopMapping: {
      dailyRoutine: {
        timeRange: '咖啡仪式',
        activities: [
          { time: '06:30-06:35', action: '研磨咖啡豆(听声音)', sensoryFocus: '听觉+嗅觉' },
          { time: '06:35-06:40', action: '温杯(感受热气)', sensoryFocus: '触觉+视觉' },
          { time: '06:40-06:50', action: '缓慢注水(观察咖啡粉膨胀)', sensoryFocus: '视觉+嗅觉' },
          { time: '06:50-06:53', action: '等待3分钟不碰手机', sensoryFocus: '内观' }
        ]
      },
      inventoryManagement: [
        { title: '购买手冲壶', timeline: '本周' },
        { title: '购买磨豆机', timeline: '本周' },
        { title: '购买玻璃咖啡壶', timeline: '本周' },
        { title: '设置专属咖啡角', description: '不可与其他功能混用', timeline: '2周' }
      ],
      knowledgeManagement: [
        { title: '学习不同产地咖啡豆风味', frequency: '每周' },
        { title: '每周尝试一种新豆子并记录味道', frequency: '每周' }
      ]
    },
    manifestationPlan: {
      week1: {
        focus: '建立咖啡仪式',
        actions: [
          '停止买外卖咖啡',
          '购买手冲器具',
          '设定每天早上咖��时间为"神圣时刻"(手机飞行模式)'
        ]
      },
      week2: {
        focus: '深化仪式感',
        actions: [
          '每天严格执行完整手冲流程',
          '记录每日咖啡日记(豆子/味道/心情)',
          '购买第一包精品豆'
        ]
      },
      week3: {
        focus: '咖啡知识学习',
        actions: [
          '研究三种产地咖啡豆差异',
          '尝试不同研磨粗细',
          '邀请朋友品鉴'
        ]
      },
      week4: {
        focus: '匠心内化',
        actions: [
          '总结本月咖啡实验',
          '建立个人咖啡配方',
          '拍摄咖啡仪式短片'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '深色背景 + 专业器具的金属光泽 + 蒸汽升起',
        implementation: '3D咖啡角场景 + 实时蒸汽粒子效果 + 金属材质高光'
      },
      auditory: {
        description: '研磨声 + 蒸汽嘶嘶声 + 水流声',
        implementation: '分层音频: 研磨40% + 蒸汽30% + 倒水30%'
      },
      olfactory: {
        description: '浓郁咖啡香 + 新鲜烘焙豆香',
        implementation: '提示: "现在闻到的应该是: 坚果/巧克力/花香(根据豆子)"'
      },
      kinesthetic: {
        description: '冰凉不锈钢 + 温热蒸汽 + 咖啡粉细腻质感',
        implementation: 'VR手柄震动: 冷感(低频) + 热感(高频) + 研磨震动'
      },
      taste: {
        description: '第一口咖啡的醇厚 + 回甘',
        implementation: '提示: "慢慢品尝,注意前中后调的变化"'
      }
    },
    dailyPrompts: [
      '今天的咖啡仪式完成了吗?',
      '注意: 研磨时的香气有什么变化?',
      '观察: 咖啡粉接触水时的膨胀(blooming)',
      '记录: 今天咖啡的味道给你的三个形容词'
    ]
  },
  
  // 图片6: Quiet Companionship
  {
    visionImageId: 'quiet-companionship',
    visualDNA: {
      colorPalette: ['#F5F5DC', '#1C1C1C', '#D3D3D3'],
      materials: ['paper', 'cat_fur', 'wood_floor'],
      lighting: 'soft_window_light_through_blinds',
      emotionalCore: ['solitude_is_not_loneliness', 'gentle_presence'],
      archetype: 'Quiet_companionship_seeker'
    },
    lifestyleInference: {
      pace: '安静共处的节奏',
      values: ['陪伴', '独处质量', '简单幸福', '当下'],
      dailyRituals: [
        '与宠物/植物共处',
        '固定时间阅读',
        '安静共处时光'
      ]
    },
    sopMapping: {
      habitTracking: [
        { title: '每日至少1小时"有质量的独处"', description: '阅读/冥想/观察窗外', frequency: '每日' },
        { title: '记录独处时的内心对话', frequency: '每日' }
      ],
      relationshipManagement: [
        { title: '与朋友/伴侣练习"安静共处"', description: '在同一空间各做各的事', frequency: '每周' }
      ],
      dailyRoutine: {
        timeRange: '阅读时光',
        activities: [
          { time: '固定时间', action: '阅读纸质书(与宠物/植物共处)', sensoryFocus: '触觉+视觉' }
        ]
      }
    },
    manifestationPlan: {
      week1: {
        focus: '建立独处习惯',
        actions: [
          '每日1小时高质量独处',
          '开始独处日记',
          '创造专属独处角落'
        ]
      },
      week2: {
        focus: '深化阅读习惯',
        actions: [
          '固定时间纸质书阅读',
          '与宠物/植物共处',
          '记录阅读感受'
        ]
      },
      week3: {
        focus: '安静共处练习',
        actions: [
          '邀请朋友来家里"什么都不做"',
          '与伴侣练习各做各的事',
          '观察陪伴的质量变化'
        ]
      },
      week4: {
        focus: '简单幸福内化',
        actions: [
          '总结本月独处质量',
          '拍摄一组"安静时刻"照片',
          '分享"独处不等于孤独"的体验'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '百叶窗光影几何 + 黑白对比 + 柔和轮廓',
        implementation: '3D场景百叶窗光影动画 + 高对比度渲染'
      },
      auditory: {
        description: '猫咪呼噜声 + 翻书声 + 静谧',
        implementation: '极低音量循环: 呼噜20% + 翻书10% + 环境音5%'
      },
      olfactory: {
        description: '纸张香气 + 阳光晒过的温暖',
        implementation: '提示: "打开窗户,让阳光照在书上"'
      },
      kinesthetic: {
        description: '猫咪柔软毛发 + 书页纸张 + 木地板温度',
        implementation: 'VR模拟抚摸质感 + 翻书触感 + 温暖地板'
      }
    },
    dailyPrompts: [
      '今天的独处时光完成了吗?',
      '与宠物/植物共处30分钟',
      '尝试与朋友"安静共处"',
      '记录: 今天独处时的一个内心对话'
    ]
  },
  
  // 图片7: Body Liberation
  {
    visionImageId: 'body-liberation',
    visualDNA: {
      colorPalette: ['#FFFFFF', '#F5DEB3', '#C19A6B'],
      materials: ['lace', 'linen', 'natural_skin'],
      lighting: 'strong_natural_light_white_based',
      emotionalCore: ['liberated', 'joyful', 'authentic', 'powerful'],
      archetype: 'Body_celebration_freedom_seeker'
    },
    lifestyleInference: {
      pace: '自由伸展的身体节奏',
      values: ['身体解放', '真实自我', '力量', '喜悦'],
      dailyRituals: [
        '自由的身体练习',
        '裸露肌肤的舒适',
        '力量与柔美的结合'
      ]
    },
    sopMapping: {
      bodyManagement: [
        { title: '每日身体解放练习', description: '舞蹈/瑜伽/自由伸展', frequency: '每日' },
        { title: '记录身体喜悦日记', description: '今天身体给你的力量感', frequency: '每日' }
      ],
      creativeSystem: [
        { title: '身体艺术创作', description: '舞蹈视频/肢体摄影', frequency: '每周' }
      ],
      dailyRoutine: {
        timeRange: '身体时间',
        activities: [
          { time: '晨间/晚间', action: '20分钟自由身体练习', sensoryFocus: '触觉+视觉' },
          { time: '穿着', action: '舒适面料(蕾丝/亚麻),感受织物与肌肤', sensoryFocus: '触觉' }
        ]
      }
    },
    manifestationPlan: {
      week1: {
        focus: '身体解放启动',
        actions: [
          '每日20分钟自由身体练习',
          '购买舒适蕾丝/亚麻衣物',
          '开始身体喜悦日记'
        ]
      },
      week2: {
        focus: '力量觉醒',
        actions: [
          '尝试新的身体练习(舞蹈/普拉提)',
          '在自然光下练习',
          '记录身体的力量感'
        ]
      },
      week3: {
        focus: '真实展现',
        actions: [
          '拍摄一组身体艺术照片',
          '与身体对话(镜子练习)',
          '分享身体解放的体验'
        ]
      },
      week4: {
        focus: '喜悦内化',
        actions: [
          '总结本月身体变化',
          '创作身体主题艺术作品',
          '庆祝身体的每一个部分'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '强烈自然光 + 白色纯净 + 蕾丝层次',
        implementation: '3D高亮度环境 + 蕾丝材质shader + 肌肤光泽'
      },
      auditory: {
        description: '衣物摩擦 + 自由呼吸 + 开阔回声',
        implementation: '轻柔摩擦音 + 深呼吸循环 + 空间混响'
      },
      olfactory: {
        description: '清新空气流动 + 蕾丝面料气味',
        implementation: '提示: "在通风良好的空间练习,感受空气流动"'
      },
      kinesthetic: {
        description: '蕾丝触感 + 自由伸展 + 温暖地板 + 力量',
        implementation: 'VR模拟伸展动作 + 织物触感 + 力量震动'
      }
    },
    dailyPrompts: [
      '今天的身体练习完成了吗?',
      '感受: 蕾丝/亚麻在肌肤上的触感',
      '在镜子前与身体对话5分钟',
      '记录: 今天身体给你的三个喜悦时刻'
    ]
  },
  
  // 图片8: Theatrical Elegance
  {
    visionImageId: 'theatrical-elegance',
    visualDNA: {
      colorPalette: ['#3E2723', '#F5F5DC', '#8D6E63'],
      materials: ['lace', 'wood', 'classical_architecture'],
      lighting: 'dramatic_chiaroscuro',
      emotionalCore: ['mysterious', 'elegant', 'powerful', 'self_identified'],
      archetype: 'Theatrical_soul_with_classical_elegance'
    },
    lifestyleInference: {
      pace: '戏剧性与沉静的平衡',
      values: ['神秘', '优雅', '内在力量', '深度美学'],
      dailyRituals: [
        '沉静坐姿的力量',
        '古典美学浸润',
        '戏剧性的自我认同'
      ]
    },
    sopMapping: {
      creativeSystem: [
        { title: '古典美学研究', description: '文艺复兴/巴洛克艺术', frequency: '每周' },
        { title: '戏剧性自拍创作', description: '明暗对比摄影', frequency: '每周' }
      ],
      bodyManagement: [
        { title: '优雅姿态练习', description: '沉静坐姿的内在力量', frequency: '每日' }
      ],
      spaceManagement: [
        { title: '打造戏剧性照明', description: '单一光源 + 深色背景', timeline: '1个月' }
      ],
      dailyRoutine: {
        timeRange: '优雅时刻',
        activities: [
          { time: '每日', action: '练习沉静坐姿10分钟', sensoryFocus: '视觉+触觉' },
          { time: '穿着', action: '精致面料(蕾丝/丝绸),感受重量与质感', sensoryFocus: '触觉' }
        ]
      }
    },
    manifestationPlan: {
      week1: {
        focus: '戏剧性照明',
        actions: [
          '改造一个角落为戏剧性空间',
          '购买单一方向光源',
          '测试明暗对比效果'
        ]
      },
      week2: {
        focus: '优雅姿态',
        actions: [
          '每日沉静坐姿练习',
          '研究古典肖像画中的姿态',
          '拍摄姿态练习照片'
        ]
      },
      week3: {
        focus: '古典美学浸润',
        actions: [
          '参观古典艺术展览',
          '阅读艺术史书籍',
          '创作明暗对比摄影作品'
        ]
      },
      week4: {
        focus: '神秘力量内化',
        actions: [
          '拍摄一组戏剧性肖像',
          '总结古典美学学习',
          '分享"优雅即力量"的体验'
        ]
      }
    },
    sensoryTriggers: {
      visual: {
        description: '强烈明暗对比 + 古典装饰线条 + 蕾丝精致',
        implementation: '3D古典场景 + 单向强光 + 高对比度渲染'
      },
      auditory: {
        description: '丝绸响动 + 古老空间回声 + 历史静默',
        implementation: '轻微丝绸音 + 大空间混响 + 古典音乐(可选)'
      },
      olfactory: {
        description: '古典空间气味 + 花香点缀 + 木质陈年香',
        implementation: '提示: "檀香/玫瑰精油 + 老木头的气息"'
      },
      kinesthetic: {
        description: '蕾丝精致触感 + 木质座椅温度 + 沉静力量',
        implementation: 'VR模拟优雅坐姿 + 织物重量感 + 木质温润'
      }
    },
    dailyPrompts: [
      '今天的沉静坐姿练习完成了吗?',
      '观察: 光影在空间中的戏剧性',
      '穿一件让你感到优雅的衣服',
      '记录: 今天内在力量的一个时刻'
    ]
  }
];

/**
 * 根据愿景图片ID获取对应的显化路径
 */
export function getManifestationPathById(visionImageId: string): ManifestationPath | undefined {
  return manifestationPaths.find(path => path.visionImageId === visionImageId);
}

/**
 * 生成每日显化提示
 */
export function generateDailyPrompt(visionImageId: string, dayNumber: number): string {
  const path = getManifestationPathById(visionImageId);
  if (!path) return '';
  
  const prompts = path.dailyPrompts;
  const promptIndex = dayNumber % prompts.length;
  return prompts[promptIndex].replace('{day}', dayNumber.toString());
}

/**
 * 获取当前周的显化计划
 */
export function getCurrentWeekPlan(visionImageId: string, dayNumber: number): { focus: string; actions: string[] } | null {
  const path = getManifestationPathById(visionImageId);
  if (!path) return null;
  
  const weekNumber = Math.ceil(dayNumber / 7);
  const weekKey = `week${Math.min(weekNumber, 4)}` as 'week1' | 'week2' | 'week3' | 'week4';
  
  return path.manifestationPlan[weekKey];
}
