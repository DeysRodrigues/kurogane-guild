import { useState, useMemo, lazy, Suspense } from 'react'
import { useGuildData } from './hooks/useGuildData'

const MemberCard = lazy(() => import('./components/MemberCard').then(m => ({ default: m.MemberCard })))
const FoodItem = lazy(() => import('./components/FoodItem').then(m => ({ default: m.FoodItem })))
const LevelingGuide = lazy(() => import('./components/LevelingGuide').then(m => ({ default: m.LevelingGuide })))
import { 
  Users, 
  BookOpen, 
  ScrollText, 
  MessageSquare, 
  LayoutDashboard,
  Hammer,
  FlaskConical,
  Filter,
  Trophy,
  Utensils,
  Menu,
  Image as ImageIcon,
  Calendar,
  X as CloseIcon
} from 'lucide-react'
import { cn } from './lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

import type { GalleryItem } from './types/guild'

function App() {
  const { guild, leaders, others, food, leveling, tutorials, members, glossary, buildTips, gallery } = useGuildData()
  const [activeTab, setActiveTab] = useState<'home' | 'wiki' | 'tutorials' | 'records' | 'gallery'>('home')
  const [wikiSubTab, setWikiSubTab] = useState<'food' | 'leveling' | 'glossary' | 'builds'>('food')
  const [filterClass, setFilterClass] = useState<string>('Todos')
  const [filterFood, setFilterFood] = useState<string>('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'wiki', label: 'Wiki', icon: BookOpen },
    { id: 'gallery', label: 'Galeria', icon: ImageIcon },
    { id: 'tutorials', label: 'Tutoriais', icon: ScrollText },
    { id: 'records', label: 'Records', icon: Trophy },
  ]

  // Get unique classes for filtering
  const classes = useMemo(() => {
    const allHeroClasses = members.map(m => m.class)
    return ['Todos', ...Array.from(new Set(allHeroClasses))]
  }, [members])

  // Get unique food categories
  const foodCategories = useMemo(() => {
    const categories = food.map(f => {
      const match = f.name.match(/^([^(]+)/);
      return match ? match[1].trim() : f.name;
    });
    return ['Todos', ...Array.from(new Set(categories))];
  }, [food])

  const filteredLeaders = useMemo(() => {
    if (filterClass === 'Todos') return leaders
    return leaders.filter(m => m.class === filterClass)
  }, [leaders, filterClass])

  const filteredOthers = useMemo(() => {
    if (filterClass === 'Todos') return others
    return others.filter(m => m.class === filterClass)
  }, [others, filterClass])

  const filteredFood = useMemo(() => {
    if (filterFood === 'Todos') return food
    return food.filter(f => f.name.startsWith(filterFood))
  }, [food, filterFood])

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

  return (
    <div className="min-h-screen bg-[#050506] text-white selection:bg-[var(--accent)] selection:text-white font-sans overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        {/* Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-900/40 blur-[120px] rounded-full" />
        
        {/* Japanese Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')]" />

        {/* Large Background Kanji */}
        <div className="absolute top-1/4 -left-20 text-[20rem] font-serif font-black text-white/[0.02] -rotate-12 leading-none">
          武士
        </div>
        
        {/* Japanese Shadow Dragon */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] mix-blend-overlay pointer-events-none select-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png'), url('https://raw.githubusercontent.com/the-deys/storage/main/dragon-silhouette.png')`,
            backgroundSize: 'cover, contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="absolute bottom-1/4 -right-20 text-[25rem] font-serif font-black text-white/[0.01] rotate-12 leading-none">
          名誉
        </div>

        {/* Floating Particles/Petals */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + '%', 
              y: '-10%',
              rotate: 0 
            }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: '110%',
              x: (Math.random() * 100 - 10) + '%',
              rotate: 360
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-2 h-2 bg-red-500/20 blur-[1px] rounded-sm"
          />
        ))}
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-zinc-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 rounded-xl bg-black flex items-center justify-center font-black text-2xl border border-white/10 italic">
                K
              </div>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <div className="absolute -left-3 top-0 w-1 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] hidden sm:block" />
                <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none flex items-center gap-3">
                  {guild.name}
                  <span className="text-xs md:text-sm not-italic font-serif text-white/20 tracking-normal hidden xs:inline-block">黒鉄</span>
                </h1>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Oficial Website</span>
              </div>
              
              {/* Hanko Stamp */}
              <div className="w-8 h-8 flex items-center justify-center border-2 border-red-600/40 rounded-sm -rotate-12 bg-red-600/5 select-none shrink-0">
                <span className="text-[8px] font-serif text-red-500 font-black leading-[1.1] text-center">
                  黒<br/>鉄
                </span>
              </div>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'home' | 'wiki' | 'tutorials' | 'records')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative overflow-hidden group",
                  activeTab === tab.id 
                    ? "bg-white text-black" 
                    : "text-white/40 hover:text-white"
                )}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab !== tab.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-white w-0 group-hover:w-full transition-all"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="hidden sm:block"
            >
              <a 
                href={guild.discord} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] transition-all font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] active:scale-95"
              >
                <MessageSquare size={16} />
                <span>Join Discord</span>
              </a>
            </motion.div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {isMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#050506] overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as 'home' | 'wiki' | 'tutorials' | 'records')
                      setIsMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-4 w-full p-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                      activeTab === tab.id 
                        ? "bg-white text-black" 
                        : "text-white/40 bg-white/5"
                    )}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <a 
                  href={guild.discord} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 rounded-2xl bg-[#5865F2] text-white text-sm font-black uppercase tracking-widest"
                >
                  <MessageSquare size={18} />
                  Join Discord
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-white/5 border-t-[var(--accent)] rounded-full animate-spin" />
          </div>
        }>
          <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-32"
            >
              {/* Hero */}
              <section className="text-center space-y-12 py-10">
                <div className="flex flex-col items-center gap-6">
                  {/* New Recruitment Badge - Above Title */}
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
                    {/* Decorative Kanji Background */}
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
                      className="relative z-10 text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tighter uppercase italic"
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

              {/* Leaders */}
              {filteredLeaders.length > 0 && (
                <section className="space-y-16 relative">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">
                        Liderança
                      </h3>
                      <span className="text-[10px] font-serif text-red-500/60 mt-1 uppercase tracking-widest">指導者</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-red-600/20 to-transparent" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-12">
                    {filteredLeaders.map(member => (
                      <MemberCard key={member.id} member={member} isLeader />
                    ))}
                  </div>
                </section>
              )}

              {/* Members */}
              {filteredOthers.length > 0 && (
                <section className="space-y-16 relative">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">
                        Membros de Elite
                      </h3>
                      <span className="text-[10px] font-serif text-red-500/60 mt-1 uppercase tracking-widest">精鋭メンバー</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-red-600/20 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                    {filteredOthers.map(member => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </section>
              )}

              {filteredLeaders.length === 0 && filteredOthers.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-white/20 uppercase font-black tracking-widest">Nenhum membro encontrado nesta classe.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'wiki' && (
            <motion.div
              key="wiki"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Wiki Header & Sub-nav */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 border-b border-white/5 pb-8 md:pb-12">
                <div className="space-y-4">
                  <div className="inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20">
                    <BookOpen size={24} className="md:w-8 md:h-8" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Wiki Kurogane</h2>
                  <p className="text-white/40 text-sm md:text-base font-medium">Conhecimento compartilhado pela guilda.</p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2 p-1 md:p-1.5 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md">
                  {[
                    { id: 'food', label: 'Comidas', icon: Utensils },
                    { id: 'leveling', label: 'Upar', icon: Users },
                    { id: 'glossary', label: 'Glossário', icon: ScrollText },
                    { id: 'builds', label: 'Builds', icon: Hammer },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setWikiSubTab(tab.id as 'food' | 'leveling' | 'glossary' | 'builds')}
                      className={cn(
                        "flex items-center gap-1.5 px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all",
                        wikiSubTab === tab.id 
                          ? "bg-white text-black" 
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <tab.icon size={12} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wiki Content */}
              <div className="min-h-[500px]">
                {wikiSubTab === 'food' && (
                  <div className="space-y-8 max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="flex-1 w-full relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input 
                          type="text" 
                          placeholder="Buscar comida ou efeito..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {foodCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setFilterFood(cat)}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border",
                              filterFood === cat 
                                ? "bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                                : "bg-white/5 text-white/40 border-white/5 hover:text-white hover:bg-white/10"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {filteredFood
                        .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase()))
                        .length > 0 ? (
                          filteredFood
                            .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(item => (
                              <FoodItem key={item.id} item={item} />
                            ))
                        ) : (
                          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                             <p className="text-white/20 uppercase font-black tracking-widest text-sm">Nenhuma comida encontrada.</p>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}

                {wikiSubTab === 'leveling' && (
                  <div className="max-w-4xl space-y-8">
                    <div className="grid gap-6">
                      {leveling && leveling.length > 0 ? (
                        leveling.map((range, idx) => (
                          <LevelingGuide key={idx} range={range} />
                        ))
                      ) : (
                        <p className="text-white/20 uppercase font-black tracking-widest text-center py-20">Guia de up em breve.</p>
                      )}
                    </div>
                  </div>
                )}

                {wikiSubTab === 'glossary' && (
                  <div className="max-w-4xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {glossary && glossary.length > 0 ? (
                        glossary.map((item, idx) => (
                          <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/20 transition-colors group">
                             <h4 className="text-xl font-black text-red-500 uppercase italic tracking-tighter mb-2">{item.term}</h4>
                             <p className="text-white/40 text-sm font-medium leading-relaxed">{item.definition}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/20 uppercase font-black tracking-widest text-center py-20 col-span-2">Glossário em breve.</p>
                      )}
                    </div>
                  </div>
                )}

                {wikiSubTab === 'builds' && (
                  <div className="max-w-4xl grid gap-8 md:grid-cols-2">
                    {buildTips && buildTips.length > 0 ? (
                      buildTips.map((tip, idx) => (
                        <div key={idx} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-6">
                          <div className="flex items-center justify-between">
                             <h4 className="text-2xl font-black uppercase italic tracking-tighter">{tip.class}</h4>
                             <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black text-white/60">{tip.stats}</div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Habilidades Chave</p>
                             <div className="flex flex-wrap gap-2">
                                {tip.skills.map(skill => (
                                  <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60">{skill}</span>
                                ))}
                             </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/20 uppercase font-black tracking-widest text-center py-20 col-span-2">Dicas de build em breve.</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 md:space-y-16"
            >
              <div className="text-center space-y-4 md:space-y-6">
                <div className="inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-red-600/10 text-red-600 border border-red-600/20">
                   <ImageIcon size={32} className="md:w-12 md:h-12" />
                </div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">Galeria</h2>
                <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-medium italic px-4">Registros visuais da nossa jornada e conquistas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gallery && gallery.length > 0 ? (
                  gallery.map((item: GalleryItem, index: number) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-[#0d0d0f] border border-white/5 rounded-[2rem] overflow-hidden hover:border-red-600/30 transition-all shadow-2xl"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="p-8 space-y-4">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500">
                          <Calendar size={12} />
                          {item.date}
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{item.title}</h3>
                        <p className="text-sm text-white/40 font-medium leading-relaxed">{item.description}</p>
                      </div>

                      {/* Hover Overlay Detail */}
                      <div className="absolute top-4 right-4 w-10 h-10 border border-white/10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ImageIcon size={18} className="text-white/60" />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-white/20 uppercase font-black tracking-widest text-sm">Nenhuma imagem na galeria ainda.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'records' && (
            <motion.div
              key="records"
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
                                   <p className="text-[10px] text-white/40 font-black uppercase tracking-widest truncate">{member.class} • {member.records?.skill}</p>
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
          )}

          {activeTab === 'tutorials' && (
            <motion.div
              key="tutorials"
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
          )}
        </AnimatePresence>
        </Suspense>
      </main>

      <footer className="mt-40 border-t border-white/5 py-20 bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black italic text-sm">K</div>
              <span className="font-black tracking-tighter uppercase italic text-xl">{guild.name}</span>
            </div>
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em]">Honor • Strength • Unity</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
             <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
               &copy; 2026 Kurogane. Created by <span className="text-white">venushima</span>
             </p>
             <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="flex gap-8">
            {[MessageSquare, Users, ScrollText].map((Icon, i) => (
              <a key={i} href="#" className="text-white/20 hover:text-white transition-colors transform hover:scale-110">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
