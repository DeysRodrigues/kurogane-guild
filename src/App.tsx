import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useGuildData } from './hooks/useGuildData'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  ScrollText
} from 'lucide-react'

// Components
import { Header } from './components/layout/Header'

// Pages (Lazy Load)
const Home = lazy(() => import('./pages/Home'))
const Wiki = lazy(() => import('./pages/Wiki'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Tutorials = lazy(() => import('./pages/Tutorials'))
const Records = lazy(() => import('./pages/Records'))

function AppContent() {
  const { guild } = useGuildData()
  const location = useLocation()

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

      <Header guildName={guild.name} discordUrl={guild.discord} />

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-white/5 border-t-red-600 rounded-full animate-spin" />
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/records" element={<Records />} />
            </Routes>
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
            <a href="#" className="text-white/20 hover:text-white transition-colors transform hover:scale-110">
              <MessageSquare size={20} />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors transform hover:scale-110">
              <Users size={20} />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors transform hover:scale-110">
              <ScrollText size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
