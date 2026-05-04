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
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a0a0b] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 scrollbar-hide"
            >
              {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {member.effects?.includes('katana') && <KatanaSlashEffect />}
                 {member.effects?.includes('dual_slash') && <DualSlashEffect />}
                 {member.effects?.includes('magic') && <MagicBurstEffect />}
                 {member.effects?.includes('fire') && <FireStormEffect />}
                 {member.effects?.includes('darkness') && <DarkVoidEffect />}
                 {member.effects?.includes('wind') && <WindEffect />}
                 {member.effects?.includes('heavy_impact') && <HeavyImpactEffect />}
                 {member.effects?.includes('blood') && <BloodEffect />}
                 {member.effects?.includes('neko_punch') && <NekoPunchEffect />}
                 {member.effects?.includes('ghost') && <GhostEffect />}
                 {member.effects?.includes('sparkle') && <SparkleEffect />}
              </div> */}

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/50 hover:text-white border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Imagem e Função */}
                <div className="w-full md:w-[40%] p-4 sm:p-6 md:p-12 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="relative z-10 w-full max-w-[240px] md:max-w-none aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={member.images.main} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  <div className="w-full mt-4 md:mt-8 space-y-2 md:space-y-4">
                     <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40">Função</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border", getRoleBadgeColor(member.roleType))}>
                          {member.roleType || 'N/A'}
                        </span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40">Sub Arma</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-white/80">{member.subWeapon || 'Nenhum'}</span>
                     </div>
                  </div>
                </div>

                {/* Info e Recordes */}
                <div className="w-full md:w-[60%] p-6 md:p-12 flex flex-col">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase rounded-full bg-white/5 border border-white/10" style={{ color: member.colors.primary }}>
                        {member.role}
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{member.joinDate}</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-white mb-1 tracking-tighter uppercase italic">
                      {member.name}
                    </h2>

                    <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-white/40 mb-6 md:mb-8">
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

export const KatanaSlashEffect = () => (
  <div className="absolute inset-0 z-20 pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ width: 0, opacity: 0, rotate: 45 + (i * 30), left: '10%', top: '50%' }}
        animate={{ width: '150%', opacity: [0, 1, 0] }}
        transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
        className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)]"
      />
    ))}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-white" />
  </div>
);

export const DualSlashEffect = () => (
  <div className="absolute inset-0 z-20 pointer-events-none">
    <motion.div
      initial={{ width: 0, opacity: 0, rotate: -30, left: '0%', top: '40%' }}
      animate={{ width: '150%', opacity: [0, 1, 0] }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_25px_rgba(96,165,250,0.8)]"
    />
    <motion.div
      initial={{ width: 0, opacity: 0, rotate: 30, right: '0%', top: '60%' }}
      animate={{ width: '150%', opacity: [0, 1, 0] }}
      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      className="absolute h-1 bg-gradient-to-l from-transparent via-purple-400 to-transparent shadow-[0_0_25px_rgba(192,132,252,0.8)]"
    />
  </div>
);

export const MagicBurstEffect = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 4], opacity: [0, 0.8, 0], x: (Math.random() - 0.5) * 1200, y: (Math.random() - 0.5) * 1200 }}
        transition={{ duration: 2, delay: Math.random() * 0.5, repeat: Infinity }}
        className="absolute w-2 h-2 rounded-full bg-blue-300 blur-[2px] shadow-[0_0_15px_#93c5fd]"
      />
    ))}
  </div>
);

export const FireStormEffect = () => (
    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-transparent to-transparent">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, scale: Math.random() }}
            animate={{ y: '-20%', opacity: [0, 1, 0] }}
            transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute w-1 h-8 bg-orange-400 rounded-full blur-[1px]"
          />
        ))}
    </div>
);

export const HeavyImpactEffect = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.5, 3], opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
        className="absolute w-60 h-60 rounded-full border-4 border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
      />
    ))}
    <motion.div
      animate={{ 
        x: [-5, 5, -5, 5, 0],
        y: [-2, 2, -2, 2, 0]
      }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 1.5 }}
      className="absolute inset-0 bg-white/5"
    />
  </div>
);

export const DarkVoidEffect = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -inset-40 bg-gradient-to-tr from-indigo-900/50 via-black to-purple-900/50 blur-[150px]"
        />
    </div>
);

export const WindEffect = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: '-10%', y: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{ x: '110%', opacity: [0, 0.6, 0] }}
        transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
        className="absolute h-[2px] w-40 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"
      />
    ))}
  </div>
);

export const BloodEffect = () => (
  <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '-10%', x: `${Math.random() * 100}%`, height: 0 }}
        animate={{ y: '110%', height: '30%' }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        className="absolute w-[2px] bg-red-600/50 blur-[1px]"
      />
    ))}
  </div>
);

export const NekoPunchEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110%', x: `${10 + Math.random() * 80}%`, opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ 
          y: '-10%', 
          opacity: [0, 1, 0], 
          rotate: [20, -20, 20],
          x: `${(10 + Math.random() * 80) + (Math.random() - 0.5) * 20}%`
        }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
        className="absolute text-4xl filter drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]"
      >
        {['🐾', '🐱', '✨', '🌸'][Math.floor(Math.random() * 4)]}
      </motion.div>
    ))}
    <motion.div 
      animate={{ opacity: [0, 0.1, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute inset-0 bg-pink-500/20 blur-3xl"
    />
  </div>
);

export const GhostEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0, scale: 1 }}
        animate={{ y: '-20%', opacity: [0, 0.3, 0], scale: [1, 1.5] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 4 }}
        className="absolute text-6xl grayscale opacity-20"
      >
        👻
      </motion.div>
    ))}
  </div>
);

export const SparkleEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0, x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_100px_rgba(0,0,0,0.5)]"
      />
    ))}
  </div>
);
