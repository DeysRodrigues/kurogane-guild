import { motion } from 'framer-motion'
import { 
  Hammer, 
  FlaskConical, 
  ChevronRight, 
  BookOpen, 
  UserCircle, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  ArrowLeft,
  Calendar,
  Clock,
  Target
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

interface TutorialData {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  icon: typeof Hammer;
  content: JSX.Element;
}

const tutorialsData: Record<string, TutorialData> = {
  'blacksmith': {
    id: 'blacksmith',
    title: 'O Caminho do Ferreiro: Guia Definitivo de Crafting e Refino',
    category: 'Blacksmithing',
    description: 'Um guia exaustivo sobre como construir seu personagem ferreiro, subir proficiência eficientemente e dominar o mercado de Toram.',
    author: 'Venushima',
    date: '31 de Maio, 2026',
    readTime: '15 min',
    icon: Hammer,
    content: (
      <div className="space-y-12 text-white/70 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-red-600 pl-6">1. Fundamentos do Personagem Ferreiro</h2>
          <p>
            Ser um ferreiro em Toram Online não é apenas uma "profissão", é uma build de personagem inteira. 
            Diferente de personagens de combate, seu foco total será em **TEC (Technical)** ou **LUK (Luck)**, dependendo do seu objetivo.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-red-500 font-black uppercase text-sm mb-3">Ferreiro TEC (O Padrão)</h3>
              <p className="text-sm">Focado em 255 TEC. Essencial para criar equipamentos com alta taxa de sucesso e adicionar status personalizados (Statting).</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-red-500 font-black uppercase text-sm mb-3">Ferreiro LUK (Refinador)</h3>
              <p className="text-sm">Focado em 255 LUK. Usado exclusivamente para refinar equipamentos do +B para o +S, evitando a degradação do item.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-red-600 pl-6">2. Proficiência e Dificuldade</h2>
          <p>
            Para criar itens de nível alto, você precisa de **Proficiência**. Você ganha proficiência criando itens cujo nível de dificuldade seja próximo ao seu nível atual de proficiência.
          </p>
          <div className="bg-red-600/5 border border-red-600/20 p-8 rounded-3xl space-y-4">
            <p className="font-mono text-sm text-red-500 font-bold">Fórmula de Dificuldade de Criação:</p>
            <p className="text-2xl font-black text-white italic">Dificuldade = (DEX / 6) + (TEC / 2) + Proficiência</p>
            <p className="text-sm">Se a dificuldade do item for maior que a sua capacidade, você não poderá nem tentar criá-lo.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-red-600 pl-6">3. Guia de Subida de Nível (0-250)</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 items-center">
              <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-black">0-50</div>
              <p className="text-sm">Shortsword, Iron Greaves. Materiais fáceis de farmar em Rakau Plains.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 items-center">
              <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-black">50-150</div>
              <p className="text-sm">Rapier, Plate Armor. Comece a processar materiais de bosses como Minotaur.</p>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 items-center">
              <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-black">150-250</div>
              <p className="text-sm">Armas de Bosses atuais. O custo sobe drasticamente, foque em itens que tenham "App" (Aparência) valorizada.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-red-600 pl-6">4. O Segredo do Potencial</h2>
          <p>
            Equipamentos criados por jogadores têm **Potencial**. Quanto maior o potencial, melhores os status que você pode adicionar. 
            O potencial inicial depende do seu status principal:
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-black uppercase tracking-widest text-white/40">
            <li className="p-4 bg-white/5 rounded-xl border border-white/5 text-center"><span className="text-white block mb-1">Espada</span> STR/DEX</li>
            <li className="p-4 bg-white/5 rounded-xl border border-white/5 text-center"><span className="text-white block mb-1">Cajado</span> INT</li>
            <li className="p-4 bg-white/5 rounded-xl border border-white/5 text-center"><span className="text-white block mb-1">Arco</span> DEX</li>
            <li className="p-4 bg-white/5 rounded-xl border border-white/5 text-center"><span className="text-white block mb-1">Armadura</span> VIT</li>
          </ul>
        </section>

        <section className="pt-12 border-t border-white/10">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <ExternalLink size={16} className="text-red-500" /> Referências Acadêmicas
          </h3>
          <div className="grid gap-4 text-xs">
            <a href="https://coryn.club" target="_blank" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex justify-between items-center">
              <span>CORYN CLUB DATABASE - CALCULADORA DE POTENCIAL</span>
              <ChevronRight size={14} />
            </a>
            <a href="https://toramonline.com" target="_blank" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex justify-between items-center">
              <span>FORUM OFICIAL - GUIAS DE REFINO LUK VS TEC</span>
            </a>
          </div>
        </section>
      </div>
    )
  },
  'synthesis': {
    id: 'synthesis',
    title: 'Alquimia Avançada: De Revitas a 5-Lock',
    category: 'Synthesis',
    description: 'Aprenda a arte de combinar itens, criar consumíveis poderosos e dominar o mercado de aparências e corantes.',
    author: 'Venushima',
    date: '31 de Maio, 2026',
    readTime: '12 min',
    icon: FlaskConical,
    content: (
      <div className="space-y-12 text-white/70 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-blue-600 pl-6">1. Introdução à Alquimia</h2>
          <p>
            Diferente do Ferreiro, o Alquimista foca em consumíveis e na estética dos equipamentos. Um bom alquimista pode economizar milhões de Spinas criando suas próprias poções de cura e energia.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-blue-600 pl-6">2. O Caminho do Néctar (0-150)</h2>
          <p>Para subir de nível, você precisará de toneladas de **Flower Nectar**. O melhor lugar para farmar é em *Lonogo Canyon*, derrotando os *Pova*.</p>
          <div className="grid gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-6">
              <div className="text-4xl font-black text-blue-500/20">01</div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tighter">Practice Revita (Lv 0-50)</h4>
                <p className="text-sm">O começo de tudo. Use para ganhar os primeiros níveis de proficiência rapidamente.</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-6">
              <div className="text-4xl font-black text-blue-500/20">02</div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tighter">Revita I, II, III (Lv 50-150)</h4>
                <p className="text-sm">Conforme sua proficiência sobe, mude para receitas mais complexas para continuar ganhando EXP.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic border-l-4 border-blue-600 pl-6">3. Dominação de Lock (Síntese de Equips)</h2>
          <p>
            O "Lock" é a habilidade de fixar propriedades ao combinar dois itens. Isso é vital para criar o "set perfeito" visualmente.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/40 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="p-4">Nível de Lock</th>
                  <th className="p-4">Proficiência Req.</th>
                  <th className="p-4">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 font-bold text-white">2-Lock</td>
                  <td className="p-4">50</td>
                  <td className="p-4">Garante a transferência de 2 propriedades.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">3-Lock</td>
                  <td className="p-4">100</td>
                  <td className="p-4">Padrão para a maioria dos jogadores intermediários.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">4-Lock</td>
                  <td className="p-4">150</td>
                  <td className="p-4">Necessário para combinar cores raras e aparências.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">5-Lock</td>
                  <td className="p-4">200+</td>
                  <td className="p-4">O ápice da alquimia. Controle total sobre o item final.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="pt-12 border-t border-white/10">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <ExternalLink size={16} className="text-blue-500" /> Referências Acadêmicas
          </h3>
          <div className="grid gap-4 text-xs">
            <a href="https://toramonline.fandom.com" target="_blank" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex justify-between items-center">
              <span>WIKIA TORAM - TABELA COMPLETA DE POÇÕES</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </section>
      </div>
    )
  }
};

export default function Tutorials() {
  const { id } = useParams<{ id: string }>();
  const tutorial = id ? tutorialsData[id] : null;

  if (tutorial) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-8">
          <Link to="/tutorials" className="inline-flex items-center gap-2 text-white/40 hover:text-red-500 transition-colors font-black uppercase text-[10px] tracking-[0.2em] group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Biblioteca
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-widest">
                {tutorial.category}
              </span>
              <div className="h-px w-8 bg-white/10" />
              <div className="flex items-center gap-2 text-white/20 text-[9px] font-bold uppercase tracking-widest">
                <Calendar size={12} /> {tutorial.date}
              </div>
              <div className="flex items-center gap-2 text-white/20 text-[9px] font-bold uppercase tracking-widest">
                <Clock size={12} /> {tutorial.readTime} de leitura
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-[0.9] tracking-tighter">
              {tutorial.title}
            </h1>

            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-red-500">
                {tutorial.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">{tutorial.author}</p>
                <p className="text-[10px] text-white/20 uppercase font-bold">Pesquisador & Autor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="aspect-[21/9] rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <tutorial.icon size={120} className="relative z-10 text-white/10" />
        </div>

        <div className="article-content">
          {tutorial.content}
        </div>

        <footer className="pt-20 border-t border-white/5 flex flex-col items-center gap-8 text-center">
          <div className="space-y-2">
            <h4 className="text-white font-black uppercase italic text-xl">Toram Library</h4>
            <p className="text-white/20 text-xs font-medium uppercase tracking-widest">Conhecimento compartilhado, poder multiplicado.</p>
          </div>
          <Link 
            to="/tutorials" 
            className="px-10 py-4 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Explorar outros guias
          </Link>
        </footer>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-16"
    >
      <div className="text-center space-y-6">
        <div className="inline-flex p-4 rounded-3xl bg-red-600/10 text-red-600 border border-red-600/20 mb-4">
           <BookOpen size={40} />
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Biblioteca de Tutoriais</h2>
        <p className="text-white/40 max-w-xl mx-auto font-medium italic">Guias definitivos para dominar as artes de Toram Online.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {Object.values(tutorialsData).map(tutorial => (
          <motion.div 
            key={tutorial.id} 
            whileHover={{ y: -5 }}
            className="group relative p-10 rounded-[2.5rem] bg-[#0d0d0f] border border-white/5 hover:border-red-500/20 transition-all overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <tutorial.icon size={150} />
            </div>
            
            <div className="relative z-10 space-y-6 flex-1">
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-red-500">
                  {tutorial.category}
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{tutorial.date}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-tight group-hover:text-red-500 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-white/40 leading-relaxed font-medium line-clamp-3">
                  {tutorial.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-white/20 uppercase">Tempo</span>
                  <div className="flex items-center gap-1.5 text-white/60 font-bold text-[10px]">
                    <Clock size={12} /> {tutorial.readTime}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-white/20 uppercase">Nível</span>
                  <div className="flex items-center gap-1.5 text-white/60 font-bold text-[10px]">
                    <Target size={12} /> Iniciante
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-white/20 uppercase">Tipo</span>
                  <div className="flex items-center gap-1.5 text-white/60 font-bold text-[10px]">
                    <Zap size={12} /> Essencial
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to={`/tutorials/${tutorial.id}`}
              className="mt-8 w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all group/btn"
            >
              <span>Ler Guia Completo</span>
              <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="pt-20">
        <div className="flex items-center gap-6 mb-10">
          <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">Navegar por Categoria</h4>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="flex flex-wrap gap-4">
          {['Crafting', 'Alchemy', 'Leveling', 'Market', 'Statting', 'Refining'].map(tag => (
            <button key={tag} className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all">
              # {tag}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
