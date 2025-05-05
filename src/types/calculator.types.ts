export interface Application {
  id: string;
  name: string;
  category: string;
  fixedCost: number;
  variableCost: number;
  description?: string;
  help?: string;
}

export interface YearlyCosts {
  year: number;
  gemeloCost: number;
  capaDinamicaCost: number;
  adaptacionCost: number;
  desarrolloCost: number;
  otherAppsCosts: { [key: string]: number };
  totalCost: number;
}