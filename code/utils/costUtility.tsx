import { Application, YearlyCosts } from '@/types';

export const applications: Application[] = [
  {
    id: 'gemelo_digital',
    name: 'Gemelo Digital Inteligente',
    fixedCost: 0,
    variableCost: 170,
    category: 'GEMELO_DIGITAL',
    help: `
    The Digital Twin provides a detailed geospatial representation integrating multiple data layers for advanced analysis and simulations. **Base Maps & Terrain Models**: High-resolution satellite/aerial imagery providing visual and geospatial context; Topographic data including contour lines, DEM/DTM models, and slope information. **Administrative Boundaries**: Municipal, provincial, and regional jurisdictional limits; Parcel and property data essential for land management, urban planning, and cadastral applications. **Infrastructure & Communication Networks**: Roadways with attributes (speed limits, lanes); Public transport routes including railways, stations, and stops; Pedestrian paths, bike lanes, and sidewalks; Key mobility infrastructures such as highways, rail networks, airports, and ports. **Buildings & Structures**: 2D building footprints, 3D models, or BIM data when available; Height and facade data for urban density analysis, shadow impact studies, and visibility assessments. **Land Use & Land Cover (LULC)**: Classification of urban, agricultural, forestry, water bodies, and wetlands; Zoning and planning layers for residential, commercial, industrial, and mixed-use areas. **Environmental & Climate Data**: Green spaces, forests, and agricultural fields; Hydrography layers with rivers, lakes, drainage basins, and flood zones; Air quality and meteorological data from integrated stations or historical records; Geological and soil data for risk assessments and construction planning. **Points of Interest (POIs) & Socioeconomic Data**: Key facilities including hospitals, schools, emergency services, government buildings, and cultural sites; Population distribution, density, and economic indicators; Business and commercial zones such as retail hubs, industrial parks, and service points. This comprehensive Digital Twin allows for real-time monitoring, predictive analytics, and advanced simulations to support urban planning, infrastructure development, environmental management, and emergency response.
  `,
  },
  {
    id: 'capa_dinamica',
    name: 'Capa Dinámica',
    fixedCost: 35000,
    variableCost: 0,
    category: 'CAPA_DINAMICA',
    help: 'Real-Time Sensor/IoT Data (Dynamic Layer): Traffic Sensors (vehicle counting, congestion patterns), Environmental Sensors (air quality, rainfall, temperature), Infrastructure Monitoring (smart meters for energy consumption, water flow sensors), Social Media or Crowdsourced Data (optional for event detection or citizen perception analysis).',
  },
  // EMERGENCIAS
  {
    id: 'extincion_prevencion',
    name: 'Prevención y Preparación para Incendios',
    fixedCost: 25000,
    variableCost: 90,
    category: 'EMERGENCIAS',
    help: 'Periodic inspections of buildings and forest areas. Fire prevention education campaigns. High-risk area analysis using geospatial tools. Fire response drills for wildfires and structural fires. Implementation of early warning systems with drones and IoT sensors.',
  },
  {
    id: 'extincion_respuesta',
    name: 'Respuesta Rápida a Incendios',
    fixedCost: 20000,
    variableCost: 140,
    category: 'EMERGENCIAS',
    help: 'Rapid deployment of units for fire control. Situational and damage assessment. Support to other services in complex rescues.',
  },
  {
    id: 'extincion_recuperacion',
    name: 'Recuperación y Restauración Post-Incendios',
    fixedCost: 10000,
    variableCost: 65,
    category: 'EMERGENCIAS',
    help: 'Damage assessment after a fire. Restoration of areas affected by wildfires. Analysis and update of protocols based on lessons learned.',
  },
  {
    id: 'proteccion_prevencion',
    name: 'Prevención y Preparación en Protección Civil',
    fixedCost: 25000,
    variableCost: 90,
    category: 'EMERGENCIAS',
    help: 'Creation of risk maps in urban and rural areas. Assessment of critical infrastructure (dams, power grids). Development of evacuation and shelter plans. Interinstitutional coordination with municipalities and regional governments. Large-scale natural disaster drills.',
  },
  {
    id: 'proteccion_respuesta',
    name: 'Respuesta Inmediata en Protección Civil',
    fixedCost: 12000,
    variableCost: 150,
    category: 'EMERGENCIAS',
    help: 'Coordination of the Advanced Command Post (ACP). Resource mobilization for logistical support (water, food, shelter). Constant communication with the population through alert systems.',
  },
  {
    id: 'proteccion_recuperacion',
    name: 'Recuperación y Evaluación Post-Desastres',
    fixedCost: 10000,
    variableCost: 90,
    category: 'EMERGENCIAS',
    help: 'Rehabilitation of damaged critical infrastructure. Post-event evaluation to identify improvement areas. Update of risk maps with event-derived data.',
  },
  // CARRETERAS
  {
    id: 'infraestructura_vial',
    name: 'Monitoreo Inteligente de Infraestructura Vial',
    fixedCost: 25000,
    variableCost: 150,
    category: 'CARRETERAS',
    help: 'Monitoring of infrastructures. Assessment of areas affected by interventions.',
  },
  {
    id: 'trafico_prevencion',
    name: 'Optimización y Prevención del Tráfico',
    fixedCost: 25000,
    variableCost: 90,
    category: 'CARRETERAS',
    help: 'Prediction of high-congestion areas. Analysis of malfunctioning road elements. Generation of alternative routes. Planning of new road element installations. Identification of road infrastructure failures. Detection of unauthorized traffic in restricted zones.',
  },
  {
    id: 'trafico_respuesta',
    name: 'Respuesta Rápida y Gestión del Tráfico',
    fixedCost: 25000,
    variableCost: 150,
    category: 'CARRETERAS',
    help: 'Real-time alert generation. Awareness campaigns using signboards with greenhouse gas (GHG) emission information. Creation of a waste removal system. Development of climate-resilient infrastructure.',
  },
  // GESTIÓN RESIDUOS
  {
    id: 'residuos_recogida',
    name: 'Optimización de Recogida de Residuos',
    fixedCost: 25000,
    variableCost: 90,
    category: 'GESTIÓN RESIDUOS',
    help: 'Status updates of containers (malfunction, fill levels, etc.). Analysis of environmental variables. Prediction of container fill levels. Identification of overconsumption patterns by area.',
  },
  {
    id: 'residuos_transporte',
    name: 'Gestión Inteligente del Transporte de Residuos',
    fixedCost: 20000,
    variableCost: 100,
    category: 'GESTIÓN RESIDUOS',
    help: 'Monitoring of vehicle routes and positions. Performance metrics analysis. Monitoring of driver behavior. CO₂ emissions tracking. Optimization of collection routes. Immediate response to reinforcement needs. Information exchange between vehicles and sensors.',
  },
  {
    id: 'residuos_tratamiento',
    name: 'Plataforma de Tratamiento de Residuos',
    fixedCost: 20000,
    variableCost: 100,
    category: 'GESTIÓN RESIDUOS',
    help: 'Analysis of waste composition. CO₂ emissions monitoring from disposal or reuse processes. Classification/segmentation of waste. Development of efficiency models for CO₂ emissions by process type.',
  },
  // URBANISMO
  {
    id: 'urbanismo_salud',
    name: 'Monitoreo Ambiental y Salud Pública',
    fixedCost: 20000,
    variableCost: 90,
    category: 'URBANISMO',
    help: 'Data collection among the population. Measurement of environmental factors. Inventory of areas affected by fires or deforestation. Air quality modeling. Adjustment of road elements such as traffic lights. Creation of low-emission/high-air-quality zones. Adaptation of environmental restrictions. Development of immediate response systems for extreme situations.',
  },
  {
    id: 'urbanismo_planificacion',
    name: 'Planificación Urbana Inteligente',
    fixedCost: 20000,
    variableCost: 90,
    category: 'URBANISMO',
    help: 'Data collection on incidents. Creation of a database for future projects. Monitoring of construction progress and changes. Population growth modeling. Optimization of green spaces. Development of a more efficient and environmentally friendly construction plan.',
  },
  {
    id: 'urbanismo_hotspots',
    name: 'Detección y Prevención de Zonas de Riesgo',
    fixedCost: 20000,
    variableCost: 90,
    category: 'URBANISMO',
    help: 'Generation of statistics on incidents, deaths, and injuries per case. Conducting surveys on living standards and infections/diseases. Models for detection and prediction of crowding and accidents. Crime detection models. Disease monitoring and forecasting. Improved road safety in high-risk areas. Better road design in high-traffic zones. Enhanced citizen services in areas with high crime/disease rates.',
  },
];

export const calculateCost = (
  selectedApps: string[],
  areas: { [key: string]: number },
): YearlyCosts[] => {
  const yearlyCosts: YearlyCosts[] = [];
  const km2 = Math.max(areas['gemelo_digital'] || 0, 100);

  // Onboarding Calculation
  const onboardingGemelo = selectedApps.includes('gemelo_digital')
    ? 170 * km2
    : 0;
  const onboardingAdaptacion = (onboardingGemelo * 40) / 52;
  const onboardingDesarrollo = (onboardingAdaptacion * 8) / 40;

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
    const gemeloCost = selectedApps.includes('gemelo_digital') ? km2 * rate : 0;
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
