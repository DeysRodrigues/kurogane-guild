import React, { useState } from 'react';
import type { FoodItem as FoodItemType } from '../types/guild';
import { copyToClipboard } from '../lib/utils';
import { Copy, Check, Utensils } from 'lucide-react';

export const FoodItem: React.FC<{ item: FoodItemType }> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(item.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)] transition-colors group gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[var(--accent-bg)] text-[var(--accent)] shrink-0">
          <Utensils size={20} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm md:text-base">{item.name}</h4>
          <p className="text-xs md:text-sm text-white/50">{item.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-3 bg-black/20 sm:bg-transparent p-2 sm:p-0 rounded-lg">
        <code className="px-3 py-1 rounded bg-black/30 text-[var(--accent)] font-mono text-xs md:text-sm border border-white/5">
          {item.code}
        </code>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
};
