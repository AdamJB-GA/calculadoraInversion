import { Route, Routes } from 'react-router-dom';
import KPISelectorPage from '../pages/KPISelectorPage';
import ResumePage from '../pages/ResumenPage';
import CostTablePage from '../pages/CostTablePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<KPISelectorPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/calcular" element={<CostTablePage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
