import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  LayoutDashboard, 
  BookOpen, 
  ScrollText, 
  Trophy, 
  Menu, 
  Image as ImageIcon,
  X as CloseIcon 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeaderProps {
  guildName: string;
  discordUrl: string;
}

const navItems = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/wiki', label: 'Wiki', icon: BookOpen },
  { path: '/gallery', label: 'Galeria', icon: ImageIcon },
  { path: '/tutorials', label: 'Tutoriais', icon: ScrollText },
  { path: '/records', label: 'Records', icon: Trophy },
];

export const Header: React.FC<HeaderProps> = ({ guildName, discordUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 rounded-xl bg-black flex items-center justify-center font-black text-2xl border border-white/10 italic">
                K
              </div>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <div className="absolute -left-3 top-0 w-1 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] hidden sm:block" />
                <h1 
                  className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none flex items-center gap-3"
                  style={{ fontFamily: "'New Tegomin', serif" }}
                >
                  {guildName}
                  <span className="text-xs md:text-sm not-italic font-serif text-white/20 tracking-normal hidden xs:inline-block">黒鉄</span>
                </h1>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Oficial Website</span>
              </div>
              
              <div className="w-8 h-8 flex items-center justify-center border-2 border-red-600/40 rounded-sm -rotate-12 bg-red-600/5 select-none shrink-0">
                <span className="text-[8px] font-serif text-red-500 font-black leading-[1.1] text-center">
                  黒<br/>鉄
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative overflow-hidden group",
                isActive 
                  ? "bg-white text-black" 
                  : "text-white/40 hover:text-white"
              )}
            >
              <item.icon size={14} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden sm:block"
          >
            <a 
              href={discordUrl} 
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#050506] overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-4 w-full p-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                    isActive 
                      ? "bg-white text-black" 
                      : "text-white/40 bg-white/5"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
              <a 
                href={discordUrl} 
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
  );
};
