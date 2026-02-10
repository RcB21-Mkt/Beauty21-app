
import React from 'react';
import { SUPPORT_INFO } from './constants';
import CountdownTimer from './CountdownTimer';

interface Props { children: React.ReactNode; user: any; onLogout: () => void; }

const Layout: React.FC<Props> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-beauty-dark p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-b21-gradient rounded-lg flex items-center justify-center text-white font-bold text-xs">B21</div>
          <h1 className="text-white font-beauty text-lg">Beauty 21</h1>
        </div>
        <CountdownTimer />
        <button onClick={onLogout} className="text-white/60 text-[10px] font-black uppercase">Sair</button>
      </header>
      <main className="p-4">{children}</main>
      <footer className="p-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        {SUPPORT_INFO.whatsappDisplay} • Beauty 21
      </footer>
    </div>
  );
};

export default Layout;
