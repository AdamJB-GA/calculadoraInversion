import React from 'react';
import { Application } from '../types/calculator.types';
import { AppList } from './AppList';

interface CategorySelectorProps {
  categories: string[];
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
  // Filtramos "Capa Dinamica" de las categorías visibles
  // pero mantenemos la funcionalidad en selectedApps
  const visibleCategories = categories.filter(category => category !== 'Capa Dinamica');

  // Aseguramos que 'capa_dinamica' siempre esté en selectedApps
  // Este efecto deberá implementarse en el componente padre
  // React.useEffect(() => {
  //   if (!selectedApps.includes('capa_dinamica')) {
  //     handleAppToggle('capa_dinamica');
  //   }
  // }, []);

  return (
    <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header horizontal de categorías - Sin mostrar "Capa Dinamica" */}
      <div className="flex gap-2 flex-wrap mb-3 pb-1" style={{ borderBottom: '1px solid var(--border)' }}>
        {visibleCategories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setOpenCategory(openCategory === category ? null : category)
            }
            className="px-4 py-2 rounded-md transition-colors cursor-pointer"
            style={{
              backgroundColor: openCategory === category ? 'var(--accent)' : 'var(--card)',
              color: openCategory === category ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
              border: openCategory === category ? 'none' : '1px solid var(--border)'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Contenido dinámico según la categoría seleccionada */}
      {openCategory && (
        <div>
          {/* Eliminamos la renderización condicional para "Capa Dinamica" */}
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
        </div>
      )}
    </div>
  );
};

// El componente CapaDinamicaItem ya no es necesario y se puede eliminar
// Se ha eliminado porque ya no renderizamos este componente específicamente