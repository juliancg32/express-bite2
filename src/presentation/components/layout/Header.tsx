/**
 * @license
 * Presentation Component: Header
 */

import React, { useState, useEffect } from 'react';

export type ActiveTab = 'dual' | 'kds' | 'pickup' | 'inventory' | 'architecture';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeOrdersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  activeOrdersCount,
}) => {
  const [time, setTime] = useState<string>('12:42 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#e3e1ec] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand & Campus Status */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTabChange('dual')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <img
              alt="Express-Bite Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U6U9GGSG8pFbBFkkIGJ18WJUoue5OXxT4iGfLLOt0rjtCZdhgqkmQv2Tjkmpja0cO3hV25yKxluUOR-6Zk9FdHzFXvYhQNWh2v5bi10JJb13L1Xi9m07on70avRO2J0o0LEEIjq5xoITFvqnHbM3YO-wM-uqoKLOeHZbe_u0v6jEBAfltNZO34YCo-qa7QozqNMYichc7aZfrNgxaVyTzhiu-hzxx_49xg8pWCsMV5MJZ925e_8lHcdgU"
            />
            <span className="font-bold text-lg text-[#1a1b22] tracking-tight">Express-Bite</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#85f8c4]/30 text-[#005137] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
            <span>Servicio Activo • Cafetería Central</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-[#eeedf7] p-1 rounded-full gap-1 overflow-x-auto max-w-[500px] sm:max-w-none text-xs sm:text-sm font-semibold">
          <button
            onClick={() => onTabChange('dual')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'dual'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            <span>Mostrador & Pedidos</span>
          </button>

          <button
            onClick={() => onTabChange('kds')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'kds'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">microwave</span>
            <span>Cocina KDS</span>
            {activeOrdersCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'kds' ? 'bg-white text-[#006948]' : 'bg-[#006948] text-white'
              }`}>
                {activeOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('pickup')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'pickup'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">tv</span>
            <span>Pantalla de Recogida</span>
          </button>

          <button
            onClick={() => onTabChange('inventory')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'inventory'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span>Stock</span>
          </button>

          <button
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#006948] font-bold bg-[#85f8c4]/20 hover:bg-[#85f8c4]/40'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">architecture</span>
            <span className="hidden md:inline">Clean & SOLID</span>
          </button>
        </nav>

        {/* Right Info: Clock & Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[#3d4a42] text-xs font-semibold bg-[#eeedf7] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>{time}</span>
          </div>

          <div 
            title="Operador: Sistema Central"
            className="w-8 h-8 rounded-full bg-[#006948] text-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
