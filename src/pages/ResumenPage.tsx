'use client';

import React from 'react';
import { useAppStore } from '../stores/UseAppStore'; // Zustand Store
import applications from '../utils/applications';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const ResumenPage: React.FC = () => {
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
        <div className='dark min-h-screen flex items-center justify-center' style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-5xl mx-auto p-6">
                <div className="rounded-lg shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                    <div className="p-6 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border)' }}>
                        <div>
                            <h2 
                                className="text-xl font-semibold mb-2"
                                style={{ color: 'var(--foreground)' }}
                            >
                                Resumen de KPIs Seleccionados
                            </h2>
                            <p 
                                className="text-sm"
                                style={{ color: 'var(--muted-foreground)' }}
                            >
                                Aquí puedes ver las aplicaciones seleccionadas y sus costos asociados.
                            </p>
                        </div>
                        <button
                            onClick={handleNavigateToCalculator}
                            className="font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
                            style={{ 
                                backgroundColor: 'var(--primary)',
                                color: 'var(--primary-foreground)'
                            }}
                        >
                            Calcular Costes
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                        style={{ 
                                            backgroundColor: 'var(--secondary)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        <div className="p-4">
                                            <h3 
                                                className="text-lg font-semibold mb-1"
                                                style={{ color: 'var(--secondary-foreground)' }}
                                            >
                                                {app.name}
                                            </h3>
                                            <p 
                                                className="text-sm mb-2"
                                                style={{ color: 'var(--secondary-foreground)', opacity: 0.8 }}
                                            >
                                                {app.description || `Aplicación para gestionar ${app.name.toLowerCase()}`}
                                            </p>
                                            <div 
                                                className="text-sm mb-2"
                                                style={{ color: 'var(--secondary-foreground)', opacity: 0.8 }}
                                            >
                                                Costo fijo: {app.fixedCost}€
                                            </div>
                                            {app.variableCost > 0 && (
                                                <div 
                                                    className="text-sm mb-2"
                                                    style={{ color: 'var(--secondary-foreground)', opacity: 0.8 }}
                                                >
                                                    Variable: {app.variableCost}€/km² × {areas[app.id] || 100} km²
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumenPage;