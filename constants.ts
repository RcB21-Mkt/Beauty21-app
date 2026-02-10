
import { RewardLevel } from './types';

export const REWARD_LEVELS: RewardLevel[] = [
  { stars: 10, name: 'Estrela Bronze', reward: '1 Senha do Estoura Balão', description: 'Ganha uma chance instantânea de prêmio.', icon: '🎈' },
  { stars: 20, name: 'Estrela Gold', reward: 'Lápis de Sobrancelha Mia Make', description: 'Item essencial de uso diário.', icon: '✏️' },
  { stars: 30, name: 'Estrela Ouro', reward: 'Delineador Mia Make', description: 'Um upgrade no seu visual.', icon: '👁️' },
  { stars: 50, name: 'VIP Beauty 50', reward: '01 Hidratante Max Love', description: 'Skincare de qualidade.', icon: '🧴' },
  { stars: 75, name: 'VIP Beauty 75', reward: 'Batom Bala Matte + Voucher R$ 30', description: 'Produto + Cashback.', icon: '💄' },
  { stars: 100, name: 'VIP Beauty 100', reward: 'Kit Skincare Completo', description: 'Necessaire RC21 + Kit Profissional.', icon: '🧼' },
  { stars: 150, name: 'Estrela Diamante', reward: 'Kit Premium + Voucher Nails', description: 'Kit Make Especial + Voucher Nails.', icon: '💎' },
  { stars: 250, name: 'Visão 21 - Esmeralda', reward: 'Kit Nails Profissional', description: 'Cabine 54W + Motor + Coletor.', icon: '💅' },
];

export const STAR_RATE = 100; 
export const INSTAGRAM_BONUS = 2; 
export const ADMIN_CREDENTIALS = {
  cnpj: '48.222.924/0001-69',
  password: '460130',
  validUsers: ['RC', 'Ricardo']
};

export const SUPPORT_INFO = {
  whatsappDisplay: '11 97498-2121',
  address: 'Rua Santa Rita, 5 – São José, Recife'
};

const now = new Date();
export const CAMPAIGN_END_DATE = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
