

import { Routes, Route } from 'react-router-dom';
import StatusPage from './StatusPage';
import ScannerPage from './ScannerPage';
import { InventoryPage } from './InventoryPage';

const TraceabilityLayout = () => {
    return (
        <Routes>
            <Route path="/" element={<StatusPage />} />
            <Route path="/scan" element={<ScannerPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
    );
};

export default TraceabilityLayout;
