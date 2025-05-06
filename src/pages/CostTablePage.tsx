import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CostsTable from '../components/CostTable';
import { useAppStore } from '../stores/UseAppStore';
import { calculateCost, applications } from '../utils/costUtility';
import { YearlyCosts } from '../types/calculator.types';

const CostTablePage: React.FC = () => {
    const navigate = useNavigate();
    const selectedApps = useAppStore((state) => state.selectedApps);
    const areas = useAppStore((state) => state.areas);

    const [expandedSections, setExpandedSections] = useState<{
        [key: string]: boolean;
    }>({
        capaDinamica: false,
    });

    const [costs, setCosts] = useState<YearlyCosts[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    useEffect(() => {
        const calculateCosts = () => {
            if (selectedApps && selectedApps.length > 0) {
                try {
                    console.log("Calculando costos con:", { selectedApps, areas });

                    const validAreas = { ...areas };
                    selectedApps.forEach(appId => {
                        if (!validAreas[appId]) {
                            validAreas[appId] = 100;
                        }
                    });

                    const calculatedCosts = calculateCost(selectedApps, validAreas);
                    console.log("Costos calculados:", calculatedCosts);

                    if (calculatedCosts && calculatedCosts.length > 0) {
                        setCosts(calculatedCosts);
                        setError(null);
                    } else {
                        setError("La función calculateCost devolvió un array vacío");
                        setCosts([]);
                    }
                } catch (err) {
                    console.error("Error calculando costos:", err);
                    setError(`Error al calcular costos: ${err instanceof Error ? err.message : String(err)}`);
                    setCosts([]);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("No hay apps seleccionadas");
                setCosts([]);
                setLoading(false);
            }
        };

        setLoading(true);
        calculateCosts();
    }, [selectedApps, areas]);

    if (loading) {
        return (
            <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
            <div className="max-w-7xl mx-auto p-6 bg-gray-900">
                <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">
                            Cálculo de Costos de Inversión
                        </h2>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Volver al Inicio
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 mb-6 bg-red-900 border border-red-800 text-red-200 rounded-lg">
                            <p>{error}</p>
                        </div>
                    )}

                    {!costs || costs.length === 0 ? (
                        <h3 className="text-lg text-center text-gray-400">
                            No hay datos de costos disponibles.
                            {selectedApps.length === 0 && " No hay aplicaciones seleccionadas."}
                        </h3>
                    ) : (
                        <CostsTable
                            costs={costs}
                            selectedApps={selectedApps}
                            applications={applications}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                            areas={areas}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CostTablePage;