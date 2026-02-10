
import React, { useState } from 'react';
import { UserRole } from './types';
import { ADMIN_CREDENTIALS } from './constants';
import { mockDataService } from './mockDataService';

interface Props { onLogin: (user: any) => void; }

const Login: React.FC<Props> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.PARTICIPANT);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [adminName, setAdminName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === UserRole.ADMIN) {
      if (id === ADMIN_CREDENTIALS.cnpj && password === ADMIN_CREDENTIALS.password && ADMIN_CREDENTIALS.validUsers.includes(adminName)) {
        onLogin({ id: adminName, role: UserRole.ADMIN, name: adminName });
      } else {
        alert("Erro Admin");
      }
      return;
    }

    const participants = mockDataService.getParticipants();
    const consultants = mockDataService.getConsultants();

    if (role === UserRole.PARTICIPANT) {
      const user = participants.find(p => p.cpf === id && p.password === password);
      if (user && user.isApproved) onLogin({ ...user, role: UserRole.PARTICIPANT });
      else alert("Erro ou Aguardando Aprovação");
    } else {
      const user = consultants.find(c => c.cpf === id && c.password === password);
      if (user && user.isApproved) onLogin({ ...user, role: UserRole.CONSULTANT });
      else alert("Erro ou Aguardando Aprovação");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-b21-gradient rounded-3xl mx-auto flex items-center justify-center text-white font-beauty text-3xl">B21</div>
          <h1 className="mt-4 text-3xl font-beauty text-beauty-dark">Beauty 21</h1>
        </div>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 space-y-4">
          <div className="flex bg-slate-50 p-1 rounded-2xl mb-4">
            {Object.values(UserRole).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase ${role === r ? 'bg-white shadow text-beauty-magenta' : 'text-slate-400'}`}>{r}</button>
            ))}
          </div>
          <input type="text" placeholder="CPF ou CNPJ" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={id} onChange={e => setId(e.target.value)} required />
          {role === UserRole.ADMIN && <input type="text" placeholder="Nome (RC/Ricardo)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={adminName} onChange={e => setAdminName(e.target.value)} required />}
          <input type="password" placeholder="Senha" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-b21-gradient text-white py-4 rounded-2xl font-black uppercase text-xs">Entrar</button>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-4">Novo? <a href="#/register" className="text-beauty-magenta">CADASTRE-SE</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
