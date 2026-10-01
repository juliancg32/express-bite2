/**
 * @license
 * Presentation View: DualEcosystemView
 * Master 2-column layout matching the prompt's cafeteria dual ecosystem:
 * Left: Student Mobile Experience (PWA)
 * Right: Staff Counter Operations, Queue, and Real-time Inventory
 */

import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts.ts';
import { useOrders } from '../hooks/useOrders.ts';
import { useCart } from '../hooks/useCart.ts';
import { StudentPhoneFrame } from '../components/student/StudentPhoneFrame.tsx';
import { MetricsRibbon } from '../components/counter/MetricsRibbon.tsx';
import { OrderQueueList } from '../components/counter/OrderQueueList.tsx';
import { InventoryTable } from '../components/inventory/InventoryTable.tsx';
import { OrderStatusType } from '../../core/domain/value-objects/OrderStatus.ts';

export const DualEcosystemView: React.FC = () => {
  const { products, category, setCategory, updateProductStock } = useProducts();
  const { orders, kpis, updateOrderStatus, createOrder, refreshOrders } = useOrders();
  const {
    items: cartItems,
    customerName,
    setCustomerName,
    addItem: addToCart,
    updateQuantity: updateCartQty,
    removeItem: removeCartItem,
    clearCart,
    totalAmount: cartTotal,
    isSubmitting: isSubmittingOrder,
    setIsSubmitting: setIsSubmittingOrder,
    buildCreateOrderDTO,
  } = useCart();

  // Demonstration state for the live tracking widget
  const [demonstrationState, setDemonstrationState] = useState<'preparing' | 'ready' | 'delivered'>('preparing');
  const [activeTrackingOrderNum, setActiveTrackingOrderNum] = useState<string>('#042');

  // Handle student checkout submission
  const handleStudentCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      setIsSubmittingOrder(true);
      const dto = buildCreateOrderDTO();
      const created = await createOrder(dto);
      clearCart();
      setActiveTrackingOrderNum(created.orderNumber);
      setDemonstrationState('preparing');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al crear pedido');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // When staff clicks "Marcar como Entregado" in the counter queue
  const handleMarkDelivered = async (orderId: string, orderNumber: string) => {
    await updateOrderStatus(orderId, OrderStatusType.DELIVERED);
    // If the active tracking order is delivered, reflect in student view
    if (orderNumber === activeTrackingOrderNum || orderNumber === '#042') {
      setDemonstrationState('delivered');
    }
  };

  const handleAdvanceToReady = async (orderId: string) => {
    const updated = await updateOrderStatus(orderId, OrderStatusType.READY);
    if (updated.orderNumber === activeTrackingOrderNum || updated.orderNumber === '#042') {
      setDemonstrationState('ready');
    }
  };

  // Find currently tracked order for student
  const activeTrackedOrder = orders.find(o => o.orderNumber === activeTrackingOrderNum) || orders[1] || null;

  return (
    <div className="flex flex-col gap-6">
      {/* Top System Context / Live Banner */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#ffffff] p-4 sm:p-5 rounded-xl border border-[#e3e1ec] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#85f8c4]/40 flex items-center justify-center text-[#006948]">
            <span className="material-symbols-outlined text-[24px]">sync_alt</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-[#1a1b22]">
                Ecosistema Dual Cafetería
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[11px] font-bold">
                En Vivo
              </span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Sincronización instantánea entre la experiencia móvil del alumno y el terminal de barra.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#f4f2fd] px-3.5 py-1.5 rounded-full self-start md:self-auto border border-[#eeedf7]">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
          <span className="text-xs text-[#1a1b22] font-medium">
            Latencia Socket: <strong className="text-[#006948] font-bold">18ms</strong>
          </span>
          <span className="text-[#bccac0]">•</span>
          <span className="text-xs text-[#3d4a42]">Servidor Cafetería Central</span>
        </div>
      </section>

      {/* Master 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Student Mobile View (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <StudentPhoneFrame
            products={products}
            activeCategory={category}
            onSelectCategory={setCategory}
            cartItems={cartItems}
            cartTotal={cartTotal}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            onAddToCart={addToCart}
            onUpdateCartQty={updateCartQty}
            onRemoveCartItem={removeCartItem}
            onSubmitOrder={handleStudentCheckout}
            isSubmittingOrder={isSubmittingOrder}
            activeOrder={activeTrackedOrder}
            demonstrationState={demonstrationState}
            onDemonstrationStateChange={setDemonstrationState}
          />
        </div>

        {/* RIGHT COLUMN: Staff & Admin Counter POS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Quick KPI Ribbon */}
          <MetricsRibbon kpis={kpis} />

          {/* Section 1: Pedidos Entrantes en Cola */}
          <OrderQueueList
            orders={orders}
            onMarkDelivered={handleMarkDelivered}
            onAdvanceToReady={handleAdvanceToReady}
            onRefresh={refreshOrders}
          />

          {/* Section 2: Gestión de Inventario & Disponibilidad */}
          <InventoryTable
            products={products}
            onUpdateStock={updateProductStock}
          />
        </div>
      </div>
    </div>
  );
};
