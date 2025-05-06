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
  console.log(applications);
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
              <h3 className="text-lg font-semibold text-gray-100 mb-1">
                {app.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {app.description || `Aplicación para gestionar ${app.name.toLowerCase()}`}
              </p>
              <div className="flex flex-wrap gap-2 text-sm mb-3">
                <span className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
                  Costo fijo: {app.fixedCost}€
                </span>
                {app.variableCost > 0 && (
                  <span className="bg-purple-900 text-purple-200 px-2 py-0.5 rounded">
                    {app.variableCost}€ / km²
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleAppToggle(app.id)}
                    className="h-4 w-4 text-blue-600 bg-gray-700 rounded border-gray-600 focus:ring-blue-500"
                  />
                  Seleccionar
                </label>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenHelp(app);
                  }}
                  className="text-gray-400 hover:text-blue-400"
                  aria-label={`Ayuda para ${app.name}`}
                >
                  <HelpCircle size={16} />
                </button>
              </div>

              {app.variableCost > 0 && isSelected && (
                <div className="mt-3">
                  <label className="block text-sm text-gray-300 mb-1">
                    Área (km²)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={areas[app.id] ?? ''}
                      onChange={(e) => handleAreaChange(app.id, Number(e.target.value))}
                      min={0}
                      placeholder="Ej: 150"
                      className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer click
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-400 pointer-events-none">
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