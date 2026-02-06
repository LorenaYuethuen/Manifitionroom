import { useAppStore } from '../../store/useAppStore';

export function StageIndicator() {
  const currentStage = useAppStore((state) => state.currentStage);
  
  const stages = {
    void: { name: '虚空唤醒', subtitle: '准备进入内观状态' },
    vision: { name: '愿景环廊', subtitle: '构建你的愿景板' },
    mobius: { name: '莫比乌斯环', subtitle: '穿越时空之门' },
    manifestation: { name: '显化核心', subtitle: '探索具象化模块' }
  };
  
  const stage = stages[currentStage];
  
  return (
    <div className="fixed top-4 right-4 z-40 bg-black/35 backdrop-blur-sm px-6 py-3 rounded-lg">
      <div className="text-right">
        <h3 className="text-white text-lg font-light">{stage.name}</h3>
        <p className="text-gray-400 text-xs mt-0.5">{stage.subtitle}</p>
      </div>
    </div>
  );
}
