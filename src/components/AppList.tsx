import React from 'react';
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Application } from '@/types';

interface AppListProps {
  applications: Application[];
  selectedApps: string[];
  handleAppToggle: (appId: string) => void;
  handleAreaChange: (appId: string, value: number) => void;
  areas: { [key: string]: number };
  handleOpenHelp: (app: Application) => void;
}

export const AppList: React.FC<AppListProps> = ({
  applications,
  selectedApps,
  handleAppToggle,
  handleAreaChange,
  areas,
  handleOpenHelp,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
      {applications.map((app) => (
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
            <Typography variant="body2" style={{color: 'black', fontSize: 'small'}}>{app.name}</Typography>
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
};