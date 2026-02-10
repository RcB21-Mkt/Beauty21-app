
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Participant, Consultant } from './types';
import { mockDataService } from './mockDataService';

interface Props { user: any; onLogout: () => void; }

const AdminDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  useEffect(() => {
    setParticipants(mockDataService.getParticipants());
    setConsultants(mockDataService.getConsultants());
  }, []);

  return (
    <Layout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-beauty mb-6">Painel Master B21</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Clientes</p>
          <p className="text-2xl font-black">{participants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Consultoras</p>
          <p className="text-2xl font-black">{consultants.length}</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
