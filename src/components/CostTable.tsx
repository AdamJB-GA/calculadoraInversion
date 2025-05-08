// Importaciones necesarias de React y tipos definidos en otro archivo.
import React from 'react';
import { Application, YearlyCosts } from '../types/calculator.types';

// Componente que formatea un número como moneda en formato euro.
const CurrencyFormatter = ({ value }: { value: number }) => {
  return <>{value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</>;
};

// Props que espera el componente CostsTable
interface CostsTableProps {
  costs: YearlyCosts[] | null; // Lista de costos por año o null
  selectedApps: string[]; // IDs de las aplicaciones seleccionadas
  applications: Application[]; // Lista completa de aplicaciones
  expandedSections: {
    [key: string]: boolean; // Controla qué secciones están expandidas
  };
  toggleSection: (section: string) => void; // Función para expandir/contraer secciones
  areas: { [key: string]: number }; // Selected areas
}

// Definición del componente funcional CostsTable
const CostsTable: React.FC<CostsTableProps> = ({
  costs,
  selectedApps,
  applications = [],
  expandedSections,
  toggleSection,
  areas,
}) => {
  // Si no hay costos disponibles, muestra un mensaje informativo
  if (!costs || costs.length === 0) {
    return (
      <div className="p-6 text-center rounded-lg shadow-md" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
        <h3 className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>
          No hay datos de costos disponibles.
        </h3>
      </div>
    );
  }

  // Filtra las aplicaciones dinámicas seleccionadas, excluyendo gemelo_digital y capa_dinamica
  const selectedDynamicLayers = applications.filter(
    (app) =>
      app.id !== 'gemelo_digital' &&
      app.id !== 'capa_dinamica' &&
      selectedApps.includes(app.id),
  );

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Categoría</th>
            <th className="px-4 py-3 text-right text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Onboarding</th>
            {[1, 2, 3, 4].map((year) => (
              <th key={year} className="px-4 py-3 text-right text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Año {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Fila para Gemelo Digital, si está seleccionada */}
          {selectedApps.includes('gemelo_digital') && (
            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} 
                className="hover:opacity-90">
              <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Gemelo Digital</td>
              <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter value={costs[0].gemeloCost || 0} />
              </td>
              {costs.slice(1).map((yearCost, i) => (
                <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                  <CurrencyFormatter value={yearCost.gemeloCost || 0} />
                </td>
              ))}
            </tr>
          )}

          {/* Fila principal para Capa Dinámica y sub-filas si está expandida */}
          {selectedApps.includes('capa_dinamica') && (
            <>
              <tr 
                style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}
                className="hover:opacity-90 cursor-pointer"
                onClick={() => toggleSection('capaDinamica')}
              >
                <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                  <div className="flex items-center">
                    {/* Icono de expandir/contraer */}
                    <span className="mr-2">
                      {expandedSections.capaDinamica ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                    Capa Dinámica (Costo Base)
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                  <CurrencyFormatter value={costs[0].capaDinamicaCost || 0} />
                </td>
                {costs.slice(1).map((yearCost, i) => (
                  <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                    <CurrencyFormatter value={yearCost.capaDinamicaCost || 0} />
                  </td>
                ))}
              </tr>

              {/* Sub-filas para cada aplicación dentro de capa dinámica, si está expandida */}
              {expandedSections.capaDinamica &&
                selectedDynamicLayers.map((app) => (
                  <tr key={app.id} style={{ 
                        borderBottom: '1px solid var(--border)', 
                        backgroundColor: 'var(--accent)',
                        transition: 'background-color 0.2s' 
                      }} 
                      className="hover:opacity-90">
                    <td className="px-4 py-2 text-sm pl-10" style={{ color: 'var(--accent-foreground)' }}>
                      {app.name} <span style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>({areas[app.id] ? areas[app.id] : '100'} km²)</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--accent-foreground)' }}>
                      <CurrencyFormatter value={costs[0].otherAppsCosts?.[app.id] || 0} />
                    </td>
                    {costs.slice(1).map((yearCost, i) => (
                      <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--accent-foreground)' }}>
                        <CurrencyFormatter value={yearCost.otherAppsCosts?.[app.id] || 0} />
                      </td>
                    ))}
                  </tr>
                ))}
            </>
          )}

          {/* Fila de adaptación de modelos */}
          <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} 
              className="hover:opacity-90">
            <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Adaptación Modelo de Datos y Modelos Analíticos</td>
            <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
              <CurrencyFormatter value={costs[0].adaptacionCost || 0} />
            </td>
            {costs.slice(1).map((yearCost, i) => (
              <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter value={yearCost.adaptacionCost || 0} />
              </td>
            ))}
          </tr>

          {/* Fila de desarrollo de aplicaciones */}
          <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} 
              className="hover:opacity-90">
            <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Desarrollo de Aplicaciones y Capas de Datos Base</td>
            <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
              <CurrencyFormatter value={costs[0].desarrolloCost || 0} />
            </td>
            {costs.slice(1).map((yearCost, i) => (
              <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter value={yearCost.desarrolloCost || 0} />
              </td>
            ))}
          </tr>

          {/* Fila de mantenimiento básico, si existe */}
          {costs[0].mantenimientoBasicoCost !== undefined && (
            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} 
                className="hover:opacity-90">
              <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Mantenimiento Básico</td>
              <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter value={costs[0].mantenimientoBasicoCost || 0} />
              </td>
              {costs.slice(1).map((yearCost, i) => (
                <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                  <CurrencyFormatter value={yearCost.mantenimientoBasicoCost || 0} />
                </td>
              ))}
            </tr>
          )}

          {/* Fila de mantenimiento personalizado, si existe */}
          {costs[0].mantenimientoCustomizadoCost !== undefined && (
            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} 
                className="hover:opacity-90">
              <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Mantenimiento Personalizado</td>
              <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter value={costs[0].mantenimientoCustomizadoCost || 0} />
              </td>
              {costs.slice(1).map((yearCost, i) => (
                <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                  <CurrencyFormatter value={yearCost.mantenimientoCustomizadoCost || 0} />
                </td>
              ))}
            </tr>
          )}

          {/* Fila de resumen para otras apps, si existen */}
          {selectedDynamicLayers.length > 0 && (
            <tr style={{ backgroundColor: 'var(--ring)', borderTop: '2px solid var(--foreground)', transition: 'background-color 0.2s' }} 
                className="hover:opacity-90">
              <td className="px-4 py-2 text-sm" style={{ color: 'var(--foreground)' }}>Subtotal Casos de Uso</td>
              <td className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                <CurrencyFormatter
                  value={Object.values(costs[0].otherAppsCosts || {}).reduce((sum, value) => sum + value, 0)}
                />
              </td>
              {costs.slice(1).map((yearCost, i) => (
                <td key={i} className="px-4 py-2 text-sm text-right" style={{ color: 'var(--foreground)' }}>
                  <CurrencyFormatter
                    value={Object.values(yearCost.otherAppsCosts || {}).reduce((sum, value) => sum + value, 0)}
                  />
                </td>
              ))}
            </tr>
          )}

          {/* Fila total por año */}
          <tr style={{ backgroundColor: 'var(--secondary)' }} className="font-bold">
            <td className="px-4 py-3 text-sm" style={{ color: 'var(--secondary-foreground)' }}>TOTAL</td>
            {costs.map((yearCost, i) => (
              <td key={i} className="px-4 py-3 text-sm text-right" style={{ color: 'var(--secondary-foreground)' }}>
                <CurrencyFormatter value={yearCost.totalCost || 0} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Coste total acumulado de los 4 años */}
      <div className="mt-4 text-right font-bold" style={{ color: 'var(--foreground)' }}>
        Coste Total (4 años):{' '}
        <CurrencyFormatter
          value={costs.reduce((acc, year) => acc + (year.totalCost || 0), 0)}
        />
      </div>
    </div>
  );
};

// Exporta el componente para ser utilizado en otras partes del proyecto
export default CostsTable;