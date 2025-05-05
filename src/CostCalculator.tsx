'use client';

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { applications, calculateCost } from './utils/costUtility';
import { Application, YearlyCosts } from './types/calculator.types';
import { HelpModal } from './components/ui/modals/HelpModal';
import { CategorySelector } from './components/CategorySelector';
import { CostsTable } from './components/CostTable';

const CostCalculator: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [areas, setAreas] = useState<{ [key: string]: number }>({});
  const [costs, setCosts] = useState<YearlyCosts[] | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>('GEMELO_DIGITAL');
  const [openHelp, setOpenHelp] = useState(false);
  const [selectedHelpApp, setSelectedHelpApp] = useState<Application | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    capaDinamica: false,
  });

  const categories: { [key: string]: string } = {
    GEMELO_DIGITAL: 'Gemelo Digital',
    CAPA_DINAMICA: 'Capa Dinámica',
    EMERGENCIAS: 'Emergencias',
    CARRETERAS: 'Carreteras',
    'GESTIÓN RESIDUOS': 'Gestión de Residuos',
    URBANISMO: 'Urbanismo',
  };

  const handleAppToggle = (appId: string): void => {
    setSelectedApps((prev) => {
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
    setAreas((prev) => ({ ...prev, [appId]: validValue }));
  };

  const handleCalculate = (): void => {
    const calculatedCosts = calculateCost(selectedApps, areas);
    setCosts(calculatedCosts);
  };

  const handleOpenHelp = (app: Application) => {
    setSelectedHelpApp(app);
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
    setSelectedHelpApp(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Box sx={{ maxWidth: '95vw', mx: 'auto', p: 3 }}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ mb: 1 }} color="text.primary">
            Application Cost Calculator (4 years)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select the applications and the area of interest to calculate the total cost.
          </Typography>
        </Box>

        <Box sx={{
          gap: 4,
          p: 3
        }}>
          <Box sx={{}}>
            <Box sx={{
              mb: 3,
            }}>
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
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleCalculate}
              sx={{ mb: 2, backgroundColor: '#02B1FF' }}
            >
              Calculate Cost
            </Button>
          </Box>


          
            {costs && (
              <Box sx={{}}>
              <CostsTable
              costs={costs}
              selectedApps={selectedApps}
              applications={applications}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              areas={areas}
            />
            </Box>
          )}
        </Box>
      </Box>
      <HelpModal
        open={openHelp}
        onClose={handleCloseHelp}
        application={selectedHelpApp}
      />
    </Box>
  );
};

export default CostCalculator;