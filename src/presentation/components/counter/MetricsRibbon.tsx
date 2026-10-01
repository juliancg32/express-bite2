/**
 * @license
 * Presentation Component: MetricsRibbon
 * Quick operational KPI header for the counter/staff dashboard.
 */

import React from 'react';
import { OrdersKPIs } from '../../../core/application/use-cases/GetOrdersUseCase.ts';

interface MetricsRibbonProps {
  kpis: OrdersKPIs;
}

export const MetricsRibbon: React.FC<MetricsRibbonProps> = ({ kpis }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e3e1ec]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#006948] text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">desktop_windows</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1a1b22]">
              Panel de Operaciones & Cocina
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#eeedf7] text-[#3d4a42] text-xs font-semibold">
              Turno Tarde
            </span>
          </div>
          <p className="text-xs text-[#3d4a42]">
            Recepción y despacho sincronizado en mostrador principal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 divide-x divide-[#e3e1ec]">
        <div className="flex flex-col items-end">
          <span className="text-xl font-extrabold text-[#006948] leading-none">
            {kpis.totalActive}
          </span>
          <span className="text-[11px] text-[#3d4a42] font-medium">
            Pedidos Activos
          </span>
        </div>

        <div className="flex flex-col items-end pl-4">
          <span className="text-xl font-extrabold text-[#1a1b22] leading-none">
            {kpis.onTimePercentage}%
          </span>
          <span className="text-[11px] text-[#3d4a42] font-medium">
            A tiempo (&lt;5m)
          </span>
        </div>
      </div>
    </div>
  );
};
