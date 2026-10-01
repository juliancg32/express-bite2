/**
 * @license
 * Presentation Component: PickupScreen
 * Digital Signage Turn Screen (Pantalla de Recogida) for Cafeteria Hall.
 */

import React from 'react';
import { OrderJSON } from '../../../core/domain/entities/Order.ts';
import { OrderStatusType } from '../../../core/domain/value-objects/OrderStatus.ts';

interface PickupScreenProps {
  orders: OrderJSON[];
}

export const PickupScreen: React.FC<PickupScreenProps> = ({ orders }) => {
  const preparingOrders = orders.filter(
    (o) => o.status === OrderStatusType.PENDING || o.status === OrderStatusType.PREPARING
  );
  const readyOrders = orders.filter((o) => o.status === OrderStatusType.READY);

  return (
    <div className="bg-[#1a1b22] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#2f3038] flex flex-col gap-6">
      {/* Header of the Display Screen */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#006948] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[28px]">notifications_active</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>PANTALLA DE TURNOS Y RECOGIDA</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114]">
                EN VIVO
              </span>
            </h1>
            <p className="text-xs text-white/60">
              Cafetería Central Universitaria • Retiro exclusivo en Mostrador 1 & 2
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#85f8c4] animate-ping"></span>
          <span className="text-xs font-semibold text-white/90">
            Sincronizado vía Clean Arch Socket Bus
          </span>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: PREPARANDO */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-amber-500/15 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-base tracking-wide">
              <span className="material-symbols-outlined text-[20px] animate-spin">
                autorenew
              </span>
              <span>EN PREPARACIÓN</span>
            </div>
            <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-full">
              {preparingOrders.length} en fila
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {preparingOrders.length === 0 ? (
              <div className="col-span-full py-12 text-center text-white/40 text-sm">
                No hay turnos en preparación
              </div>
            ) : (
              preparingOrders.map((o) => (
                <div
                  key={o.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-1 hover:border-amber-400/40 transition-colors"
                >
                  <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-wider">
                    {o.orderNumber}
                  </span>
                  <span className="text-xs text-white/80 font-semibold truncate max-w-full">
                    {o.customerName}
                  </span>
                  <span className="text-[10px] text-white/50">
                    est. ~{o.estimatedWaitMinutes}m
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: LISTO PARA RETIRAR (High Contrast & Big Numbers) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/40">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-base tracking-wide">
              <span className="material-symbols-outlined text-[22px]">
                check_circle
              </span>
              <span>¡LISTO PARA RETIRAR!</span>
            </div>
            <span className="text-xs text-emerald-200 font-bold bg-emerald-500/30 px-2.5 py-1 rounded-full animate-pulse">
              PASAR A BARRA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readyOrders.length === 0 ? (
              <div className="col-span-full py-12 text-center text-white/40 text-sm">
                No hay pedidos en llamado inmediato
              </div>
            ) : (
              readyOrders.map((o) => (
                <div
                  key={o.id}
                  className="bg-gradient-to-br from-[#006948] to-[#005137] border-2 border-[#85f8c4] rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-lg shadow-emerald-950/50 animate-pulse"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                        TURNO DISPONIBLE
                      </span>
                      <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-widest mt-1">
                        {o.orderNumber}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#85f8c4] text-[32px]">
                      storefront
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">
                        {o.customerName}
                      </span>
                      <span className="text-[11px] text-emerald-200 truncate block max-w-[140px]">
                        {o.itemsSummary}
                      </span>
                    </div>
                    <span className="bg-white text-[#006948] font-extrabold px-3 py-1 rounded-lg text-xs shadow-xs">
                      {o.pickupCounter}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
