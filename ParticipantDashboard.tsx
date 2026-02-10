
import React, { useState, useEffect } from 'react';
import { Participant } from './types';
import Layout from './Layout';
import { REWARD_LEVELS } from './constants';
import { mockDataService } from './mockDataService';
import { aiService } from './aiService';

interface Props { user: Participant; onLogout: () => void; }

const ParticipantDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [localUser, setLocalUser] = useState<Participant>(user);
  const [aiMsg, setAiMsg] = useState('Buscando inspiração...');

  useEffect(() => {
    const participants = mockDataService.getParticipants();
    const me = participants.find(p => p.id === user.id);
    if (me) setLocalUser(me);
    
    aiService.generateEmotionalMessage(user.name, user.stars, 10, 'Próximo Nível').then(setAiMsg);
  }, [user.id, user.name, user.stars]);

  return (
    <Layout user={localUser} onLogout={onLogout}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white p-8 rounded-[40px] shadow-xl text-center border border-purple-50">
          <div className="text-4xl mb-4">✨</div>
          <h2 className="text-2xl font-beauty">Olá, {localUser.name}!</h2>
          <p className="text-beauty-magenta font-black text-4xl mt-4">{localUser.stars} ⭐</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">Estrelas Acumuladas</p>
        </div>

        <div className="bg-beauty-dark p-6 rounded-[32px] text-white italic text-sm">
          "{aiMsg}"
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-lg">
          <h3 className="text-[10px] font-black uppercase mb-4">Próximos Prêmios</h3>
          {REWARD_LEVELS.slice(0, 3).map(r => (
            <div key={r.stars} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="text-xs font-bold">{r.name}</span>
              <span className="text-beauty-magenta font-black text-xs">{r.stars} ⭐</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParticipantDashboard;
