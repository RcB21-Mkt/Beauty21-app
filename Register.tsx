
import React, { useState } from 'react';
import { UserRole, Participant, Consultant } from './types';
import { mockDataService } from './mockDataService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.PARTICIPANT);
  const [formData, setFormData] = useState({ name: '', cpf: '', email: '', phone: '', password: '', confirmPassword: '', consultantId: '', followsInstagram: false });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    if (role === UserRole.PARTICIPANT) {
      const p: Participant = { ...formData, id, isApproved: false, isActivated: false, stars: 0, balloonTickets: 0, purchases: [], createdAt: new Date().toISOString() };
      mockDataService.saveParticipant(p);
    } else {
      const c: Consultant = { ...formData, id, isApproved: false, createdAt: new Date().toISOString(), starsTarget: 0 };
      mockDataService.saveConsultant(c);
    }
    alert("Cadastro enviado para aprovação!");
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6 bg-beauty-light flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-white w-full max-w-sm p-8 rounded-[40px] shadow-2xl space-y-4">
        <h2 className="text-2xl font-beauty text-center">Cadastro B21</h2>
        <input type="text" placeholder="Nome" className="w-full p-4 bg-slate-50 rounded-2xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="CPF" className="w-full p-4 bg-slate-50 rounded-2xl" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} required />
        <input type="password" placeholder="Senha (6 dígitos)" className="w-full p-4 bg-slate-50 rounded-2xl" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required maxLength={6} />
        <button type="submit" className="w-full bg-b21-gradient text-white py-4 rounded-2xl font-black uppercase">Enviar Cadastro</button>
        <button type="button" onClick={() => navigate('/login')} className="w-full text-slate-400 text-xs">Voltar</button>
      </form>
    </div>
  );
};

export default Register;
