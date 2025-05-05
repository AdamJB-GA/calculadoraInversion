import { create } from 'zustand';
import { AppState } from '../types/calculator.types';
import { applications } from '../utils/costUtility';

// Create a store with Zustand
export const useAppStore = create<AppState>((set) => ({
  // Estado inicial
  selectedApps: ['gemelo_digital'], // Gem Digital seleccionado por defecto
  areas: {
    gemelo_digital: 100, // Área predeterminada 100 km²
  },
  applications: applications, // Importamos las aplicaciones del utility
  costs: null,
  expandedSections: {
    capaDinamica: false,
  },

  // Acciones
  setSelectedApps: (apps) => set({ selectedApps: apps }),
  
  setArea: (appId, area) => 
    set((state) => ({
      areas: {
        ...state.areas,
        [appId]: area,
      },
    })),
  
  setAreas: (areas) => set({ areas }),
  
  setCosts: (costs) => set({ costs }),
  
  toggleSection: (section) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section],
      },
    })),
}));

export default useAppStore;