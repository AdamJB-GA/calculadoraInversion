import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Application, YearlyCosts } from '../types/calculator.types';
import { CurrencyFormatter } from './CurrencyFormatter';

interface CostsTableProps {
  costs: YearlyCosts[];
  selectedApps: string[];
  applications: Application[];
  expandedSections: {
    [key: string]: boolean;
  };
  toggleSection: (section: string) => void;
  areas: { [key: string]: number };
}

export const CostsTable: React.FC<CostsTableProps> = ({
  costs,
  selectedApps,
  applications,
  expandedSections,
  toggleSection,
  areas,
}) => {
  const mainCategories = [
    'GEMELO_DIGITAL',
    'EMERGENCIAS',
    'CARRETERAS',
    'GESTIÓN RESIDUOS',
    'URBANISMO',
  ];

  // Update the selectedDynamicLayers definition to include all applications except gemelo_digital and capa_dinamica
  const selectedDynamicLayers = applications.filter(
    (app) =>
      app.id !== 'gemelo_digital' &&
      app.id !== 'capa_dinamica' &&
      selectedApps.includes(app.id),


  )
  console.log(areas);


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
              <CurrencyFormatter value={costs[0].gemeloCost} />
            </TableCell>
            {costs.slice(1).map((yearCost, i) => (
              <TableCell key={i} align="right">
                <CurrencyFormatter value={yearCost.gemeloCost} />
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
                      : <CurrencyFormatter value={yearCost.capaDinamicaCost} />}
                  </TableCell>
                ))}
              </TableRow>

              {/* Subcapas de Capa Dinámica - Only render when expanded */}
              {expandedSections.capaDinamica &&
                selectedDynamicLayers.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell sx={{ pl: 6 }}>
                      {app.name}
                      {/* Displays selected Km² per service */}
                      <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                        ({areas[app.id] ? `${areas[app.id]} km²` : '100 km²'})
                      </Typography>
                    </TableCell>
                    {costs.map((yearCost, i) => (
                      <TableCell key={i} align="right">
                        {i === 0
                          ? ''
                          : <CurrencyFormatter value={yearCost.otherAppsCosts[app.id] || 0} />}
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
              <CurrencyFormatter value={costs[0].adaptacionCost} />
            </TableCell>
            {costs.slice(1).map((yearCost, i) => (
              <TableCell key={i} align="right">
                <CurrencyFormatter value={yearCost.adaptacionCost} />
              </TableCell>
            ))}
          </TableRow>

          {/* Desarrollo de Aplicaciones */}
          <TableRow>
            <TableCell>
              Desarrollo de Aplicaciones y Capas de Datos Base
            </TableCell>
            <TableCell align="right">
              <CurrencyFormatter value={costs[0].desarrolloCost} />
            </TableCell>
            {costs.slice(1).map((_, i) => (
              <TableCell key={i} align="right"></TableCell>
            ))}
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
                      <CurrencyFormatter value={yearCost.otherAppsCosts[app.id] || 0} />
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
                <CurrencyFormatter value={yearCost.totalCost * 0.35} />
              </TableCell>
            ))}
          </TableRow>

          {/* Total - Update to include Datos cost */}
          <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
            <TableCell>TOTAL</TableCell>
            {costs.map((yearCost, i) => (
              <TableCell key={i} align="right">
                <CurrencyFormatter value={yearCost.totalCost * 1.35} />
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
        <CurrencyFormatter
          value={costs.reduce((acc, year) => acc + year.totalCost * 1.35, 0)}
        />
      </Typography>
    </Box>
  );
};