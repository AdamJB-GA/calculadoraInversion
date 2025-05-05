import React from 'react';
import { HelpCircle } from 'lucide-react';
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
    <div className="bg-gray-900 p-6 rounded-lg">
      {/* Header horizontal de categorías */}
      <div className="flex gap-2 flex-wrap mb-3 border-b border-gray-700 pb-1">
        {Object.entries(categories).map(([category, label]) => (
          <button
            key={category}
            onClick={() =>
              setOpenCategory(openCategory === category ? null : category)
            }
            className={`px-4 py-2 rounded-md transition-colors ${
              openCategory === category 
                ? 'bg-gray-700 text-gray-100' 
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenido dinámico según la categoría seleccionada */}
      {openCategory && (
        <div>
          {openCategory === 'CAPA_DINAMICA' ? (
            <CapaDinamicaItem
              selectedApps={selectedApps}
              handleAppToggle={handleAppToggle}
              handleOpenHelp={handleOpenHelp}
              applications={applications}
            />
          ) : (
            <AppList
              applications={applications.filter(
                (app) => app.category === openCategory
              )}
              selectedApps={selectedApps}
              handleAppToggle={handleAppToggle}
              handleAreaChange={handleAreaChange}
              areas={areas}
              handleOpenHelp={handleOpenHelp}
            />
          )}
        </div>
      )}
    </div>
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
    <div className="flex items-center justify-between gap-1 px-2 py-1 border border-gray-700 rounded bg-gray-800">
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={selectedApps.includes('capa_dinamica')}
          onChange={() => handleAppToggle('capa_dinamica')}
          className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-gray-500"
        />
        <span className="text-sm text-gray-300">Capa Dinámica</span>
      </div>
      <button
        onClick={() =>
          handleOpenHelp(
            applications.find((app) => app.id === 'capa_dinamica')!
          )
        }
        className="text-gray-400 hover:text-gray-200 p-1"
      >
        <HelpCircle size={16} />
      </button>
    </div>
  );
};