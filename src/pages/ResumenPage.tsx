'use client';

import { useAppStore } from '../stores/UseAppStore'; // Zustand Store
import { applications } from '../utils/costUtility';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const ResumenPage = () => {
    // Obtenemos el estado global
    const selectedApps = useAppStore((state) => state.selectedApps);
    const areas = useAppStore((state) => state.areas);

    // Filtramos las aplicaciones seleccionadas
    const selectedApplications = applications.filter((app) =>
        selectedApps.includes(app.id),
    );

    // Usamos useNavigate para navegar programáticamente
    const navigate = useNavigate();

    // Función para navegar hacia la página de calculadora
    const handleNavigateToCalculator = () => {
        navigate('/calcular'); // Redirige a la página de cálculo
    };

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
            <div className="max-w-5xl mx-auto p-6 bg-gray-900">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Resumen de KPIs Seleccionados
                        </h2>
                        <p className="text-sm text-gray-400">
                            Aquí puedes ver las aplicaciones seleccionadas y sus costos asociados.
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="bg-gray-700 rounded-xl shadow-md border border-gray-600 overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                {app.name}
                                            </h3>
                                            <p className="text-sm text-gray-300 mb-2">
                                                {app.description || `Aplicación para gestionar ${app.name.toLowerCase()}`}
                                            </p>
                                            <div className="text-sm text-gray-300 mb-2">
                                                Costo fijo: {app.fixedCost}€
                                            </div>
                                            {app.variableCost > 0 && (
                                                <div className="text-sm text-gray-300 mb-2">
                                                    Variable: {app.variableCost}€/km² × {areas[app.id] || 100} km²
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleNavigateToCalculator}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Calcular Costes
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ResumenPage;