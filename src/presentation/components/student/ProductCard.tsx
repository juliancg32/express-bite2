/**
 * @license
 * Presentation Component: ProductCard
 * Renders individual product according to the Express-Bite Apple-style minimal UI.
 */

import React, { useState } from 'react';
import { ProductJSON } from '../../../core/domain/entities/Product.ts';

interface ProductCardProps {
  product: ProductJSON;
  onAddToCart: (product: ProductJSON) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (!product.isAvailable) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className="bg-[#ffffff] p-2.5 rounded-xl shadow-sm border border-[#eeedf7] flex flex-col justify-between group hover:shadow-md transition-all">
      <div>
        <div className="relative overflow-hidden rounded-lg mb-2 bg-[#f4f2fd] aspect-[4/3]">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.tag && (
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm shadow-xs ${
              product.tag === 'Chef Choice'
                ? 'bg-[#ffddb8] text-[#653e00]'
                : product.tag === '100% Natural'
                ? 'bg-[#ffffff]/90 text-[#006948]'
                : 'bg-[#ffffff]/90 text-[#1a1b22]'
            }`}>
              {product.tag}
            </span>
          )}

          {!product.isAvailable && (
            <div className="absolute inset-0 bg-[#1a1b22]/60 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-[#ba1a1a] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Agotado
              </span>
            </div>
          )}

          {product.isLowStock && product.isAvailable && (
            <span className="absolute bottom-1.5 right-1.5 bg-[#ffb95f] text-[#2a1700] text-[9px] font-bold px-1.5 py-0.5 rounded">
              Últimas {product.stock}
            </span>
          )}
        </div>

        <h3 className="text-xs font-semibold text-[#1a1b22] line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-[#3d4a42] line-clamp-1 mb-2">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1 mt-auto">
        <span className="text-sm font-bold text-[#1a1b22]">
          {product.formattedPrice}
        </span>

        <button
          onClick={handleAdd}
          disabled={!product.isAvailable}
          className={`px-2.5 py-1.2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 active:scale-95 shadow-xs ${
            !product.isAvailable
              ? 'bg-[#e3e1ec] text-[#6d7a72] cursor-not-allowed'
              : justAdded
              ? 'bg-[#00855d] text-white scale-95'
              : 'bg-[#006948] text-white hover:bg-[#00855d]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {justAdded ? 'check' : 'add'}
          </span>
          <span>{justAdded ? 'Listo' : 'Pedir'}</span>
        </button>
      </div>
    </div>
  );
};
