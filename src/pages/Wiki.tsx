import { useState, useMemo, lazy, Suspense } from 'react'
import { useGuildData } from '../hooks/useGuildData'
import { motion } from 'framer-motion'
import { BookOpen, Utensils, Users, ScrollText, Hammer, Filter, Gem } from 'lucide-react'
import { cn } from '../lib/utils'

const FoodItem = lazy(() => import('../components/FoodItem').then(m => ({ default: m.FoodItem })))
const LevelingGuide = lazy(() => import('../components/LevelingGuide').then(m => ({ default: m.LevelingGuide })))

export default function Wiki() {
  const { food, leveling, glossary, buildTips, crystas } = useGuildData()
  const [wikiSubTab, setWikiSubTab] = useState<'food' | 'leveling' | 'glossary' | 'builds' | 'crystas'>('crystas')
  const [filterFood, setFilterFood] = useState<string>('Todos')
  const [filterCrysta, setFilterCrysta] = useState<string>('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique food categories
  const foodCategories = useMemo(() => {
    const categories = food.map(f => {
      const match = f.name.match(/^([^(]+)/);
      return match ? match[1].trim() : f.name;
    });
    return ['Todos', ...Array.from(new Set(categories))];
  }, [food])

  // Get unique crysta types
  const crystaTypes = useMemo(() => {
    if (!crystas) return ['Todos'];
    const types = crystas.map(c => c.type);
    return ['Todos', ...Array.from(new Set(types))];
  }, [crystas])

  const filteredFood = useMemo(() => {
    if (filterFood === 'Todos') return food
    return food.filter(f => f.name.startsWith(filterFood))
  }, [food, filterFood])

  const filteredCrystas = useMemo(() => {
    if (!crystas) return []
    const term = searchTerm.toLowerCase().trim()
    return crystas.filter(c => {
      const matchesType = filterCrysta === 'Todos' || c.type === filterCrysta
      const matchesSearch = !term || c.name.toLowerCase().includes(term)
      return matchesType && matchesSearch
    })
  }, [crystas, filterCrysta, searchTerm])

  return (
    <motion.div
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
            { id: 'crystas', label: 'Xtais', icon: Gem },
            { id: 'food', label: 'Comidas', icon: Utensils },
            { id: 'leveling', label: 'Upar', icon: Users },
            { id: 'glossary', label: 'Glossário', icon: ScrollText },
            { id: 'builds', label: 'Builds', icon: Hammer },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setWikiSubTab(tab.id as 'food' | 'leveling' | 'glossary' | 'builds' | 'crystas')}
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
        <Suspense fallback={<div>Carregando...</div>}>
          {wikiSubTab === 'crystas' && (
            <div className="space-y-8 max-w-5xl">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Total Xtais</span>
                  <span className="text-3xl font-black text-red-500 italic">{crystas?.length || 0}</span>
                </div>
                <div className="flex-1 w-full relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar xtal pelo nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {crystaTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterCrysta(type)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border",
                        filterCrysta === type 
                          ? "bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                          : "bg-white/5 text-white/40 border-white/5 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrystas.length > 0 ? (
                  filteredCrystas.map((crysta, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
                          {crysta.name}
                        </h4>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                          {crysta.type}
                        </span>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black",
                        crysta.type === 'Weapon' ? 'bg-red-500/10 text-red-500' :
                        crysta.type === 'Armor' ? 'bg-blue-500/10 text-blue-500' :
                        crysta.type === 'Additional' ? 'bg-purple-500/10 text-purple-500' :
                        crysta.type === 'Special' ? 'bg-yellow-500/10 text-yellow-500' :
                        crysta.type === 'Enhancer' ? 'bg-green-500/10 text-green-500' :
                        'bg-zinc-500/10 text-zinc-500'
                      )}>
                        {crysta.type.charAt(0)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                     <p className="text-white/20 uppercase font-black tracking-widest text-sm">Nenhum xtal encontrado.</p>
                  </div>
                )}
              </div>
            </div>
          )}

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
        </Suspense>
      </div>
    </motion.div>
  )
}
