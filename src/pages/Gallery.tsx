import { motion } from 'framer-motion'
import { Image as ImageIcon, Calendar } from 'lucide-react'
import { useGuildData } from '../hooks/useGuildData'
import type { GalleryItem } from '../types/guild'

export default function Gallery() {
  const { gallery } = useGuildData()

  return (
    <motion.div
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
  )
}
