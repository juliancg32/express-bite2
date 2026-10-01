/**
 * @license
 * Presentation Component: OrderQueueList
 * Real-time order queue for staff with Clean Architecture status transition triggers.
 */

import React, { useState } from 'react';
import { OrderJSON } from '../../../core/domain/entities/Order.ts';
import { OrderStatusType } from '../../../core/domain/value-objects/OrderStatus.ts';

interface OrderQueueListProps {
  orders: OrderJSON[];
  onMarkDelivered: (orderId: string, orderNumber: string) => void;
  onAdvanceToReady?: (orderId: string) => void;
  onRefresh: () => void;
}

export const OrderQueueList: React.FC<OrderQueueListProps> = ({
  orders,
  onMarkDelivered,
  onAdvanceToReady,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeOrders = orders.filter(o => o.status !== OrderStatusType.DELIVERED);
  const deliveredOrders = orders.filter(o => o.status === OrderStatusType.DELIVERED);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getElapsedTimeText = (createdAtStr: string) => {
    const elapsedMinutes = Math.floor((Date.now() - new Date(createdAtStr).getTime()) / 60000);
    if (elapsedMinutes <= 0) return 'Recién entrado';
    return `Hace ${elapsedMinutes} min`;
  };

  return (
    <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#e3e1ec] flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#006948] text-[22px]">
            receipt_long
          </span>
          <h3 className="text-base font-bold text-[#1a1b22]">
            Pedidos Entrantes en Cola
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] text-xs font-bold">
            {activeOrders.length} pendientes
          </span>
        </div>

        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-[#3d4a42] hover:bg-[#eeedf7] hover:text-[#1a1b22] transition-colors"
          title="Actualizar cola en tiempo real"
        >
          <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>
            refresh
          </span>
        </button>
      </div>

      {/* Order Stack */}
      <div className="flex flex-col gap-2.5">
        {activeOrders.length === 0 ? (
          <div className="text-center py-8 bg-[#fbf8ff] rounded-xl border border-dashed border-[#e3e1ec]">
            <span className="material-symbols-outlined text-[#006948] text-[36px] mb-1">
              task_alt
            </span>
            <p className="text-sm font-semibold text-[#1a1b22]">¡Cola despejada!</p>
            <p className="text-xs text-[#3d4a42]">
              No hay pedidos pendientes en este momento.
            </p>
          </div>
        ) : (
          activeOrders.map((order) => {
            const isReady = order.status === OrderStatusType.READY;
            const isPreparing = order.status === OrderStatusType.PREPARING;

            return (
              <div
                key={order.id}
                className="p-3.5 bg-[#fbf8ff] rounded-xl border border-[#eeedf7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-[#f4f2fd]/60"
              >
                {/* Left: Turno badge + details */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#eeedf7] border border-[#dad9e3] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[#3d4a42] text-[9px] uppercase tracking-wider font-semibold">
                      Turno
                    </span>
                    <span className="text-base font-extrabold text-[#1a1b22] leading-tight">
                      {order.orderNumber}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#1a1b22]">
                        {order.customerName}
                      </span>

                      {isPreparing && (
                        <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
                          Preparando
                        </span>
                      )}

                      {isReady && (
                        <span className="px-2 py-0.5 rounded-full bg-[#d1fae5] text-[#006948] text-[11px] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>
                          Listo en Barra
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[#3d4a42] text-xs flex-wrap">
                      <span className="font-medium text-[#1a1b22]">
                        {order.itemsSummary}
                      </span>
                      <span>•</span>
                      <span className="text-[#3d4a42]">
                        {getElapsedTimeText(order.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[#006948]">
                        {order.formattedTotal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {isPreparing && onAdvanceToReady && (
                    <button
                      onClick={() => onAdvanceToReady(order.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-[#006948] text-[#006948] hover:bg-[#85f8c4]/20 text-xs font-semibold transition-all"
                      title="Mover a Listo para Retiro"
                    >
                      Avisar Listo
                    </button>
                  )}

                  <button
                    onClick={() => onMarkDelivered(order.id, order.orderNumber)}
                    className="bg-[#006948] hover:bg-[#00855d] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      check_circle
                    </span>
                    <span>Marcar como Entregado</span>
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Recently Delivered Accordion/History snippet */}
        {deliveredOrders.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#eeedf7]">
            <span className="text-xs font-semibold text-[#3d4a42] mb-1.5 block">
              Recientemente Despachados ({deliveredOrders.length}):
            </span>
            <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto">
              {deliveredOrders.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  className="px-3 py-1.5 rounded-lg bg-[#f4f2fd] text-xs flex items-center justify-between text-[#3d4a42] opacity-70"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{d.orderNumber}</span>
                    <span>{d.customerName}</span>
                    <span className="text-[11px] truncate max-w-[200px]">{d.itemsSummary}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#006948] font-semibold">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                    Despachado
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
