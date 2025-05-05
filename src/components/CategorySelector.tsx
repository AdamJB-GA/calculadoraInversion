import React from 'react';
import {
  Box,
  Button,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
  return (
    <>
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
                <CapaDinamicaItem 
                  selectedApps={selectedApps}
                  handleAppToggle={handleAppToggle}
                  handleOpenHelp={handleOpenHelp}
                  applications={applications}
                />
              ) : (
                <AppList
                  applications={applications.filter((app) => app.category === category)}
                  selectedApps={selectedApps}
                  handleAppToggle={handleAppToggle}
                  handleAreaChange={handleAreaChange}
                  areas={areas}
                  handleOpenHelp={handleOpenHelp}
                />
              )}
            </Box>
          )}
        </Box>
      ))}
    </>
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
        <Typography variant="body2" style={{color: 'black'}}>Capa Dinámica</Typography>
      </Box>
      <Typography variant='body2' color='text.secondary' style={{'fontSize': 'xx-small'}}>Servicio base necesario. Se aplicará automáticamente al seleccionar cualquier servicio que no sea el Gemelo Digital</Typography>
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
  );
};