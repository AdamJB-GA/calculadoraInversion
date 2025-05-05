import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Application } from '../types/calculator.types';
import { AppList } from './AppList';

interface CategorySelectorProps {
  categories: { [key: string]: string };
  openCategory: string | null;
  setOpenCategory: (category: string | null) => void;
  selectedApps: string[];
  handleAppToggle: (appId: string) => void;
  handleAreaChange: (appId: string, value: number) => void;
  areas: { [key: string]: number };
  handleOpenHelp: (app: Application) => void;
  applications: Application[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  openCategory,
  setOpenCategory,
  selectedApps,
  handleAppToggle,
  handleAreaChange,
  areas,
  handleOpenHelp,
  applications,
}) => {
  const categoryKeys = Object.keys(categories);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenCategory(newValue);
  };

  return (
    <Box>
      <Tabs
        value={openCategory || categoryKeys[0]}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {categoryKeys.map((key) => (
          <Tab key={key} label={categories[key]} value={key} />
        ))}
      </Tabs>

      <Box sx={{ p: 2 }}>
        {openCategory === 'CAPA_DINAMICA' ? (
          <CapaDinamicaItem
            selectedApps={selectedApps}
            handleAppToggle={handleAppToggle}
            handleOpenHelp={handleOpenHelp}
            applications={applications}
          />
        ) : (
          <AppList
            applications={applications.filter((app) => app.category === openCategory)}
            selectedApps={selectedApps}
            handleAppToggle={handleAppToggle}
            handleAreaChange={handleAreaChange}
            areas={areas}
            handleOpenHelp={handleOpenHelp}
          />
        )}
      </Box>
    </Box>
  );
};

interface CapaDinamicaItemProps {
  selectedApps: string[];
  handleAppToggle: (appId: string) => void;
  handleOpenHelp: (app: Application) => void;
  applications: Application[];
}

const CapaDinamicaItem: React.FC<CapaDinamicaItemProps> = ({
  selectedApps,
  handleAppToggle,
  handleOpenHelp,
  applications,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Checkbox
          checked={selectedApps.includes('capa_dinamica')}
          onChange={() => handleAppToggle('capa_dinamica')}
          size="small"
        />
        <Typography variant="body2" style={{ color: 'black' }}>
          Capa Dinámica
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" fontSize="xx-small">
        Servicio base necesario. Se aplicará automáticamente al seleccionar cualquier servicio que no sea el Gemelo Digital
      </Typography>
      <IconButton
        onClick={() =>
          handleOpenHelp(applications.find((app) => app.id === 'capa_dinamica')!)
        }
      >
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
