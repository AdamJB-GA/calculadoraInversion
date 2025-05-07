// src/pages/KPISelectorPage.tsx
'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateCost } from '../utils/costUtility';
import { Application } from '../types/calculator.types';
import { HelpModal } from '../components/ui/modals/HelpModal';
import { CategorySelector } from '../components/CategorySelector';
import { useAppStore } from '../stores/UseAppStore';
import servicesJson from '../assets/services.json';
import applications from '../utils/applications';

const KPISelectorPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    setSelectedApps,
    setAreas,
    setCosts,
  } = useAppStore();

  const [selectedApps, setLocalSelectedApps] = useState<string[]>([]);
  const [areas, setLocalAreas] = useState<{ [key: string]: number }>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openHelp, setOpenHelp] = useState(false);
  const [selectedHelpApp, setSelectedHelpApp] = useState<Application | null>(null);

  const categories = servicesJson.supportServices.map((service) => service.name);

  console.log("USECASEPARENT_______________")
  console.log(applications)

  const handleAppToggle = (appId: string): void => {
    setLocalSelectedApps((prev) => {
      const isSelected = prev.includes(appId);
      let updatedApps = isSelected
        ? prev.filter((id) => id !== appId)
        : [...prev, appId];

      const hasOtherServices = updatedApps.some(
        (id) => id !== 'gemelo_digital' && id !== 'capa_dinamica',
      );

      if (
        !isSelected &&
        appId !== 'gemelo_digital' &&
        !updatedApps.includes('capa_dinamica')
      ) {
        updatedApps.push('capa_dinamica');
      }

      if (!hasOtherServices) {
        updatedApps = updatedApps.filter((id) => id !== 'capa_dinamica');
      }

      return updatedApps;
    });
  };

  const handleAreaChange = (appId: string, value: number): void => {
    const validValue = Math.max(value, 100);
    setLocalAreas((prev) => ({ ...prev, [appId]: validValue }));
  };

  const handleCalculate = (): void => {
    const calculatedCosts = calculateCost(applications,selectedApps, areas);
    setSelectedApps(selectedApps);
    setAreas(areas);
    setCosts(calculatedCosts);
    navigate('/resume');
  };

  const handleOpenHelp = (app: Application) => {
    setSelectedHelpApp(app);
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
    setSelectedHelpApp(null);
  };

  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
      <div className="w-7xl mx-auto p-6 bg-gray-900" >
        <div className="bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-2">
              Selecciona los KPIs a incluir
            </h2>
            <p className="text-sm text-gray-400">
              Escoge las aplicaciones y el área de interés para calcular el coste total.
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6 min-h-[450px]">
              <CategorySelector
                categories={categories}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
                selectedApps={selectedApps}
                handleAppToggle={handleAppToggle}
                handleAreaChange={handleAreaChange}
                areas={areas}
                handleOpenHelp={handleOpenHelp}
                applications={applications}
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Seleccionar
            </button>
          </div>
        </div>
        <HelpModal
          open={openHelp}
          onClose={handleCloseHelp}
          application={selectedHelpApp}
        />
      </div>
    </div>

  );
};

export default KPISelectorPage;