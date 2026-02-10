import { useState } from 'react';
import { Card } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { ScrollArea } from './scroll-area';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Eye, 
  Ear, 
  Hand, 
  Flower2, 
  Heart,
  Sparkles,
  Target,
  ListChecks,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import { 
  manifestationPaths, 
  getManifestationPathById,
  generateDailyPrompt,
  getCurrentWeekPlan,
  type ManifestationPath 
} from '../../data/sopManifestationData';

interface SOPManifestationPanelProps {
  visionImageId?: string;
  dayNumber?: number; // 显化第几天
}

export function SOPManifestationPanel({ visionImageId, dayNumber = 1 }: SOPManifestationPanelProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
  const manifestationPath = visionImageId 
    ? getManifestationPathById(visionImageId) 
    : manifestationPaths[0]; // 默认显示第一个

  if (!manifestationPath) {
    return (
      <Card className="p-6 bg-[#0A0A0A]/90 border-[#FFEEDD]/10">
        <p className="text-[#FFEEDD]/60">未找到显化路径数据</p>
      </Card>
    );
  }

  const dailyPrompt = generateDailyPrompt(manifestationPath.visionImageId, dayNumber);
  const currentWeekPlan = getCurrentWeekPlan(manifestationPath.visionImageId, dayNumber);

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getSensoryIcon = (sensory: string) => {
    switch (sensory) {
      case 'visual': return <Eye className="w-4 h-4" />;
      case 'auditory': return <Ear className="w-4 h-4" />;
      case 'kinesthetic': return <Hand className="w-4 h-4" />;
      case 'olfactory': return <Flower2 className="w-4 h-4" />;
      case 'emotional': return <Heart className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* 每日显化提示 */}
      <Card className="p-6 bg-gradient-to-br from-[#1A1A1A]/95 to-[#0F0F0F]/95 border-[#FFEEDD]/20">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-[#FFB703] mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-[#FFEEDD] mb-2">
              今日显化引导 · 第 {dayNumber} 天
            </h3>
            <p className="text-[#FFEEDD]/80 leading-relaxed">
              {dailyPrompt}
            </p>
          </div>
        </div>
      </Card>

      {/* 当前周计划 */}
      {currentWeekPlan && (
        <Card className="p-6 bg-[#0A0A0A]/90 border-[#FFEEDD]/10">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#7FB069]" />
            <h3 className="text-sm font-medium text-[#FFEEDD]">
              本周焦点: {currentWeekPlan.focus}
            </h3>
          </div>
          <div className="space-y-2">
            {currentWeekPlan.actions.map((action, index) => {
              const taskId = `week-${dayNumber}-${index}`;
              const isCompleted = completedTasks.has(taskId);
              
              return (
                <button
                  key={index}
                  onClick={() => toggleTask(taskId)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg bg-[#050505]/40 hover:bg-[#050505]/60 transition-colors text-left group"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#7FB069] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#FFEEDD]/30 group-hover:text-[#FFEEDD]/50 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${isCompleted ? 'text-[#FFEEDD]/50 line-through' : 'text-[#FFEEDD]/80'}`}>
                    {action}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      <Tabs defaultValue="sop" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#0A0A0A]/60">
          <TabsTrigger value="sop">SOP框架</TabsTrigger>
          <TabsTrigger value="sensory">五感触发</TabsTrigger>
          <TabsTrigger value="analysis">AI分析</TabsTrigger>
        </TabsList>

        {/* SOP框架标签页 */}
        <TabsContent value="sop" className="space-y-4 mt-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {/* Daily Routine */}
              {manifestationPath.sopMapping.dailyRoutine && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-[#A8DADC]" />
                    <h4 className="text-sm font-medium text-[#FFEEDD]">
                      DAILY ROUTINE · {manifestationPath.sopMapping.dailyRoutine.timeRange}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.dailyRoutine.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#050505]/40 rounded-lg">
                        <span className="text-xs text-[#FFB703] font-mono mt-0.5 flex-shrink-0">
                          {activity.time}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-[#FFEEDD]/80">{activity.action}</p>
                          {activity.sensoryFocus && (
                            <Badge variant="outline" className="mt-2 text-xs border-[#FFEEDD]/20 text-[#FFEEDD]/60">
                              {activity.sensoryFocus}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Inventory Management */}
              {manifestationPath.sopMapping.inventoryManagement && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-4 h-4 text-[#E63946]" />
                    <h4 className="text-sm font-medium text-[#FFEEDD]">物品库存管理</h4>
                  </div>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.inventoryManagement.map((task, index) => {
                      const taskId = `inventory-${index}`;
                      const isCompleted = completedTasks.has(taskId);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => toggleTask(taskId)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg bg-[#050505]/40 hover:bg-[#050505]/60 transition-colors text-left group"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-[#7FB069] flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#FFEEDD]/30 group-hover:text-[#FFEEDD]/50 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${isCompleted ? 'text-[#FFEEDD]/50 line-through' : 'text-[#FFEEDD]/80'}`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-xs text-[#FFEEDD]/50 mt-1">{task.description}</p>
                            )}
                            {task.timeline && (
                              <Badge variant="outline" className="mt-2 text-xs border-[#FFB703]/30 text-[#FFB703]">
                                {task.timeline}
                              </Badge>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Body Management */}
              {manifestationPath.sopMapping.bodyManagement && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#7FB069]" />
                    <h4 className="text-sm font-medium text-[#FFEEDD]">身体管理</h4>
                  </div>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.bodyManagement.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-[#FFEEDD]/50 mt-1">{task.description}</p>
                        )}
                        {task.frequency && (
                          <Badge variant="outline" className="mt-2 text-xs border-[#7FB069]/30 text-[#7FB069]">
                            {task.frequency}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* 其他SOP模块... */}
              {manifestationPath.sopMapping.spaceManagement && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <h4 className="text-sm font-medium text-[#FFEEDD] mb-3">空间管理</h4>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.spaceManagement.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.timeline && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {task.timeline}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {manifestationPath.sopMapping.habitTracking && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <h4 className="text-sm font-medium text-[#FFEEDD] mb-3">习惯追踪</h4>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.habitTracking.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-[#FFEEDD]/50 mt-1">{task.description}</p>
                        )}
                        {task.frequency && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {task.frequency}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {manifestationPath.sopMapping.knowledgeManagement && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <h4 className="text-sm font-medium text-[#FFEEDD] mb-3">知识管理</h4>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.knowledgeManagement.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.frequency && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {task.frequency}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {manifestationPath.sopMapping.creativeSystem && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <h4 className="text-sm font-medium text-[#FFEEDD] mb-3">创作系统</h4>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.creativeSystem.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-[#FFEEDD]/50 mt-1">{task.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {manifestationPath.sopMapping.relationshipManagement && (
                <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <h4 className="text-sm font-medium text-[#FFEEDD] mb-3">关系管理</h4>
                  <div className="space-y-2">
                    {manifestationPath.sopMapping.relationshipManagement.map((task, index) => (
                      <div key={index} className="p-3 bg-[#050505]/40 rounded-lg">
                        <p className="text-sm text-[#FFEEDD]/80">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-[#FFEEDD]/50 mt-1">{task.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* 五感触发器标签页 */}
        <TabsContent value="sensory" className="space-y-4 mt-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {Object.entries(manifestationPath.sensoryTriggers).map(([sensory, trigger]) => (
                <Card key={sensory} className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                  <div className="flex items-center gap-2 mb-3">
                    {getSensoryIcon(sensory)}
                    <h4 className="text-sm font-medium text-[#FFEEDD] capitalize">
                      {sensory === 'visual' ? '视觉' : 
                       sensory === 'auditory' ? '听觉' :
                       sensory === 'kinesthetic' ? '触觉' :
                       sensory === 'olfactory' ? '嗅觉' :
                       sensory === 'taste' ? '味觉' : sensory}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-[#FFEEDD]/50 mb-1">感官描述</p>
                      <p className="text-sm text-[#FFEEDD]/80 leading-relaxed">
                        {trigger.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#FFEEDD]/10">
                      <p className="text-xs text-[#FFEEDD]/50 mb-1">
                        {sensory === 'visual' || sensory === 'auditory' || sensory === 'kinesthetic' 
                          ? '3D实现方式' 
                          : '现实提示'}
                      </p>
                      <p className="text-sm text-[#FFB703]/80 leading-relaxed">
                        {trigger.implementation}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* AI分析标签页 */}
        <TabsContent value="analysis" className="space-y-4 mt-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {/* Visual DNA */}
              <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                <h4 className="text-sm font-medium text-[#FFEEDD] mb-4">视觉DNA</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">色彩系统</p>
                    <div className="flex flex-wrap gap-2">
                      {manifestationPath.visualDNA.colorPalette.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg border border-[#FFEEDD]/20"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-mono text-[#FFEEDD]/60">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">材质元素</p>
                    <div className="flex flex-wrap gap-2">
                      {manifestationPath.visualDNA.materials.map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">光线氛围</p>
                    <p className="text-sm text-[#FFEEDD]/80">
                      {manifestationPath.visualDNA.lighting.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">情感内核</p>
                    <div className="flex flex-wrap gap-2">
                      {manifestationPath.visualDNA.emotionalCore.map((emotion, index) => (
                        <Badge key={index} className="text-xs bg-[#F72585]/20 text-[#F72585] border-[#F72585]/30">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">生活原型</p>
                    <p className="text-sm text-[#A8DADC]">
                      {manifestationPath.visualDNA.archetype.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Lifestyle Inference */}
              <Card className="p-5 bg-[#0A0A0A]/80 border-[#FFEEDD]/10">
                <h4 className="text-sm font-medium text-[#FFEEDD] mb-4">生活方式推断</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-1">生活节奏</p>
                    <p className="text-sm text-[#FFEEDD]/80">{manifestationPath.lifestyleInference.pace}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">核心价值观</p>
                    <div className="flex flex-wrap gap-2">
                      {manifestationPath.lifestyleInference.values.map((value, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#FFEEDD]/50 mb-2">日常仪式</p>
                    <ul className="space-y-2">
                      {manifestationPath.lifestyleInference.dailyRituals.map((ritual, index) => (
                        <li key={index} className="text-sm text-[#FFEEDD]/70 flex items-start gap-2">
                          <span className="text-[#7FB069] mt-1">•</span>
                          {ritual}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
