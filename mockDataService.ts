
import { Participant, Consultant, UserRole, Purchase } from './types';
import { STAR_RATE, INSTAGRAM_BONUS } from './constants';

const STORAGE_KEYS = {
  PARTICIPANTS: 'b21_participants',
  CONSULTANTS: 'b21_consultants',
};

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockDataService = {
  getParticipants: (): Participant[] => getFromStorage(STORAGE_KEYS.PARTICIPANTS, []),
  
  saveParticipant: (p: Participant) => {
    const list = mockDataService.getParticipants();
    const index = list.findIndex(item => item.id === p.id);
    if (index >= 0) list[index] = p;
    else list.push(p);
    saveToStorage(STORAGE_KEYS.PARTICIPANTS, list);
  },
  
  getConsultants: (): Consultant[] => getFromStorage(STORAGE_KEYS.CONSULTANTS, []),
  
  saveConsultant: (c: Consultant) => {
    const list = mockDataService.getConsultants();
    const index = list.findIndex(item => item.id === c.id);
    if (index >= 0) list[index] = c;
    else list.push(c);
    saveToStorage(STORAGE_KEYS.CONSULTANTS, list);
  },

  calculateStars: (amount: number, isActivation: boolean, followsInsta: boolean) => {
    let stars = Math.floor(amount / STAR_RATE);
    if (isActivation && followsInsta) stars *= INSTAGRAM_BONUS;
    return stars;
  },

  addPurchase: (participantId: string, purchase: Purchase) => {
    const participants = mockDataService.getParticipants();
    const p = participants.find(x => x.id === participantId);
    if (p) {
      p.purchases.push(purchase);
      p.stars += purchase.stars;
      if (purchase.isActivation) p.isActivated = true;
      mockDataService.saveParticipant(p);
      return p;
    }
    return null;
  },

  useBalloonTicket: (participantId: string, reward: { type: 'STARS' | 'DISCOUNT', value: number }) => {
    const participants = mockDataService.getParticipants();
    const p = participants.find(x => x.id === participantId);
    if (p && p.balloonTickets > 0) {
      p.balloonTickets -= 1;
      if (reward.type === 'STARS') p.stars += reward.value;
      mockDataService.saveParticipant(p);
      return p;
    }
    return null;
  }
};
