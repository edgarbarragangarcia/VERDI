

import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import QuotePage from './pages/Quote/QuotePage';
import TraceabilityLayout from './pages/Traceability';
import { ShippingRelease } from './pages/Shipping/ShippingRelease';
import { DashboardPage } from './pages/Analytics/DashboardPage';
import { OrdersPage } from './pages/Commercial/OrdersPage';
import ClientQuoteView from './pages/Quote/ClientQuoteView';
import { Outlet } from 'react-router-dom';


import { NotificationToast } from './components/common/NotificationToast';

const MainLayout = () => (
  <div className="flex min-h-screen bg-verdi-cream">
    <Sidebar />
    <NotificationToast />
    <main className="flex-1 ml-20 lg:ml-64 p-8 transition-all duration-300">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/quote" replace />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/traceability/*" element={<TraceabilityLayout />} />
        <Route path="/shipping" element={<ShippingRelease />} />
        <Route path="/analytics" element={<DashboardPage />} />
      </Route>
      {/* Client View - No Sidebar */}
      <Route path="/quote/client-view" element={<ClientQuoteView />} />
    </Routes>
  );

}

export default App;
