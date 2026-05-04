import React from 'react';
import type { LevelingRange } from '../types/guild';
import { MapPin, TrendingUp } from 'lucide-react';

export const LevelingGuide: React.FC<{ range: LevelingRange }> = ({ range }) => {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent)] text-white text-xs font-bold">
          <TrendingUp size={12} /> LV. {range.levelRange}
        </div>
        <h4 className="font-bold text-white flex items-center gap-1">
          <MapPin size={14} className="text-white/40" /> {range.location}
        </h4>
      </div>
      <p className="text-sm text-white/50 pl-1">{range.description}</p>
    </div>
  );
};
