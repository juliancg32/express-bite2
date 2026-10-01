/**
 * @license
 * Presentation Component: Footer
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#e3e1ec] py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#3d4a42] text-xs font-medium">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="font-semibold text-[#1a1b22]">Campus Central Universitaria</span>
          <span>•</span>
          <span>Terminal Express POS v2.4</span>
          <span>•</span>
          <span className="bg-[#eeedf7] px-2 py-0.5 rounded text-[11px] font-mono text-[#006948]">
            SOLID & Clean Architecture Core
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#006948]">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
            <span>Sincronización en tiempo real (18ms)</span>
          </span>
          <span>© {new Date().getFullYear()} Express-Bite Systems</span>
        </div>
      </div>
    </footer>
  );
};
