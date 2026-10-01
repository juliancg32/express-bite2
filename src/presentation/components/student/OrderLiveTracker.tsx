/**
 * @license
 * Presentation Component: OrderLiveTracker
 * Interactive dual-state live order status widget in the student view.
 */

import React from 'react';
import { OrderJSON } from '../../../core/domain/entities/Order.ts';

interface OrderLiveTrackerProps {
  currentOrder: OrderJSON | null;
  demonstrationState: 'preparing' | 'ready' | 'delivered';
  onStateChange: (state: 'preparing' | 'ready' | 'delivered') => void;
}

export const OrderLiveTracker: React.FC<OrderLiveTrackerProps> = ({
  currentOrder,
  demonstrationState,
  onStateChange,
}) => {
  const isPreparing = demonstrationState === 'preparing';
  const isReady = demonstrationState === 'ready';
  const isDelivered = demonstrationState === 'delivered';

  const orderNum = currentOrder ? currentOrder.orderNumber : '#042';
  const orderSummary = currentOrder ? currentOrder.itemsSummary : 'Café Latte Artesanal + Empanada';

  return (
    <div className="mt-2 pt-2 border-t border-[#eeedf7]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#1a1b22]">
          Mi Pedido en Tiempo Real
        </span>
        <span className="text-[11px] text-[#3d4a42]">
          Alternar demostración:
        </span>
      </div>

      {/* State Toggle Buttons */}
      <div className="grid grid-cols-2 gap-1 bg-[#eeedf7] p-1 rounded-xl mb-3">
        <button
          type="button"
          onClick={() => onStateChange('preparing')}
          className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            isPreparing
              ? 'bg-[#ffffff] text-[#a36700] shadow-xs'
              : 'text-[#3d4a42] hover:text-[#1a1b22]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#a36700]"></span>
          <span>1. Preparando</span>
        </button>

        <button
          type="button"
          onClick={() => onStateChange('ready')}
          className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            isReady
              ? 'bg-[#ffffff] text-[#006948] shadow-xs'
              : 'text-[#3d4a42] hover:text-[#1a1b22]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
          <span>2. ¡Listo a Recoger!</span>
        </button>
      </div>

      {/* State 1: Preparando (Warm Amber / Orange Accent) */}
      {isPreparing && (
        <div className="bg-[#fff7ed] p-3 rounded-xl border border-[#fed7aa] shadow-xs transition-all animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ffedd5] flex items-center justify-center text-[#d97706] shrink-0">
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  autorenew
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#9a3412]">
                    Pedido {orderNum}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
                    En Preparación
                  </span>
                </div>
                <p className="text-[11px] text-[#9a3412]/80 mt-0.5 font-medium line-clamp-1">
                  {orderSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#fed7aa] h-1.5 rounded-full overflow-hidden my-2">
            <div className="bg-[#ea580c] h-full rounded-full w-2/3 animate-pulse"></div>
          </div>

          <div className="flex items-center justify-between text-[#9a3412] text-[11px]">
            <span>Tu pedido está en cocina</span>
            <span className="font-semibold">Tiempo restante: ~2 min</span>
          </div>
        </div>
      )}

      {/* State 2: Listo para Recoger (Bright Emerald Green Accent) */}
      {isReady && (
        <div className="bg-[#ecfdf5] p-3 rounded-xl border border-[#a7f3d0] shadow-xs transition-all animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#a7f3d0] flex items-center justify-center text-[#006948] shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  check_circle
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#006948]">
                    Turno {orderNum}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-bold">
                    ¡Listo para recoger!
                  </span>
                </div>
                <p className="text-[11px] text-[#005137] mt-0.5 font-medium line-clamp-1">
                  {orderSummary}
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined text-[#006948] text-[24px] animate-bounce">
              storefront
            </span>
          </div>

          <div className="w-full bg-[#a7f3d0] h-1.5 rounded-full overflow-hidden my-2">
            <div className="bg-[#006948] h-full rounded-full w-full"></div>
          </div>

          <div className="flex items-center justify-between text-[#1a1b22] text-[11px]">
            <span className="text-[#006948] font-bold">
              Retira en Mostrador 1
            </span>
            <span className="text-[#3d4a42]">
              Presenta este código
            </span>
          </div>
        </div>
      )}

      {/* State 3: Entregado */}
      {isDelivered && (
        <div className="bg-[#f4f2fd] p-3 rounded-xl border border-[#e3e1ec] shadow-xs transition-all animate-fadeIn text-center">
          <div className="flex items-center justify-center gap-2 text-[#006948] font-bold text-xs mb-1">
            <span className="material-symbols-outlined text-[18px]">task_alt</span>
            <span>¡Pedido Entregado con Éxito!</span>
          </div>
          <p className="text-[11px] text-[#3d4a42]">
            Gracias por tu compra en Cafetería Central. ¡Buen provecho!
          </p>
        </div>
      )}
    </div>
  );
};
