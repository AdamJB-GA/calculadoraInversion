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

  // Removed dark mode effect

  const categories = servicesJson.supportServices.map((service) => service.name);

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
    const calculatedCosts = calculateCost(applications, selectedApps, areas);
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
    <div className="dark min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="rounded-lg shadow-xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          <div 
            className="p-6 flex justify-between items-center" 
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div>
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--foreground)' }}
              >
                Selecciona los KPIs a incluir
              </h2>
              <p 
                className="text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Escoge las aplicaciones y el área de interés para calcular el coste total.
              </p>
            </div>
            <button
              onClick={handleCalculate}
              className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                selectedApps.length === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              style={{ 
                backgroundColor: selectedApps.length === 0 ? 'var(--secondary)' : 'var(--primary)',
                color: selectedApps.length === 0 ? 'var(--secondary-foreground)' : 'var(--primary-foreground)',
                opacity: selectedApps.length === 0 ? 0.5 : 1
              }}
              disabled={selectedApps.length === 0}
            >
              Seleccionar
            </button>
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