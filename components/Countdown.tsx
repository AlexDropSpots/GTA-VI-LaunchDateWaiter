import React, { useEffect, useState } from 'react';
import { CountdownTime } from '../types';
import { Timer, Calendar, Clock } from 'lucide-react';

// Speculative Release Date: November 19, 2026
const TARGET_DATE = new Date('2026-11-19T00:00:00').getTime();

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-pink-500/30 rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] neon-box relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="text-3xl md:text-6xl font-bold font-heading text-white neon-text z-10">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-pink-300 font-semibold tracking-widest uppercase z-10 mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400 bg-black/60 px-6 py-3 rounded-full border border-white/10">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-pink-500" />
          <span>Target: Fall 2026 (Est. Nov 19)</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Timer className="w-4 h-4 text-purple-500" />
          <span>Platform: PS5, Xbox Series X|S</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;