/**
 * COMPONENTE: MemberCard
 * Exibe o card de um membro da guilda e seu perfil detalhado em um modal.
 */

import React, { useState, useRef } from 'react';
import type { GuildMember } from '../types/guild';
import { cn } from '../lib/utils';
import { toPng } from 'html-to-image';
import { Copy, Maximize2, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberCardProps {
  member: GuildMember;
  isLeader?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, isLeader }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Exporta o card atual como uma imagem PNG
   */
  const exportCard = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = `kurogane-${member.name.toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const getRoleBadgeColor = (type?: string) => {
    switch(type) {
      case 'DPS': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Tank': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Support': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const getClassIcon = (className: string) => {
    switch(className.toLowerCase()) {
      case 'mago': return '魔';
      case 'samurai': return '侍';
      case 'halberd': return '矛';
      case 'knuckles': return '拳';
      case 'tank': return '盾';
      case 'one sword': return '剣';
      case 'dual sword': return '双';
      case 'arqueiro': return '弓';
      case 'synthesis': return '煉';
      case 'ferreiro': return '鍛';
      default: return '◈';
    }
  };

  return (
    <>
      {/* --- CARD PRINCIPAL --- */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        ref={cardRef}
        className={cn(
          "relative group overflow-hidden rounded-2xl border transition-all shadow-xl",
          isLeader ? "w-full max-w-[280px] sm:w-72 h-[420px] border-white/20" : "w-full max-w-[260px] sm:w-64 h-[380px] border-white/10"
        )}
        style={{
          background: `linear-gradient(180deg, ${member.colors.secondary} 0%, ${member.colors.primary} 100%)`,
          color: member.colors.text || 'white'
        }}
      >
        <div 
          className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
          style={{ backgroundColor: member.colors.primary }}
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

        <div className="relative z-10 flex flex-col h-full p-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60">
                {member.role}
              </span>
              <div className="h-0.5 w-8 mt-1" style={{ backgroundColor: member.colors.primary }} />
            </div>
            {member.roleType && (
              <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border", getRoleBadgeColor(member.roleType))}>
                {member.roleType}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center flex-1">
            <div className="relative mb-6">
              <div className="absolute inset-0 -m-2 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 -m-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="relative w-36 h-36 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl">
                <img 
                  src={member.images.main} 
                  alt={member.name} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <h3 className="text-xl font-black tracking-tighter uppercase italic">{member.name}</h3>
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-black/30 border border-white/10">
              <span className="text-xs font-serif text-white/80">{getClassIcon(member.class)}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{member.class}</span>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2 group/btn"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Ver Perfil</span>
              <Maximize2 size={14} className="group-hover/btn:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL DE PERFIL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-[95vw] md:max-w-5xl h-auto max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0a0b] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 scrollbar-hide"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/50 hover:text-white border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* PARTE 1: Imagem e Cabeçalho Principal */}
                <div className="w-full md:w-[45%] p-5 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 pointer-events-none">
                    {member.effects?.map((effect, idx) => {
                        if (typeof effect === 'object' && effect.type === 'emojis') {
                          return <FloatingEmojisEffect key={idx} emojis={effect.emojis} color={member.colors.primary} />;
                        }
                        return null;
                    })}
                  </div>
                  
                  <div className="relative z-10 w-full max-w-[260px] md:max-w-none aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-4 md:mb-6">
                    <img src={member.images.main} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    
                    {/* Nome e Função sobrepostos apenas no mobile */}
                    <div className="absolute bottom-4 left-4 right-4 md:hidden">
                       <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 mb-1 inline-block" style={{ color: member.colors.primary }}>
                          {member.role}
                       </span>
                       <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic drop-shadow-lg">
                          {member.name}
                       </h2>
                    </div>
                  </div>

                  <div className="hidden md:block w-full space-y-4">
                     <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Função</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border", getRoleBadgeColor(member.roleType))}>
                          {member.roleType || 'N/A'}
                        </span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Sub Arma</span>
                        <span className="text-[10px] font-black uppercase text-white/80">{member.subWeapon || 'Nenhum'}</span>
                     </div>
                  </div>
                </div>

                {/* PARTE 2: Detalhes, Recordes e Skills */}
                <div className="w-full md:w-[55%] p-6 md:p-12 flex flex-col">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 md:space-y-8"
                  >
                    {/* Nome e Cabeçalho visíveis apenas no Desktop */}
                    <div className="hidden md:block">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase rounded-full bg-white/5 border border-white/10" style={{ color: member.colors.primary }}>
                          {member.role}
                        </span>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{member.joinDate}</span>
                      </div>
                      <h2 className="text-7xl font-black text-white mb-1 tracking-tighter uppercase italic">
                        {member.name}
                      </h2>
                    </div>

                    {/* Conteúdo comum (Mobile e Desktop) */}
                    <div className="md:hidden flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{member.joinDate} na Guilda</span>
                       <div className="flex items-center gap-2 text-sm font-bold text-white/40">
                        <span className="font-serif text-white/60">{getClassIcon(member.class)}</span>
                        <span className="uppercase tracking-tighter">{member.class}</span>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-2xl font-bold text-white/40 mb-8">
                      <span className="font-serif text-white/60">{getClassIcon(member.class)}</span>
                      <span className="uppercase tracking-tighter">{member.class}</span>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      <div className="relative pl-4 border-l-2" style={{ borderColor: member.colors.primary }}>
                        <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Filosofia</h4>
                        <p className="text-lg md:text-2xl italic font-medium text-white/90 leading-tight">"{member.quote}"</p>
                      </div>
                      
                      {member.records && (
                        <div className="p-4 rounded-2xl bg-red-600/5 border border-red-600/10 flex flex-col sm:flex-row items-start sm:items-center justify-between group/record overflow-hidden relative gap-4">
                           <div className="flex items-center gap-4 relative z-10">
                              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                                 <Trophy size={20} />
                              </div>
                              <div>
                                 <h4 className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-1">Dano Máximo</h4>
                                 <p className="text-xl md:text-2xl font-black text-white tracking-tighter italic">
                                    {member.records.value} 
                                    <span className="text-[9px] text-white/40 ml-2 not-italic font-bold">({member.records.skill})</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                      )}

                      {member.favoriteSkills && (
                        <div className="space-y-2">
                          <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">Habilidades</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {member.favoriteSkills.map(skill => (
                              <span key={skill} className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 md:mt-12">
                      <button 
                        onClick={exportCard}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all hover:brightness-110 border border-white/10 shadow-lg"
                        style={{ backgroundColor: member.colors.primary, color: 'white' }}
                      >
                        <Copy size={14} /> Copiar Card
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Effects ---

export const FloatingEmojisEffect = ({ emojis, color }: { emojis: string[], color?: string }) => {
  const count = 10; // Quantidade ideal para preencher sem poluir
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
      {[...Array(count)].map((_, i) => {
        // Distribuição horizontal forçada em faixas de 10% (5%, 15%, 25%... 95%)
        const xBase = (i * (100 / count)) + 5; 
        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 15;
        
        return (
          <motion.div
            key={i}
            style={{ left: `${xBase}%` }}
            initial={{ 
              y: '120%', 
              opacity: 0, 
              scale: 0.7 + Math.random() * 0.4, 
              rotate: Math.random() * 360 
            }}
            animate={{ 
              y: '-20%', 
              opacity: [0, 1, 1, 0], 
              rotate: [0, 90, -90, 0],
              x: [0, Math.random() * 40 - 20, 0] // Oscilação lateral controlada
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              delay: -delay,
              ease: "linear"
            }}
            className="absolute text-xl md:text-3xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
          >
            {emojis[i % emojis.length]}
          </motion.div>
        );
      })}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute inset-0 blur-[150px]"
        style={{ backgroundColor: color || 'white' }}
      />
    </div>
  );
};

