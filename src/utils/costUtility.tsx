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

  //Recogo y almaceno el costo variable de gemeloDigital
  const costoVariableGemeloDigital = servicesJson.supportServices.find(
    (service) => service.id === "gemelo_digital"
  )?.use_case[0].cost.variableCost;

  const onboardingGemelo = selectedApps.includes('gemelo_digital') ? costoVariableGemeloDigital * areaGemeloDigital : 0;
  const onboardingAdaptacion = (onboardingGemelo * 40) / 52; // 40% del total
  const onboardingDesarrollo = (onboardingAdaptacion * 8) / 40; // 8% del total

  // Almacenamiento del costo del onboarding
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

  // Por cada anno se crea y almacena un objeto YearlyCosts
  for (let year = 0; year < 4; year++) {
    let isFirstYear = year === 0;
    let rate = isFirstYear ? 100 : 160; // Si es el primer año la tasa es de 100 si no de 160
    

    // Gemelo Digital Cost
    const gemeloCost = selectedApps.includes('gemelo_digital')
      ? areaGemeloDigital * rate
      : 0;

    // Calculo de diferentes costos en relacion al gemelo digital
    const adaptacionCost = (gemeloCost * 40) / 52;
    const desarrolloCost = (adaptacionCost * 8) / 40;
    const mantenimientoBasicoCost = gemeloCost * 0.1; // Costo mantenimiento (10% del coste del gemelo)

    // Calculo de la capa dinamica
    const capaDinamicaCost = selectedApps.includes('capa_dinamica')
      ? applications.find((a) => a.id === 'capa_dinamica')?.fixedCost || 0
      : 0;

    
    // Calculo del resto de apps

    const otherAppsCosts: { [key: string]: number } = {};
    let otherAppsTotal = 0; // Total

    // Se recorren las apps seleccionadas
    selectedApps.forEach((appId) => {

      // No se tienen en cuenta el gemelo digital ni la capa dinamica
      if (appId !== 'gemelo_digital' && appId !== 'capa_dinamica') {
        const app = applications.find((a) => a.id === appId);
        if (app) {
          const area = Math.max(areas[appId] || 0, 100); // Area introducida segun el servicio
          const cost = app.fixedCost + app.variableCost * area; // Calculo del costo por app
          otherAppsCosts[appId] = cost; // Se almacena el costo por app
          otherAppsTotal += cost; // Se va sumando el total de todas las apps
        }
      }
    });


    // Costo del mantenimiento (20% del total de las apps que no son gemelo digital o capa dinamica)
    const mantenimientoCustomizadoCost = otherAppsTotal * 0.2;

    // Costo total
    const totalCost =
      gemeloCost +
      adaptacionCost +
      desarrolloCost +
      mantenimientoBasicoCost +
      capaDinamicaCost +
      otherAppsTotal +
      mantenimientoCustomizadoCost;

      console.log('--- Detalle del cálculo de totalCost ---');
console.log('gemeloCost:', gemeloCost);
console.log('adaptacionCost:', adaptacionCost);
console.log('desarrolloCost:', desarrolloCost);
console.log('mantenimientoBasicoCost:', mantenimientoBasicoCost);
console.log('capaDinamicaCost:', capaDinamicaCost);
console.log('otherAppsTotal:', otherAppsTotal);
console.log('mantenimientoCustomizadoCost:', mantenimientoCustomizadoCost);
console.log('totalCost:', totalCost);
console.log('----------------------------------------');

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
