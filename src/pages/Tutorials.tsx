import { motion } from 'framer-motion'
import { Hammer, FlaskConical } from 'lucide-react'
import { useGuildData } from '../hooks/useGuildData'

export default function Tutorials() {
  const { tutorials } = useGuildData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto space-y-16"
    >
      <div className="text-center space-y-6">
        <h2 className="text-7xl font-black uppercase tracking-tighter italic">Biblioteca</h2>
        <p className="text-white/40 max-w-xl mx-auto font-medium italic">O conhecimento é a arma mais poderosa de um Kurogane.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {tutorials.map(tutorial => (
          <div 
            key={tutorial.id} 
            className="group relative p-10 rounded-[2.5rem] bg-[#0d0d0f] border border-white/5 hover:border-white/20 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               {tutorial.id === 'blacksmith' ? <Hammer size={120} /> : <FlaskConical size={120} />}
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all duration-500">
                {tutorial.id === 'blacksmith' ? <Hammer size={28} /> : <FlaskConical size={28} />}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic">{tutorial.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">
                {tutorial.content}
              </p>
              <button className="pt-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 group/link">
                <span className="text-white/40 group-hover/link:text-white transition-colors">Abrir tutorial completo</span>
                <div className="w-8 h-px bg-white/10 group-hover/link:w-12 group-hover/link:bg-white transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
