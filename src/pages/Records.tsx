import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { useGuildData } from '../hooks/useGuildData'

export default function Records() {
  const { members } = useGuildData()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-6xl mx-auto space-y-12 md:space-y-20"
    >
      <div className="text-center space-y-4 md:space-y-6">
        <div className="inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-red-600/10 text-red-600 border border-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]">
           <Trophy size={32} className="md:w-12 md:h-12" />
        </div>
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">Hall da Fama</h2>
        <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-medium italic px-4">Os registros históricos das maiores façanhas da Kurogane.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Top Damage Section */}
        <div className="space-y-10 max-w-3xl mx-auto w-full">
           <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-red-500/50" />
              <h3 className="text-2xl font-black uppercase tracking-widest italic text-red-500">Ranking de Dano</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
           </div>
           
           <div className="space-y-4">
              {members
                .filter(m => m.records?.type === 'Damage')
                .sort((a, b) => {
                  const valA = parseInt(a.records!.value.replace(/\./g, ''));
                  const valB = parseInt(b.records!.value.replace(/\./g, ''));
                  return valB - valA;
                })
                .map((member, index) => (
                  <motion.div 
                    key={member.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-4 md:p-6 rounded-2xl bg-[#0d0d0f] border border-white/5 flex flex-col sm:flex-row items-center gap-4 md:gap-6 hover:border-red-500/30 transition-all shadow-xl"
                  >
                     <div className="flex items-center w-full sm:w-auto gap-4 md:gap-6">
                        <div className="text-2xl md:text-4xl font-black text-white/10 italic w-8 md:w-12 text-center">{index + 1}</div>
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/10 overflow-hidden shrink-0 shadow-2xl">
                           <img src={member.images.main} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight italic truncate">{member.name}</h4>
                           <p className="text-[10px] text-white/40 font-black uppercase tracking-widest truncate">{typeof member.class === 'string' ? member.class : member.class.join(' / ')} • {member.records?.skill}</p>
                        </div>
                     </div>
                     <div className="w-full sm:w-auto text-center sm:text-right border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                        <p className="text-2xl md:text-3xl font-black text-red-500 italic tracking-tighter">{member.records?.value}</p>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 italic">Peak Damage</div>
                     </div>
                  </motion.div>
                ))
              }
           </div>
        </div>
      </div>
    </motion.div>
  )
}
