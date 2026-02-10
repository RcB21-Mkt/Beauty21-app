
export enum UserRole {
  PARTICIPANT = 'PARTICIPANT',
  CONSULTANT = 'CONSULTANT',
  ADMIN = 'ADMIN'
}

export interface Purchase {
  id: string;
  purchaseNumber: string;
  amount: number;
  stars: number;
  date: string;
  isActivation?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  consultantId: string;
  isApproved: boolean;
  isActivated: boolean;
  followsInstagram: boolean;
  stars: number;
  balloonTickets: number;
  purchases: Purchase[];
  createdAt: string;
  activationDate?: string;
}

export interface Consultant {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  isApproved: boolean;
  createdAt: string;
  starsTarget: number;
}

export interface RewardLevel {
  stars: number;
  name: string;
  reward: string;
  description: string;
  icon: string;
}
