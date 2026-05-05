import React, { useState } from 'react';
import type { FoodItem as FoodItemType } from '../types/guild';
import { copyToClipboard } from '../lib/utils';
import { Copy, Check, Utensils } from 'lucide-react';

export const FoodItem: React.FC<{ item: FoodItemType }> = ({ item }) => {
  const codes = item.code.split(' | ');

  return (
    <div className="flex flex-col p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)] transition-colors group gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[var(--accent-bg)] text-[var(--accent)] shrink-0">
          <Utensils size={20} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm md:text-base">{item.name}</h4>
          <p className="text-xs md:text-sm text-white/50">{item.description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {codes.map((code, index) => (
          <IndividualCode key={index} code={code} />
        ))}
      </div>
    </div>
  );
};

const IndividualCode: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-black/40 p-1.5 pr-3 rounded-lg border border-white/5 hover:border-white/10 transition-all group/code">
      <code className="px-2 py-0.5 text-[var(--accent)] font-mono text-xs md:text-sm">
        {code}
      </code>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all"
        title="Copiar código"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      </button>
    </div>
  );
};
