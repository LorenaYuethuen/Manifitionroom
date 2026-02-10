import { Card } from './card';
import { Badge } from './badge';
import { ScrollArea } from './scroll-area';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { manifestationPaths, type ManifestationPath } from '../../data/sopManifestationData';

interface ManifestationTimelineProps {
  visionImageId?: string;
  currentDay?: number;
}

export function ManifestationTimeline({ visionImageId, currentDay = 1 }: ManifestationTimelineProps) {
  const manifestationPath = visionImageId 
    ? manifestationPaths.find(p => p.visionImageId === visionImageId)
    : manifestationPaths[0];

  if (!manifestationPath) {
    return (
      <Card className="p-6 bg-[#0A0A0A]/90 border-[#FFEEDD]/10">
        <p className="text-[#FFEEDD]/60">未找到显化计划数据</p>
      </Card>
    );
  }

  const { manifestationPlan } = manifestationPath;
  const currentWeek = Math.ceil(currentDay / 7);

  const weeks = [
    { week: 1, data: manifestationPlan.week1, color: '#7FB069' },
    { week: 2, data: manifestationPlan.week2, color: '#FFB703' },
    { week: 3, data: manifestationPlan.week3, color: '#A8DADC' },
    { week: 4, data: manifestationPlan.week4, color: '#F72585' }
  ];

  return (
    <div className="space-y-4">
      {/* 进度概览 */}
      <Card className="p-6 bg-gradient-to-br from-[#1A1A1A]/95 to-[#0F0F0F]/95 border-[#FFEEDD]/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[#FFEEDD]">30天显化进度</h3>
          <Badge className="bg-[#7FB069]/20 text-[#7FB069] border-[#7FB069]/30">
            第 {currentDay} 天 / Week {currentWeek}
          </Badge>
        </div>
        
        {/* 进度条 */}
        <div className="relative h-2 bg-[#050505]/60 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7FB069] via-[#FFB703] to-[#F72585] rounded-full transition-all duration-1000"
            style={{ width: `${(currentDay / 30) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-[#FFEEDD]/50">
          <span>Day 1</span>
          <span>Day 30</span>
        </div>
      </Card>

      {/* 周计划时间轴 */}
      <ScrollArea className="h-[550px]">
        <div className="space-y-6 pr-4">
          {weeks.map(({ week, data, color }) => {
            const isCurrentWeek = week === currentWeek;
            const isPastWeek = week < currentWeek;
            const isFutureWeek = week > currentWeek;

            return (
              <Card 
                key={week}
                className={`p-6 border transition-all duration-300 ${
                  isCurrentWeek 
                    ? 'bg-[#0A0A0A]/95 border-[#FFEEDD]/30 shadow-lg shadow-[#FFEEDD]/5' 
                    : isPastWeek
                    ? 'bg-[#050505]/60 border-[#FFEEDD]/5 opacity-70'
                    : 'bg-[#050505]/40 border-[#FFEEDD]/5 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* 周标记 */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div 
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        isCurrentWeek 
                          ? 'bg-[#FFEEDD]/10 border-[#FFEEDD]/40' 
                          : isPastWeek
                          ? 'bg-[#7FB069]/10 border-[#7FB069]/30'
                          : 'bg-[#050505]/40 border-[#FFEEDD]/10'
                      }`}
                    >
                      {isPastWeek ? (
                        <CheckCircle2 className="w-6 h-6" style={{ color }} />
                      ) : (
                        <span className="text-sm font-medium" style={{ color: isCurrentWeek ? '#FFEEDD' : color }}>
                          W{week}
                        </span>
                      )}
                    </div>
                    {week < 4 && (
                      <div className={`w-0.5 h-12 ${isPastWeek ? 'bg-[#7FB069]/30' : 'bg-[#FFEEDD]/10'}`} />
                    )}
                  </div>

                  {/* 周内容 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-base font-medium text-[#FFEEDD]">
                        Week {week}: {data.focus}
                      </h4>
                      {isCurrentWeek && (
                        <Badge className="bg-[#FFB703]/20 text-[#FFB703] border-[#FFB703]/30 text-xs">
                          进行中
                        </Badge>
                      )}
                      {isPastWeek && (
                        <Badge className="bg-[#7FB069]/20 text-[#7FB069] border-[#7FB069]/30 text-xs">
                          已完成
                        </Badge>
                      )}
                    </div>

                    {/* 行动清单 */}
                    <div className="space-y-2">
                      {data.actions.map((action, index) => (
                        <div 
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                            isCurrentWeek 
                              ? 'bg-[#FFEEDD]/5 hover:bg-[#FFEEDD]/10' 
                              : 'bg-[#050505]/40'
                          }`}
                        >
                          {isPastWeek ? (
                            <CheckCircle2 className="w-5 h-5 text-[#7FB069] flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              isCurrentWeek ? 'text-[#FFEEDD]/40' : 'text-[#FFEEDD]/20'
                            }`} />
                          )}
                          <p className={`text-sm leading-relaxed ${
                            isPastWeek 
                              ? 'text-[#FFEEDD]/50 line-through' 
                              : isCurrentWeek
                              ? 'text-[#FFEEDD]/80'
                              : 'text-[#FFEEDD]/40'
                          }`}>
                            {action}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* 周统计 */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-[#FFEEDD]/50">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{data.actions.length} 个行动项</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span>Day {(week - 1) * 7 + 1} - {week * 7}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* 激励提示 */}
      <Card className="p-4 bg-gradient-to-r from-[#7FB069]/10 via-[#FFB703]/10 to-[#F72585]/10 border-[#FFEEDD]/20">
        <p className="text-sm text-[#FFEEDD]/80 text-center leading-relaxed">
          {currentDay <= 7 && "🌱 万物始于微小的种子，每一天的行动都在滋养你的愿景"}
          {currentDay > 7 && currentDay <= 14 && "🌿 持续的仪式正在塑造新的习惯，你已经在改变的路上"}
          {currentDay > 14 && currentDay <= 21 && "🌸 21天是习惯形成的关键期，你已经跨越了大半！"}
          {currentDay > 21 && "✨ 恭喜！你已经完成了30天显化旅程的大部分，坚持就是胜利"}
        </p>
      </Card>
    </div>
  );
}
