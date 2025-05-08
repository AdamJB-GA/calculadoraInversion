import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CostsTable from '../components/CostTable';
import { useAppStore } from '../stores/UseAppStore';
import { calculateCost } from '../utils/costUtility';
import { YearlyCosts } from '../types/calculator.types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfCostTable from '../components/PdfCostTable';
import applications from '../utils/applications';

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

                    const calculatedCosts = calculateCost(applications, selectedApps, validAreas);
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
            <div className="flex justify-center mt-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
            </div>
        );
    }

    return (
        <div className="dark min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <div className="max-w-7xl mx-auto p-6">
                <div className="p-6 rounded-lg shadow-xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                            Cálculo de Costos de Inversión
                        </h2>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 rounded-lg transition-colors cursor-pointer"
                            style={{ 
                                backgroundColor: 'var(--primary)', 
                                color: 'var(--primary-foreground)' 
                            }}
                        >
                            Volver al Inicio
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 mb-6 rounded-lg" style={{ 
                            backgroundColor: 'var(--destructive)', 
                            color: 'var(--destructive-foreground)',
                            border: '1px solid var(--destructive)' 
                        }}>
                            <p>{error}</p>
                        </div>
                    )}

                    {!costs || costs.length === 0 ? (
                        <h3 className="text-lg text-center" style={{ color: 'var(--muted-foreground)' }}>
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

                    <div className="mt-6">
                        <PDFDownloadLink
                            document={
                                <PdfCostTable
                                    costs={costs}
                                    selectedApps={selectedApps}
                                    applications={applications}
                                    areas={areas}
                                />
                            }
                            fileName="costos_inversion.pdf"
                            className="px-4 py-2 rounded-lg transition-colors"
                            style={{ 
                                backgroundColor: 'var(--accent)', 
                                color: 'var(--accent-foreground)' 
                            }}
                        >
                            {({ loading }) =>
                                loading ? 'Generando PDF...' : 'Descargar PDF Formal'
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostTablePage;