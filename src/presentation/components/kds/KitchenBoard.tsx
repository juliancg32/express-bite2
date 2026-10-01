/**
 * @license
 * Presentation Component: KitchenBoard (KDS)
 * Kitchen Display System for kitchen staff stations (Cocina KDS).
 */

import React from 'react';
import { OrderJSON } from '../../../core/domain/entities/Order.ts';
import { OrderStatusType } from '../../../core/domain/value-objects/OrderStatus.ts';

interface KitchenBoardProps {
  orders: OrderJSON[];
  onAdvanceStatus: (orderId: string, targetStatus: OrderStatusType) => void;
  onRefresh: () => void;
}

export const KitchenBoard: React.FC<KitchenBoardProps> = ({
  orders,
  onAdvanceStatus,
  onRefresh,
}) => {
  const preparingOrders = orders.filter(
    (o) => o.status === OrderStatusType.PENDING || o.status === OrderStatusType.PREPARING
  );
  const readyOrders = orders.filter((o) => o.status === OrderStatusType.READY);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#ffffff] p-4 rounded-xl border border-[#e3e1ec] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006948] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">kitchen</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1a1b22]">
              Estación de Producción KDS (Kitchen Display System)
            </h2>
            <p className="text-xs text-[#3d4a42]">
              Despacho en tiempo real para cocineros, baristas y horneros
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-lg border border-[#bccac0] text-xs font-semibold text-[#1a1b22] hover:bg-[#eeedf7] flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Refrescar Comandas</span>
          </button>
        </div>
      </div>

      {/* 2-Column Kanban View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: En Preparación */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-[#ffedd5] px-4 py-2.5 rounded-xl border border-[#fed7aa]">
            <div className="flex items-center gap-2 text-[#9a3412] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse"></span>
              <span>En Cocina / Elaboración ({preparingOrders.length})</span>
            </div>
            <span className="text-[11px] font-semibold text-[#b45309]">Prioridad FIFO</span>
          </div>

          <div className="flex flex-col gap-3">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-10 bg-[#ffffff] rounded-xl border border-dashed border-[#e3e1ec] text-[#3d4a42] text-xs">
                No hay comandas en cocción
              </div>
            ) : (
              preparingOrders.map((o) => (
                <div
                  key={o.id}
                  className="bg-[#ffffff] rounded-xl p-4 border border-[#e3e1ec] shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#1a1b22]">
                          {o.orderNumber}
                        </span>
                        <span className="text-xs font-bold text-[#3d4a42]">
                          {o.customerName}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#3d4a42]">
                        Tiempo estimado: ~{o.estimatedWaitMinutes} min
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-[#ffedd5] text-[#9a3412] text-xs font-bold">
                      {o.pickupCounter}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#fbf8ff] p-2.5 rounded-lg border border-[#eeedf7] flex flex-col gap-1.5">
                    {o.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1a1b22]">
                          {item.quantity}x {item.productName}
                        </span>
                        <span className="text-[#3d4a42] text-[11px]">
                          {item.formattedSubtotal}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action: Advance to Ready */}
                  <button
                    onClick={() => onAdvanceStatus(o.id, OrderStatusType.READY)}
                    className="w-full bg-[#006948] hover:bg-[#00855d] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      check
                    </span>
                    <span>¡Listo para Retirar!</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Listos para Retiro */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-[#d1fae5] px-4 py-2.5 rounded-xl border border-[#a7f3d0]">
            <div className="flex items-center gap-2 text-[#006948] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006948]"></span>
              <span>Listos en Barra / Esperando Alumno ({readyOrders.length})</span>
            </div>
            <span className="text-[11px] font-semibold text-[#005137]">Pantalla Activa</span>
          </div>

          <div className="flex flex-col gap-3">
            {readyOrders.length === 0 ? (
              <div className="text-center py-10 bg-[#ffffff] rounded-xl border border-dashed border-[#e3e1ec] text-[#3d4a42] text-xs">
                No hay pedidos en mostrador de retiro
              </div>
            ) : (
              readyOrders.map((o) => (
                <div
                  key={o.id}
                  className="bg-[#ffffff] rounded-xl p-4 border-2 border-[#85f8c4] shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-[#006948]">
                          {o.orderNumber}
                        </span>
                        <span className="text-xs font-bold text-[#1a1b22]">
                          {o.customerName}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#006948]">
                        Ubicación: {o.pickupCounter}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold animate-pulse">
                      ¡Llamando!
                    </span>
                  </div>

                  <div className="bg-[#fbf8ff] p-2.5 rounded-lg border border-[#eeedf7] flex flex-col gap-1">
                    {o.items.map((item, idx) => (
                      <div key={idx} className="text-xs font-medium text-[#1a1b22]">
                        {item.quantity}x {item.productName}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onAdvanceStatus(o.id, OrderStatusType.DELIVERED)}
                    className="w-full bg-[#1a1b22] hover:bg-[#2f3038] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      done_all
                    </span>
                    <span>Confirmar Entrega a Alumno</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
