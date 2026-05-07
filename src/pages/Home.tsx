import { useState, useMemo, lazy, Suspense } from 'react'
import { useGuildData } from '../hooks/useGuildData'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { cn } from '../lib/utils'

const MemberCard = lazy(() => import('../components/MemberCard').then(m => ({ default: m.MemberCard })))

export default function Home() {
  const { guild, members } = useGuildData()
  const [filterClass, setFilterClass] = useState<string>('Todos')

  // Get unique classes for filtering
  const classes = useMemo(() => {
    const allHeroClasses = members.flatMap(m => Array.isArray(m.class) ? m.class : [m.class])
    return ['Todos', ...Array.from(new Set(allHeroClasses))]
  }, [members])

  const getClassSymbol = (cls: string) => {
    switch(cls.toLowerCase()) {
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

  // Get all members sorted by hierarchy
  const allSortedMembers = useMemo(() => {
    const hierarchy = {
      'Lider': 1,
      'Líder Conselheiro': 1,
      'Vice lider': 2,
      'Synthetisist': 3,
      'Ferreiro': 4,
      'Membro': 5,
      'Pé Rapado sem DPS': 6
    }
    
    const baseList = filterClass === 'Todos' 
      ? members 
      : members.filter(m => {
          if (Array.isArray(m.class)) {
            return m.class.includes(filterClass)
          }
          return m.class === filterClass
        })

    return [...baseList].sort((a, b) => {
      const rankA = hierarchy[a.role as keyof typeof hierarchy] || 99
      const rankB = hierarchy[b.role as keyof typeof hierarchy] || 99
      return rankA - rankB
    })
  }, [members, filterClass])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-32"
    >
      {/* Hero */}
      <section className="text-center space-y-12 py-10">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-600" />
            <div className="flex items-center gap-3 px-6 py-2 bg-red-600/10 border border-red-600/20 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                Recrutamento Aberto
              </span>
            </div>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-600" />
          </motion.div>

          <div className="relative inline-block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute -inset-x-20 -top-10 bottom-0 flex items-center justify-center pointer-events-none select-none z-0"
            >
              <span className="text-[15rem] md:text-[25rem] font-serif font-black text-red-600/[0.05] leading-none">
                鋼
              </span>
            </motion.div>

            <h1 
              className="relative z-10 text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter uppercase italic"
            >
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="block text-white font-sans not-italic tracking-[0.05em]"
              >
                FORJADOS
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ fontFamily: "'New Tegomin', serif" }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-50 to-zinc-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                NA BATALHA
              </motion.span>
            </h1>
          </div>
        </div>
        
        <p className="max-w-2xl mx-auto text-white/40 text-base md:text-xl font-medium leading-relaxed">
          {guild.description}
        </p>

        {/* Filter Section */}
        <div className="pt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-white/20 uppercase text-[10px] font-black tracking-widest">
            <Filter size={12} /> Filtrar por Disciplina
          </div>
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md max-w-4xl">
            {classes.map(cls => (
              <button
                key={cls}
                onClick={() => setFilterClass(cls)}
                className={cn(
                  "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border",
                  filterClass === cls 
                    ? "bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]" 
                    : "text-white/40 border-transparent hover:text-white hover:bg-white/5"
                )}
              >
                {cls !== 'Todos' && <span className="font-serif opacity-60 text-xs">{getClassSymbol(cls)}</span>}
                {cls}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members List */}
      <section className="space-y-16 relative">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">
              Elite Kurogane
            </h3>
            <span className="text-[10px] font-serif text-red-500/60 mt-1 uppercase tracking-widest">ギルドメンバー</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-red-600/20 to-transparent" />
        </div>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Carregando membros...</div>}>
          {allSortedMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
              {allSortedMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-white/20 uppercase font-black tracking-widest">Nenhum membro encontrado nesta classe.</p>
            </div>
          )}
        </Suspense>
      </section>
    </motion.div>
  )
}
