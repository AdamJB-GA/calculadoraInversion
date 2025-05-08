import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { Application, YearlyCosts } from '../types/calculator.types';

// Estilos PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, fontFamily: 'Helvetica' },
  title: { fontSize: 14, marginBottom: 15, fontWeight: 'bold' },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #000',
    paddingBottom: 4,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #ccc',
    paddingVertical: 2,
  },
  cellLeft: { flex: 2, textAlign: 'left' },
  cell: { flex: 1, textAlign: 'right' },
  bold: { fontWeight: 'bold' },
});

interface Props {
  costs: YearlyCosts[] | null;
  selectedApps: string[];
  applications: Application[];
  areas: { [key: string]: number };
}

const CostsPdfDocument: React.FC<Props> = ({
  costs,
  selectedApps,
  applications,
  areas,
}) => {
  const formatCurrency = (value?: number) =>
    (value || 0).toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
    });

  const yearLabels = ['Onboarding', 'Año 1', 'Año 2', 'Año 3', 'Año 4'];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Resumen de Costos de Aplicaciones</Text>

        {/* Encabezado */}
        <View style={styles.tableHeader}>
          <Text style={styles.cellLeft}>Aplicación</Text>
          {yearLabels.map((label, i) => (
            <Text key={i} style={styles.cell}>
              {label}
            </Text>
          ))}
        </View>

        {/* Capa Dinámica */}
        {selectedApps.includes('capa_dinamica') && (
          <View style={styles.row}>
            <Text style={styles.cellLeft}>Capa Dinámica</Text>
            {costs.map((c, i) => (
              <Text key={i} style={styles.cell}>
                {formatCurrency(c.capaDinamicaCost)}
              </Text>
            ))}
          </View>
        )}

        {/* Aplicaciones dinámicas */}
        {applications
          .filter((app) => app.id !== 'gemelo_digital' && app.id !== 'capa_dinamica')
          .filter((app) => selectedApps.includes(app.id))
          .map((app) => (
            <View key={app.id} style={styles.row}>
              <Text style={styles.cellLeft}>
                {app.name} ({areas[app.id] || 100} km²)
              </Text>
              {costs.map((c, i) => (
                <Text key={i} style={styles.cell}>
                  {formatCurrency(c.otherAppsCosts?.[app.id])}
                </Text>
              ))}
            </View>
          ))}

        {/* Gemelo Digital */}
        {selectedApps.includes('gemelo_digital') && (
          <View style={styles.row}>
            <Text style={styles.cellLeft}>Gemelo Digital</Text>
            {costs.map((c, i) => (
              <Text key={i} style={styles.cell}>
                {formatCurrency(c.gemeloDigitalCost)}
              </Text>
            ))}
          </View>
        )}

        {/* Total final */}
        <View style={[styles.row, styles.bold]}>
          <Text style={styles.cellLeft}>TOTAL</Text>
          {costs.map((c, i) => (
            <Text key={i} style={styles.cell}>
              {formatCurrency(c.totalCost)}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CostsPdfDocument;
