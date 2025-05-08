import { Application, YearlyCosts } from '../types/calculator.types';

import servicesJson from '../assets/services.json'


export const calculateCost = (
  applications: Application[],
  selectedApps: string[], //Servicios seleccionados
  areas: { [key: string]: number }, //Areas seleccionadas de cada servicio

  //Devuelve un array de objetos tipo YearlyCosts
): YearlyCosts[] => {

  //Variable en la que se van a guardar todos los costos
  const yearlyCosts: YearlyCosts[] = [];
  const areaGemeloDigital = Math.max(areas['gemelo_digital'] || 0, 100);

  // Onboarding Calculation

  

  //Recogo y almaceno el objeto de capaDinamica
  const capaDinamica = servicesJson.supportServices.find(
    (service) => service.id === 'capa_dinamica'
  );

  //Recogo y almaceno el objeto de gemeloDigital
  const gemeloDigital = servicesJson.supportServices.find(
    (service) => service.id === "gemelo_digital"
  );

  const onboardingGemelo = selectedApps.includes('gemelo_digital') ? gemeloDigital.use_case[0].cost.variableCost * areaGemeloDigital : 0;
  const onboardingAdaptacion = (onboardingGemelo * 40) / 52; // 40% del total
  const onboardingDesarrollo = (onboardingAdaptacion * 8) / 40; // 8% del total

  const onboardingCost: YearlyCosts = {
    gemeloCost: onboardingGemelo,
    adaptacionCost: onboardingAdaptacion,
    desarrolloCost: onboardingDesarrollo,
    mantenimientoBasicoCost: 0, // No aplica en Onboarding
    capaDinamicaCost: 0, // No aplica en Onboarding
    otherAppsCosts: {}, // Solo se calcula para los anteriores
    mantenimientoCustomizadoCost: 0, // No aplica en Onboarding
    totalCost: onboardingGemelo + onboardingAdaptacion + onboardingDesarrollo,
  };

  yearlyCosts.push(onboardingCost);

  // Annual Calculation
  for (let year = 0; year < 4; year++) {
    let rate = year === 0 ? 100 : 80;
    if (year >= 1) {
      rate *= 2;
    }

    // Gemelo Digital Cost
    const gemeloCost = selectedApps.includes('gemelo_digital') ? areaGemeloDigital * rate : 0;
    const adaptacionCost = (gemeloCost * 40) / 52;
    const desarrolloCost = (adaptacionCost * 8) / 40;
    const mantenimientoBasicoCost = gemeloCost * 0.1;

    // Dinamic Layer Cost
    const capaDinamicaCost = selectedApps.includes('capa_dinamica')
      ? applications.find((a) => a.id === 'capa_dinamica')?.fixedCost || 0
      : 0;

    const otherAppsCosts: { [key: string]: number } = {};
    let otherAppsTotal = 0;

    selectedApps.forEach((appId) => {
      if (appId !== 'gemelo_digital' && appId !== 'capa_dinamica') {
        const app = applications.find((a) => a.id === appId);
        if (app) {
          const appCost =
            app.fixedCost + app.variableCost * Math.max(areas[appId] || 0, 100);
          otherAppsCosts[appId] = appCost;
          otherAppsTotal += appCost;
        }
      }
    });

    const mantenimientoCustomizadoCost = otherAppsTotal * 0.2;

    const totalCost =
      gemeloCost +
      adaptacionCost +
      desarrolloCost +
      mantenimientoBasicoCost +
      capaDinamicaCost +
      otherAppsTotal +
      mantenimientoCustomizadoCost;

    yearlyCosts.push({
      gemeloCost,
      adaptacionCost,
      desarrolloCost,
      mantenimientoBasicoCost,
      capaDinamicaCost,
      otherAppsCosts,
      mantenimientoCustomizadoCost,
      totalCost,
    });
  }

  return yearlyCosts;
};
