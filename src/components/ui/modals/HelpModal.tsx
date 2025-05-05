import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Typography 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Application } from '../../../types/calculator.types';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  application: Application | null;
}

export const HelpModal: React.FC<HelpModalProps> = ({ open, onClose, application }) => {
  if (!application) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {application.name} - Información de ayuda
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Descripción
        </Typography>
        <Typography paragraph>
          {application.description || 'No hay descripción disponible para esta aplicación.'}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Ayuda
        </Typography>
        <Typography paragraph>
          {application.help || 'No hay ayuda disponible para esta aplicación.'}
        </Typography>
        
        {application.id === 'capa_dinamica' && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Capa Dinámica
            </Typography>
            <Typography paragraph>
              La Capa Dinámica es un servicio base necesario para todas las aplicaciones adicionales.
              Se activa automáticamente cuando seleccionas cualquier aplicación que no sea el Gemelo Digital.
            </Typography>
          </>
        )}
        
        {application.variableCost > 0 && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Costo por área
            </Typography>
            <Typography paragraph>
              Esta aplicación tiene un costo variable basado en el área seleccionada.
              El costo base se calcula por km² y puede variar dependiendo del área total.
            </Typography>
          </>
        )}
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Información de costos
        </Typography>
        <Typography paragraph>
          Costo fijo: {application.fixedCost > 0 ? `${application.fixedCost}€` : 'No aplicable'}
          <br />
          Costo variable: {application.variableCost > 0 ? `${application.variableCost}€ por km²` : 'No aplicable'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
};