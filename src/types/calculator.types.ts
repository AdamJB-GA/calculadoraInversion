export interface Application {
  id: string;
  name: string;
  fixedCost: number;
  variableCost: number;
  category: string;
  description?: string;
  help?: string;
}

export interface YearlyCosts {
  gemeloCost: number;
  adaptacionCost: number;
  desarrolloCost: number;
  mantenimientoBasicoCost?: number;
  capaDinamicaCost: number;
  otherAppsCosts: {
    [key: string]: number;
  };
  mantenimientoCustomizadoCost?: number;
  totalCost: number;
}

export interface AppState {
  selectedApps: string[];
  areas: {
    [key: string]: number;
  };
  applications: Application[];
  costs: YearlyCosts[] | null;
  expandedSections: {
    [key: string]: boolean;
  };
  
  // Acciones para el store
  setSelectedApps: (apps: string[]) => void;
  setArea: (appId: string, area: number) => void;
  setAreas: (areas: { [key: string]: number }) => void;
  setCosts: (costs: YearlyCosts[] | null) => void;
  toggleSection: (section: string) => void;
}