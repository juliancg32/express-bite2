/**
 * @license
 * Presentation Component: EditStockModal
 * Allows modifying product inventory units cleanly with validation.
 */

import React, { useState } from 'react';
import { ProductJSON } from '../../../core/domain/entities/Product.ts';

interface EditStockModalProps {
  product: ProductJSON | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveStock: (productId: string, newStock: number) => Promise<void>;
}

export const EditStockModal: React.FC<EditStockModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaveStock,
}) => {
  const [stockVal, setStockVal] = useState<number>(product ? product.stock : 0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state when product changes
  React.useEffect(() => {
    if (product) {
      setStockVal(product.stock);
      setError(null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stockVal < 0) {
      setError('El stock no puede ser negativo');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onSaveStock(product.id, stockVal);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar stock');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1b22]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#dad9e3]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeedf7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[22px]">
              inventory
            </span>
            <h3 className="text-base font-bold text-[#1a1b22]">
              Modificar Stock
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#3d4a42] hover:text-[#1a1b22]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold text-[#006948] block">
              {product.station}
            </span>
            <h4 className="text-sm font-bold text-[#1a1b22]">{product.name}</h4>
            <p className="text-xs text-[#3d4a42]">{product.sku}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3d4a42] mb-1.5">
              Unidades Disponibles en Cocina/Barra:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStockVal(Math.max(0, stockVal - 5))}
                className="px-2.5 py-1.5 rounded-lg bg-[#eeedf7] text-xs font-bold text-[#1a1b22] hover:bg-[#dad9e3]"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => setStockVal(Math.max(0, stockVal - 1))}
                className="px-2.5 py-1.5 rounded-lg bg-[#eeedf7] text-xs font-bold text-[#1a1b22] hover:bg-[#dad9e3]"
              >
                -1
              </button>
              <input
                type="number"
                min="0"
                value={stockVal}
                onChange={(e) => setStockVal(parseInt(e.target.value, 10) || 0)}
                className="w-20 text-center font-bold text-base px-2 py-1.5 rounded-lg border border-[#bccac0] focus:outline-none focus:border-[#006948]"
              />
              <button
                type="button"
                onClick={() => setStockVal(stockVal + 1)}
                className="px-2.5 py-1.5 rounded-lg bg-[#eeedf7] text-xs font-bold text-[#1a1b22] hover:bg-[#dad9e3]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => setStockVal(stockVal + 10)}
                className="px-2.5 py-1.5 rounded-lg bg-[#eeedf7] text-xs font-bold text-[#1a1b22] hover:bg-[#dad9e3]"
              >
                +10
              </button>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-[#3d4a42]">Presets rápidos:</span>
            <button
              type="button"
              onClick={() => setStockVal(0)}
              className="text-[11px] px-2 py-0.5 rounded bg-[#fed7aa] text-[#9a3412] font-semibold hover:opacity-80"
            >
              Agotado (0)
            </button>
            <button
              type="button"
              onClick={() => setStockVal(20)}
              className="text-[11px] px-2 py-0.5 rounded bg-[#eeedf7] text-[#006948] font-semibold hover:bg-[#e3e1ec]"
            >
              Lote 20
            </button>
            <button
              type="button"
              onClick={() => setStockVal(50)}
              className="text-[11px] px-2 py-0.5 rounded bg-[#eeedf7] text-[#006948] font-semibold hover:bg-[#e3e1ec]"
            >
              Lote 50
            </button>
          </div>

          {error && (
            <p className="text-xs text-[#ba1a1a] bg-[#ffdad6] p-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eeedf7]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#3d4a42] hover:bg-[#eeedf7]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#006948] hover:bg-[#00855d] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Actualizar Inventario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
