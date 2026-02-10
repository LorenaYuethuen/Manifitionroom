import { VisionCard } from '../VisionCard';
import { useAppStore } from '../../store/useAppStore';

export function VisionBoard() {
  const currentStage = useAppStore((state) => state.currentStage);
  const visionCards = useAppStore((state) => state.visionCards);
  
  const isActive = currentStage === 'vision';
  
  if (!isActive) return null;
  
  return (
    <group>
      {/* Additional light for gallery ambiance */}
      <directionalLight position={[0, 5, 0]} intensity={0.2} />
      <directionalLight position={[3, 5, 3]} intensity={0.3} />
      
      {/* Vision cards in circular gallery */}
      {visionCards.map((card, index) => (
        <VisionCard
          key={card.id}
          card={card}
          index={index}
          totalCards={visionCards.length}
        />
      ))}
    </group>
  );
}