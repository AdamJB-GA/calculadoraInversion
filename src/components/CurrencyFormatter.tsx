import React from 'react';

interface CurrencyFormatterProps {
  value: number;
}

export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ value }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return <>{formatCurrency(value)}</>;
};