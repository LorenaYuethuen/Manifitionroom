import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

export function KeyboardShortcuts() {
  const setStage = useAppStore((state) => state.setStage);
  const undo = useAppStore((state) => state.undo);
  const redo = useAppStore((state) => state.redo);
  const setShowLeftPanel = useAppStore((state) => state.setShowLeftPanel);
  const showLeftPanel = useAppStore((state) => state.showLeftPanel);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for our shortcuts
      const shortcuts = ['1', '2', '3', '4', '[', ']', 'z', 'y'];
      if ((e.ctrlKey || e.metaKey) && shortcuts.includes(e.key)) {
        e.preventDefault();
      }
      
      // Stage navigation
      if (e.key === '1') setStage('void');
      if (e.key === '2') setStage('vision');
      if (e.key === '3') setStage('mobius');
      if (e.key === '4') setStage('manifestation');
      
      // Panel toggle
      if (e.key === '[') setShowLeftPanel(!showLeftPanel);
      
      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        redo();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setStage, undo, redo, setShowLeftPanel, showLeftPanel]);
  
  return null;
}
