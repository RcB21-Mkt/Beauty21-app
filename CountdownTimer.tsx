
import React, { useState, useEffect } from 'react';
import { CAMPAIGN_END_DATE } from './constants';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date(CAMPAIGN_END_DATE) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          D: Math.floor(diff / (1000 * 60 * 60 * 24)),
          H: Math.floor((diff / (1000 * 60 * 60)) % 24),
          M: Math.floor((diff / 1000 / 60) % 60),
          S: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <span className="text-white text-[10px] font-black">EXPIRADO</span>;

  return (
    <div className="text-white font-black text-[10px] flex gap-2">
      <span>{timeLeft.D}D</span>
      <span>{timeLeft.H}H</span>
      <span>{timeLeft.M}M</span>
      <span>{timeLeft.S}S</span>
    </div>
  );
};

export default CountdownTimer;
