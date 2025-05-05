'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { HelpModal } from '@components/ui/modals/HelpModal';
import { applications, calculateCost } from './utils/costUtility';
import { Application, YearlyCosts } from '@/types';

const CostCalculator: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [areas, setAreas] = useState<{ [key: string]: number }>({});
  const [costs, setCosts] = useState<YearlyCosts[] | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    capaDinamica: false,
  });

  const [openHelp, setOpenHelp] = useState(false);
  const [selectedHelpApp, setSelectedHelpApp] = useState<Application | null>(
    null,
  );

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
        ? prev.filter((id) => id !== appId) // Si estaba seleccionado, lo eliminamos
        : [...prev, appId]; // Si no estaba seleccionado, lo agregamos

      // Verificar si hay otros servicios seleccionados (excluyendo "gemelo_digital" y "capa_dinamica")
      const hasOtherServices = updatedApps.some(
        (id) => id !== 'gemelo_digital' && id !== 'capa_dinamica',
      );

      // Si se selecciona un servicio que no sea "gemelo_digital", activar "capa_dinamica"
      if (
        !isSelected &&
        appId !== 'gemelo_digital' &&
        !updatedApps.includes('capa_dinamica')
      ) {
        updatedApps.push('capa_dinamica');
      }

      // Si no queda ningún otro servicio activo excepto "gemelo_digital", desactivar "capa_dinamica"
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
    console.log('Opening help for app:', app);
    setSelectedHelpApp(app);
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    console.log('Closing help');
    setOpenHelp(false);
    setSelectedHelpApp(null);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const renderAppInputs = (categoryApps: Application[]): JSX.Element => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
      {categoryApps.map((app) => (
        <Box
          key={app.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <Checkbox
              checked={selectedApps.includes(app.id)}
              onChange={() => handleAppToggle(app.id)}
              size="small"
            />
            <Typography variant="body2">{app.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{ marginRight: 1 }}
              onClick={() => handleOpenHelp(app)}
            >
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
            {app.variableCost > 0 && (
              <>
                <TextField
                  type="number"
                  value={areas[app.id] || 100}
                  onChange={(e) =>
                    handleAreaChange(app.id, Number(e.target.value))
                  }
                  placeholder="km²"
                  size="small"
                  sx={{ width: 100 }}
                  inputProps={{
                    min: 100,
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  km²
                </Typography>
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderCostsTable = () => {
    if (!costs) return null;

    const mainCategories = [
      'GEMELO_DIGITAL',
      'EMERGENCIAS',
      'CARRETERAS',
      'GESTIÓN RESIDUOS',
      'URBANISMO',
    ];

    const toggleSection = (section: string) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    // Update the selectedDynamicLayers definition to include all applications except gemelo_digital and capa_dinamica
    const selectedDynamicLayers = applications.filter(
      (app) =>
        app.id !== 'gemelo_digital' &&
        app.id !== 'capa_dinamica' &&
        selectedApps.includes(app.id),
    );

    return (
      <Box sx={{ mt: 3, overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Onboarding</TableCell>
              {[1, 2, 3, 4].map((year) => (
                <TableCell key={year} align="right">
                  Año {year}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Gemelo Digital */}
            <TableRow>
              <TableCell>Gemelo Digital</TableCell>
              <TableCell align="right">
                {formatCurrency(costs[0].gemeloCost)}
              </TableCell>
              {costs.slice(1).map((yearCost, i) => (
                <TableCell key={i} align="right">
                  {formatCurrency(yearCost.gemeloCost)}
                </TableCell>
              ))}
            </TableRow>

            {/* Capa Dinámica */}
            {selectedApps.includes('capa_dinamica') && (
              <>
                <TableRow
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                  onClick={() => toggleSection('capaDinamica')}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {expandedSections.capaDinamica ? (
                        <KeyboardArrowDownIcon sx={{ mr: 1 }} />
                      ) : (
                        <KeyboardArrowRightIcon sx={{ mr: 1 }} />
                      )}
                      {'Capa Dinámica (Costo Base)'}
                    </Box>
                  </TableCell>
                  {costs.map((yearCost, i) => (
                    <TableCell key={i} align="right">
                      {i === 0
                        ? ' '
                        : formatCurrency(yearCost.capaDinamicaCost)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Subcapas de Capa Dinámica - Only render when expanded */}
                {expandedSections.capaDinamica &&
                  selectedDynamicLayers.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell sx={{ pl: 6 }}>{app.name}</TableCell>
                      {costs.map((yearCost, i) => (
                        <TableCell key={i} align="right">
                          {i === 0
                            ? ''
                            : formatCurrency(
                                yearCost.otherAppsCosts[app.id] || 0,
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}

            {/* Adaptación Modelo de Datos */}
            <TableRow>
              <TableCell>
                Adaptación Modelo de Datos y Modelos Analíticos
              </TableCell>
              <TableCell align="right">
                {formatCurrency(costs[0].adaptacionCost)}
              </TableCell>
              {costs.slice(1).map((yearCost, i) => (
                <TableCell key={i} align="right">
                  {formatCurrency(yearCost.adaptacionCost)}
                </TableCell>
              ))}
            </TableRow>

            {/* Desarrollo de Aplicaciones */}
            <TableRow>
              <TableCell>
                Desarrollo de Aplicaciones y Capas de Datos Base
              </TableCell>
              <TableCell align="right">
                {formatCurrency(costs[0].desarrolloCost)}
              </TableCell>
            </TableRow>

            {/* Otras aplicaciones por categoría */}
            {mainCategories.map((category) => {
              // Skip rendering any other categories if they're not Gemelo Digital
              if (category !== 'GEMELO_DIGITAL') return null;

              const categoryApps = applications.filter(
                (app) =>
                  app.category === category && app.id !== 'gemelo_digital',
              );

              if (!categoryApps.some((app) => selectedApps.includes(app.id)))
                return null;

              return categoryApps.map((app) => {
                if (!selectedApps.includes(app.id)) return null;
                return (
                  <TableRow key={app.id}>
                    <TableCell sx={{ pl: 4 }}>{app.name}</TableCell>
                    {costs.map((yearCost, i) => (
                      <TableCell key={i} align="right">
                        {formatCurrency(yearCost.otherAppsCosts[app.id] || 0)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              });
            })}

            {/* Datos */}
            <TableRow>
              <TableCell>Datos</TableCell>
              {costs.map((yearCost, i) => (
                <TableCell key={i} align="right">
                  {formatCurrency(yearCost.totalCost * 0.35)}
                </TableCell>
              ))}
            </TableRow>

            {/* Total - Update to include Datos cost */}
            <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
              <TableCell>TOTAL</TableCell>
              {costs.map((yearCost, i) => (
                <TableCell key={i} align="right">
                  {formatCurrency(yearCost.totalCost * 1.35)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: 'right',
            fontWeight: 'bold',
          }}
        >
          Total cost (4 years):{' '}
          {formatCurrency(
            costs.reduce((acc, year) => acc + year.totalCost * 1.35, 0),
          )}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: '70vw', mx: 'auto', p: 3 }}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Application Cost Calculator (4 years)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select the applications and the area of interest to calculate the
            total cost.
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            {Object.entries(categories).map(([category, label]) => (
              <Box
                key={category}
                sx={{
                  mb: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Button
                  fullWidth
                  onClick={() =>
                    setOpenCategory(openCategory === category ? null : category)
                  }
                  sx={{
                    justifyContent: 'space-between',
                    textTransform: 'none',
                    p: 2,
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body1">{label}</Typography>
                  {openCategory === category ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </Button>
                {openCategory === category && (
                  <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    {category === 'CAPA_DINAMICA' ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                          }}
                        >
                          <Checkbox
                            checked={selectedApps.includes('capa_dinamica')}
                            onChange={() => handleAppToggle('capa_dinamica')}
                            size="small"
                          />
                          <Typography variant="body2">Capa Dinámica</Typography>
                        </Box>
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          onClick={() =>
                            handleOpenHelp(
                              applications.find(
                                (app) => app.id === 'capa_dinamica',
                              )!,
                            )
                          }
                        >
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      renderAppInputs(
                        applications.filter((app) => app.category === category),
                      )
                    )}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCalculate}
            sx={{ mb: 2, backgroundColor: '#02B1FF' }}
          >
            Calculate Cost
          </Button>

          {renderCostsTable()}
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
