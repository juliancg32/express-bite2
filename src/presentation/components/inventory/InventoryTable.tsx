/**
 * @license
 * Presentation Component: InventoryTable
 * Clean minimalist table for cafeteria stock management.
 */

import React, { useState } from 'react';
import { ProductJSON } from '../../../core/domain/entities/Product.ts';
import { EditStockModal } from './EditStockModal.tsx';

interface InventoryTableProps {
  products: ProductJSON[];
  onUpdateStock: (productId: string, newStock: number) => Promise<void>;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onUpdateStock,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductJSON | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProductIcon = (name: string, station: string): string => {
    const n = name.toLowerCase();
    const s = station.toLowerCase();
    if (n.includes('café') || s.includes('cafetería')) return 'coffee';
    if (n.includes('empanada') || s.includes('horno')) return 'bakery_dining';
    if (n.includes('jugo') || s.includes('bebidas')) return 'blender';
    if (n.includes('ciabatta') || n.includes('sándwich')) return 'lunch_dining';
    if (n.includes('medialuna') || s.includes('pastelería')) return 'cookie';
    return 'restaurant';
  };

  const handleOpenEdit = (p: ProductJSON) => {
    setSelectedProduct(p);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#e3e1ec] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#006948] text-[22px]">
            inventory_2
          </span>
          <div>
            <h3 className="text-base font-bold text-[#1a1b22]">
              Gestión de Inventario & Disponibilidad
            </h3>
            <p className="text-xs text-[#3d4a42]">
              Control automático en tiempo real sobre la carta del estudiante
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-[#eeedf7] text-[#1a1b22] font-semibold self-start sm:self-auto">
          {products.length} Artículos Monitoreados
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#eeedf7] text-[#3d4a42] font-semibold">
              <th className="py-2.5 px-3 rounded-l-lg">Producto</th>
              <th className="py-2.5 px-3">Stock Actual</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f4f2fd]">
            {products.map((p) => {
              const isOutOfStock = p.stock === 0;
              const barPercentage = Math.min(100, Math.round((p.stock / 50) * 100));

              return (
                <tr
                  key={p.id}
                  className={`hover:bg-[#fbf8ff] transition-colors ${
                    isOutOfStock ? 'bg-[#ffdad6]/20' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isOutOfStock
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#eeedf7] text-[#3d4a42]'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">
                          {getProductIcon(p.name, p.station)}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1a1b22]">
                          {p.name}
                        </div>
                        <span className="text-[11px] text-[#3d4a42]">
                          {p.station}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {isOutOfStock ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#ba1a1a]">
                          0 uds
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#ef4444] text-white text-[10px] font-bold tracking-wide shadow-xs">
                          Agotado
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs text-[#1a1b22] min-w-[50px]">
                          {p.stock}{' '}
                          <span className="text-[10px] text-[#3d4a42] font-normal">
                            uds
                          </span>
                        </span>
                        <div className="w-20 bg-[#eeedf7] rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              p.isLowStock ? 'bg-[#825100]' : 'bg-[#006948]'
                            }`}
                            style={{ width: `${barPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="px-3 py-1.5 rounded-xl bg-[#eeedf7] hover:bg-[#dad9e3] text-[#1a1b22] text-xs font-semibold transition-all inline-flex items-center gap-1 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Editar</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <EditStockModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveStock={onUpdateStock}
      />
    </div>
  );
};
