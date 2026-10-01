/**
 * @license
 * Express-Bite: Clean Architecture & SOLID Cafeteria Ecosystem
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './presentation/components/layout/Header.tsx';
import { Footer } from './presentation/components/layout/Footer.tsx';
import { DualEcosystemView } from './presentation/views/DualEcosystemView.tsx';
import { KitchenBoard } from './presentation/components/kds/KitchenBoard.tsx';
import { PickupScreen } from './presentation/components/pickup/PickupScreen.tsx';
import { InventoryTable } from './presentation/components/inventory/InventoryTable.tsx';
import { ArchitectureViewer } from './presentation/components/architecture/ArchitectureViewer.tsx';
import { useOrders } from './presentation/hooks/useOrders.ts';
import { useProducts } from './presentation/hooks/useProducts.ts';
import { appContainer } from './core/di/container.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dual');
  const { orders, kpis, updateOrderStatus, refreshOrders } = useOrders();
  const { products, updateProductStock } = useProducts();
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

  // Listen to cross-system real-time domain events
  useEffect(() => {
    const unsubscribe = appContainer.notificationService.subscribe((event) => {
      setGlobalNotification(event.message);
      const timer = setTimeout(() => {
        setGlobalNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeOrdersCount={kpis.totalActive}
      />

      {/* Global Real-Time Event Banner */}
      {globalNotification && (
        <aside
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1a1b22] text-white px-4 py-2.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 text-xs animate-slideUp"
        >
          <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-ping"></span>
          <span className="font-semibold">{globalNotification}</span>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dual' && <DualEcosystemView />}

        {activeTab === 'kds' && (
          <KitchenBoard
            orders={orders}
            onAdvanceStatus={updateOrderStatus}
            onRefresh={refreshOrders}
          />
        )}

        {activeTab === 'pickup' && <PickupScreen orders={orders} />}

        {activeTab === 'inventory' && (
          <div className="max-w-4xl mx-auto">
            <InventoryTable
              products={products}
              onUpdateStock={updateProductStock}
            />
          </div>
        )}

        {activeTab === 'architecture' && <ArchitectureViewer />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
