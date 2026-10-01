/**
 * @license
 * Presentation Component: StudentPhoneFrame
 * Realistic, minimalist mobile viewport replicating the student ordering experience.
 */

import React, { useState } from 'react';
import { ProductJSON, ProductCategory } from '../../../core/domain/entities/Product.ts';
import { OrderJSON } from '../../../core/domain/entities/Order.ts';
import { ProductCard } from './ProductCard.tsx';
import { OrderLiveTracker } from './OrderLiveTracker.tsx';
import { CartDrawer } from './CartDrawer.tsx';
import { CartItem } from '../../hooks/useCart.ts';

interface StudentPhoneFrameProps {
  products: ProductJSON[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartItems: CartItem[];
  cartTotal: number;
  customerName: string;
  onCustomerNameChange: (name: string) => void;
  onAddToCart: (p: ProductJSON) => void;
  onUpdateCartQty: (id: string, q: number) => void;
  onRemoveCartItem: (id: string) => void;
  onSubmitOrder: () => void;
  isSubmittingOrder: boolean;
  activeOrder: OrderJSON | null;
  demonstrationState: 'preparing' | 'ready' | 'delivered';
  onDemonstrationStateChange: (st: 'preparing' | 'ready' | 'delivered') => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'cafeteria', label: 'Cafetería' },
  { id: 'horno', label: 'Horno' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'snacks', label: 'Snacks' },
];

export const StudentPhoneFrame: React.FC<StudentPhoneFrameProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  cartItems,
  cartTotal,
  customerName,
  onCustomerNameChange,
  onAddToCart,
  onUpdateCartQty,
  onRemoveCartItem,
  onSubmitOrder,
  isSubmittingOrder,
  activeOrder,
  demonstrationState,
  onDemonstrationStateChange,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleProductAdd = (p: ProductJSON) => {
    onAddToCart(p);
    showToast(`"${p.name}" añadido al pedido`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Filter 4 featured products for the student view (first 4 items)
  const displayedProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col items-center w-full">
      {/* View Label & Badge */}
      <div className="w-full max-w-[400px] flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#006948] text-[18px]">
            smartphone
          </span>
          <span className="font-bold text-xs text-[#1a1b22]">
            Vista del Estudiante
          </span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eeedf7] text-[#3d4a42]">
          Mobile Optimized (PWA)
        </span>
      </div>

      {/* Realistic Minimalist Mobile Device Shell */}
      <div className="relative w-full max-w-[400px] bg-[#ffffff] rounded-2xl shadow-xl border border-[#dad9e3] overflow-hidden flex flex-col transition-all">
        {/* Mock Mobile Status Bar */}
        <div className="bg-[#ffffff] px-6 pt-3 pb-2 flex items-center justify-between text-[#3d4a42] border-b border-[#f4f2fd]">
          <span className="text-xs font-bold tracking-tight text-[#1a1b22]">12:42</span>
          {/* Speaker notch */}
          <div className="w-16 h-1 bg-[#e3e1ec] rounded-full"></div>
          <div className="flex items-center gap-1.5 text-[#3d4a42]">
            <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[13px]">wifi</span>
            <span className="material-symbols-outlined text-[13px]">battery_full</span>
          </div>
        </div>

        {/* Mobile App Header */}
        <div className="px-4 py-2.5 bg-[#ffffff] flex items-center justify-between border-b border-[#f4f2fd]">
          <div className="flex items-center gap-2">
            <img
              alt="Express-Bite"
              className="h-7 object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U6U9GGSG8pFbBFkkIGJ18WJUoue5OXxT4iGfLLOt0rjtCZdhgqkmQv2Tjkmpja0cO3hV25yKxluUOR-6Zk9FdHzFXvYhQNWh2v5bi10JJb13L1Xi9m07on70avRO2J0o0LEEIjq5xoITFvqnHbM3YO-wM-uqoKLOeHZbe_u0v6jEBAfltNZO34YCo-qa7QozqNMYichc7aZfrNgxaVyTzhiu-hzxx_49xg8pWCsMV5MJZ925e_8lHcdgU"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#1a1b22] hover:bg-[#e3e1ec] transition-colors"
              title="Ver Pedido"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#006948] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scaleIn">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#3d4a42] hover:text-[#1a1b22]"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content inside Mockup */}
        <div className="p-3.5 flex flex-col gap-3 bg-[#fbf8ff] overflow-y-auto max-h-[640px]">
          {/* Waiting line status widget */}
          <div className="bg-[#ffffff] p-2.5 rounded-xl shadow-xs border border-[#eeedf7] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#85f8c4]/40 flex items-center justify-center text-[#006948]">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                  <span className="text-xs text-[#1a1b22] font-bold">
                    Espera actual: 3 pedidos
                  </span>
                </div>
                <p className="text-[11px] text-[#3d4a42]">
                  Tiempo est. ~4 min en barra
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-[#eeedf7] px-2 py-0.5 rounded-md text-[#3d4a42] font-semibold">
              Baja afluencia
            </span>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1a1b22] text-[#ffffff] shadow-xs'
                    : 'bg-[#ffffff] text-[#3d4a42] border border-[#eeedf7] hover:text-[#1a1b22]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid: 2x2 Clean Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1a1b22]">
                Disponibles Ahora
              </span>
              <span className="text-[11px] text-[#006948] font-semibold">
                Pausa activa
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {displayedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleProductAdd}
                />
              ))}
            </div>
          </div>

          {/* Live Order Status Widget */}
          <OrderLiveTracker
            currentOrder={activeOrder}
            demonstrationState={demonstrationState}
            onStateChange={onDemonstrationStateChange}
          />
        </div>

        {/* Home Indicator */}
        <div className="bg-[#ffffff] py-2 flex justify-center border-t border-[#f4f2fd]">
          <div className="w-28 h-1 bg-[#e3e1ec] rounded-full"></div>
        </div>

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          totalAmount={cartTotal}
          customerName={customerName}
          onCustomerNameChange={onCustomerNameChange}
          onUpdateQty={onUpdateCartQty}
          onRemove={onRemoveCartItem}
          onSubmitOrder={() => {
            onSubmitOrder();
            setIsCartOpen(false);
            showToast('¡Pedido enviado a cocina!');
          }}
          isSubmitting={isSubmittingOrder}
        />
      </div>

      {/* Floating Student Toast Alert */}
      <div className={`transition-all duration-300 mt-2 px-3.5 py-1.5 rounded-full bg-[#2f3038] text-white text-xs flex items-center gap-1.5 shadow-md ${
        toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <span className="material-symbols-outlined text-[#85f8c4] text-[15px]">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
