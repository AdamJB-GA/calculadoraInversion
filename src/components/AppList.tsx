import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Application } from '../types/calculator.types';

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
  // Define la función getImageUrl directamente en este componente
  const getImageUrl = (app: Application) => {
    const placeholders: { [key: string]: string } = {
      gemelo_digital: '/images/eco.jpg',
      capa_dinamica: '/images/eco.jpg',
      incendios: '/images/incendios.jpg',
      inundaciones: '/images/incendios.jpg',
      residuos: '/images/forestal.jpg',
      trafico: '/images/trafico.jpg',
      obras: '/images/trafico.jpg',
    };
    return placeholders[app.id] || './images/trafico.jpg';
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {applications.map((app) => {
        const isSelected = selectedApps.includes(app.id);
        
        return (
          <div
            key={app.id}
            className={`bg-gray-800 rounded-2xl shadow-md border transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-800' : 'border-gray-700'
            }`}
            style={{
              backgroundColor: 'var(--card)',
              borderColor: isSelected ? 'var(--chart-1)' : 'var(--border)'
            }}
          >
            {/* Imagen y nombre */}
            <div
              className="cursor-pointer"
              onClick={() => handleAppToggle(app.id)}
            >
              <img
                src={getImageUrl(app)}
                alt={`Imagen de ${app.name}`}
                className={`w-full h-40 object-cover ${
                  isSelected ? '' : 'grayscale opacity-70'
                }`}
              />
            </div>

            {/* Detalles y controles */}
            <div className="p-4">
              <h3 
                className="text-lg font-semibold mb-1"
                style={{ color: 'var(--foreground)' }}
              >
                {app.name}
              </h3>
              <p 
                className="text-sm mb-2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {app.description || `Aplicación para gestionar ${app.name.toLowerCase()}`}
              </p>
              <div className="flex flex-wrap gap-2 text-sm mb-3">
                <span 
                  className="px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: 'var(--chart-1)', 
                    color: 'var(--foreground)', 
                    opacity: 0.8 
                  }}
                >
                  Costo fijo: {app.fixedCost}€
                </span>
                {app.variableCost > 0 && (
                  <span 
                    className="px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: 'var(--chart-4)', 
                      color: 'var(--foreground)',
                      opacity: 0.8
                    }}
                  >
                    {app.variableCost}€ / km²
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground)' }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleAppToggle(app.id)}
                    className="h-4 w-4 rounded"
                    style={{ 
                      accentColor: 'var(--chart-1)',
                      backgroundColor: 'var(--secondary)',
                      borderColor: 'var(--border)'
                    }}
                  />
                  Seleccionar
                </label>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenHelp(app);
                  }}
                  className="hover:opacity-80"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label={`Ayuda para ${app.name}`}
                >
                  <HelpCircle size={16} />
                </button>
              </div>

              {app.variableCost > 0 && isSelected && (
                <div className="mt-3">
                  <label 
                    className="block text-sm mb-1"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Área (km²)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={areas[app.id] ?? ''}
                      onChange={(e) => handleAreaChange(app.id, Number(e.target.value))}
                      min={0}
                      placeholder="Ej: 150"
                      className="w-full pl-3 pr-10 py-2 rounded-md text-sm"
                      style={{ 
                        backgroundColor: 'var(--secondary)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                      onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer click
                    />
                    <span 
                      className="absolute right-3 top-2.5 text-sm pointer-events-none"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      km²
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};