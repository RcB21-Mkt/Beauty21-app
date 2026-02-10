
import React, { useState, useEffect } from 'react';
import { Consultant, Participant } from './types';
import Layout from './Layout';
import { mockDataService } from './mockDataService';

interface Props { user: Consultant; onLogout: () => void; }

const ConsultantDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [clients, setClients] = useState<Participant[]>([]);

  useEffect(() => {
    const all = mockDataService.getParticipants();
    setClients(all);
  }, []);

  const approve = (id: string) => {
    const all = mockDataService.getParticipants();
    const p = all.find(x => x.id === id);
    if (p) {
      p.isApproved = true;
      mockDataService.saveParticipant(p);
      setClients([...all]);
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-beauty-dark p-8 rounded-[40px] text-white">
          <h2 className="text-xs font-black text-beauty-magenta uppercase tracking-widest">Sua Meta</h2>
          <p className="text-3xl font-black mt-2">R$ 15.000,00</p>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
          <div className="p-4 bg-slate-100 text-[10px] font-black uppercase">Clientes Pendentes</div>
          {clients.filter(c => !c.isApproved).map(c => (
            <div key={c.id} className="p-4 flex justify-between items-center border-b">
              <span className="text-sm font-bold">{c.name}</span>
              <button onClick={() => approve(c.id)} className="bg-green-500 text-white text-[9px] px-3 py-1 rounded-lg">Aprovar</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ConsultantDashboard;
