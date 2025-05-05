export interface YearlyCosts {
  gemeloCost: number;
  adaptacionCost: number;
  desarrolloCost: number;
  mantenimientoBasicoCost: number;
  capaDinamicaCost: number;
  otherAppsCosts: { [key: string]: number };
  mantenimientoCustomizadoCost: number;
  totalCost: number;
}
