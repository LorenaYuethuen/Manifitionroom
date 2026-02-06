import { create } from 'zustand';
import type { ManifestationModule } from '../lib/manifestationGenerator';

export type Stage = 'void' | 'vision' | 'mobius' | 'manifestation';

export interface VisionCard {
  id: string;
  type: 'image' | 'text' | 'audio';
  content: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  tags: string[];
}

export interface UploadedImage {
  id: string;
  url: string;
  file: File;
  analyzedAt?: number;
}

interface AppState {
  // Stage management
  currentStage: Stage;
  setStage: (stage: Stage) => void;
  
  // Settings
  lowStimulationMode: boolean;
  setLowStimulationMode: (enabled: boolean) => void;
  
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  
  // Vision cards
  visionCards: VisionCard[];
  addVisionCard: (card: Omit<VisionCard, 'id'>) => void;
  updateVisionCard: (id: string, updates: Partial<VisionCard>) => void;
  removeVisionCard: (id: string) => void;
  
  // Uploaded images and manifestation modules
  uploadedImages: UploadedImage[];
  addUploadedImage: (image: Omit<UploadedImage, 'id'>) => void;
  removeUploadedImage: (id: string) => void;
  
  manifestationModules: ManifestationModule[];
  setManifestationModules: (modules: ManifestationModule[]) => void;
  
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  
  // Interaction state
  selectedCardId: string | null;
  setSelectedCardId: (id: string | null) => void;
  
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  
  // History for undo/redo
  history: VisionCard[][];
  historyIndex: number;
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
  
  // UI visibility
  showLeftPanel: boolean;
  setShowLeftPanel: (show: boolean) => void;
  
  showRightPanel: boolean;
  setShowRightPanel: (show: boolean) => void;
  
  showTimeline: boolean;
  setShowTimeline: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentStage: 'void',
  setStage: (stage) => set({ currentStage: stage }),
  
  lowStimulationMode: true,
  setLowStimulationMode: (enabled) => set({ lowStimulationMode: enabled }),
  
  audioEnabled: true,
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  
  visionCards: [],
  addVisionCard: (card) => {
    const id = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      visionCards: [...state.visionCards, { ...card, id }]
    }));
    get().pushHistory();
  },
  
  updateVisionCard: (id, updates) =>
    set((state) => ({
      visionCards: state.visionCards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      )
    })),
  
  removeVisionCard: (id) => {
    set((state) => ({
      visionCards: state.visionCards.filter((card) => card.id !== id)
    }));
    get().pushHistory();
  },
  
  uploadedImages: [],
  addUploadedImage: (image) => {
    const id = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      uploadedImages: [...state.uploadedImages, { ...image, id }]
    }));
  },
  
  removeUploadedImage: (id) => {
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((image) => image.id !== id)
    }));
  },
  
  manifestationModules: [],
  setManifestationModules: (modules) => set({ manifestationModules: modules }),
  
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  selectedCardId: null,
  setSelectedCardId: (id) => set({ selectedCardId: id }),
  
  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  
  history: [[]],
  historyIndex: 0,
  pushHistory: () => {
    const { visionCards, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(visionCards)));
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },
  
  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        visionCards: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex
      });
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        visionCards: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex
      });
    }
  },
  
  showLeftPanel: true,
  setShowLeftPanel: (show) => set({ showLeftPanel: show }),
  
  showRightPanel: false,
  setShowRightPanel: (show) => set({ showRightPanel: show }),
  
  showTimeline: false,
  setShowTimeline: (show) => set({ showTimeline: show })
}));