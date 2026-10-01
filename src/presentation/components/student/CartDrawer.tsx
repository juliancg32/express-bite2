/**
 * @license
 * Presentation Component: CartDrawer
 * Handles student order review and submission in mobile view.
 */

import React from 'react';
import { CartItem } from '../../hooks/useCart.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  onCustomerNameChange: (name: string) => void;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onSubmitOrder: () => void;
  isSubmitting: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  customerName,
  onCustomerNameChange,
  onUpdateQty,
  onRemove,
  onSubmitOrder,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-30 bg-[#1a1b22]/50 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
      <div className="bg-[#ffffff] rounded-t-2xl p-4 shadow-xl border-t border-[#eeedf7] max-h-[85%] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eeedf7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">
              shopping_bag
            </span>
            <h3 className="font-bold text-sm text-[#1a1b22]">
              Tu Pedido ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#3d4a42] hover:text-[#1a1b22]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Customer input */}
        <div className="py-2.5">
          <label className="block text-[11px] font-semibold text-[#3d4a42] mb-1">
            Nombre del alumno para retiro:
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Ej: Camila Valenzuela"
            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#bccac0] focus:outline-none focus:border-[#006948] bg-[#fbf8ff]"
          />
        </div>

        {/* Items List */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#eeedf7] py-1 max-h-[220px]">
          {items.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#3d4a42]">
              El carrito está vacío
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-9 h-9 rounded-md object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#1a1b22] truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-[#3d4a42]">
                      {product.formattedPrice} c/u
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onUpdateQty(product.id, quantity - 1)}
                    className="w-6 h-6 rounded bg-[#eeedf7] text-[#1a1b22] text-xs font-bold flex items-center justify-center hover:bg-[#e3e1ec]"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="w-6 h-6 rounded bg-[#eeedf7] text-[#1a1b22] text-xs font-bold flex items-center justify-center hover:bg-[#e3e1ec] disabled:opacity-40"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="text-[#ba1a1a] hover:opacity-75 p-1"
                    title="Eliminar"
                  >
                    <span className="material-symbols-outlined text-[15px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        <div className="pt-3 border-t border-[#eeedf7] mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#3d4a42]">Total a pagar:</span>
            <span className="text-base font-extrabold text-[#006948]">
              ${totalAmount.toLocaleString('es-CL')}
            </span>
          </div>

          <button
            onClick={onSubmitOrder}
            disabled={items.length === 0 || isSubmitting}
            className="w-full bg-[#006948] hover:bg-[#00855d] text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  autorenew
                </span>
                <span>Procesando pedido...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">
                  bolt
                </span>
                <span>Confirmar & Enviar a Cocina</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
