import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Star, Building2, Home, DoorOpen, Warehouse, Store, Trees } from 'lucide-react'
import type { Tipologia, TipoNegocio } from '../data/mock'

const AVATARS = [
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=32',
  'https://i.pravatar.cc/80?img=47',
  'https://i.pravatar.cc/80?img=68',
]

const SLIDES = ['/index/1.jpeg', '/index/2.jpeg', '/index/3.jpeg']
const SLIDE_DURATION = 6000

const ZONAS = ['Todas', 'Talatona', 'Miramar', 'Kilamba', 'Ingombota', 'Viana', 'Rangel', 'Maianga', 'Samba', 'Cacuaco']
const TIPOLOGIAS: Tipologia[] = ['T1', 'T2', 'T3', 'T4', 'T5+', 'Moradia', 'Comercial', 'Terreno']

const STATUS_PILLS: { label: string; value: TipoNegocio | '' }[] = [
  { label: 'Todos', value: '' },
  { label: 'Arrendar', value: 'Arrendamento' },
  { label: 'Comprar', value: 'Venda' },
]

const CATEGORIAS: { label: string; tipologia: Tipologia; icon: typeof Building2 }[] = [
  { label: 'Apartamentos', tipologia: 'T2', icon: Building2 },
  { label: 'Estúdios', tipologia: 'T1', icon: DoorOpen },
  { label: 'Casas de Família', tipologia: 'T4', icon: Home },
  { label: 'Moradias', tipologia: 'Moradia', icon: Warehouse },
  { label: 'Comercial', tipologia: 'Comercial', icon: Store },
  { label: 'Terrenos', tipologia: 'Terreno', icon: Trees },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

interface HeroProps {
  texto: string
  setTexto: (v: string) => void
  zona: string
  setZona: (v: string) => void
  tipologia: Tipologia | ''
  setTipologia: (v: Tipologia | '') => void
  tipo: TipoNegocio | ''
  setTipo: (v: TipoNegocio | '') => void
  precoMin: string
  setPrecoMin: (v: string) => void
  precoMax: string
  setPrecoMax: (v: string) => void
  mobilado: boolean
  setMobilado: (v: boolean) => void
  garagem: boolean
  setGaragem: (v: boolean) => void
  filtrosOpen: boolean
  setFiltrosOpen: (v: boolean) => void
  temFiltros: boolean
  limparFiltros: () => void
  totalImoveis: number
}

export default function Hero(props: HeroProps) {
  const {
    texto, setTexto, zona, setZona, tipologia, setTipologia, tipo, setTipo,
    precoMin, setPrecoMin, precoMax, setPrecoMax, mobilado, setMobilado,
    garagem, setGaragem, filtrosOpen, setFiltrosOpen, temFiltros, limparFiltros,
  } = props

  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), SLIDE_DURATION)
    return () => clearInterval(id)
  }, [])

  return (
    <>
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0B1B32' }}>
      {/* Background carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              src={SLIDES[slide]}
              alt=""
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.2, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,27,50,0.05) 0%, rgba(11,27,50,0.25) 55%, #0B1B32 100%), linear-gradient(90deg, rgba(11,27,50,0.4) 0%, rgba(11,27,50,0.02) 55%)',
          }}
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute top-6 right-6 z-10 hidden md:flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Imagem ${i + 1}`}
            className="relative h-1.5 rounded-full overflow-hidden transition-all"
            style={{ width: i === slide ? 28 : 14, backgroundColor: 'rgba(255,255,255,0.3)' }}
          >
            {i === slide && (
              <motion.span
                key={slide}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: '#D9A45E', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Ambient glow accents */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(173,123,59,0.25) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,61,107,0.35) 0%, transparent 70%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto px-4 pt-16 pb-14 md:pt-24 md:pb-20"
      >
        <motion.h1
          variants={item}
          className="text-center font-bold leading-[1.15] tracking-tight text-4xl sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF' }}
        >
          Encontra a tua<br />
          <span style={{ color: '#D9A45E' }}>casa em Angola</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-center max-w-xl mx-auto mt-8 text-base md:text-lg"
          style={{ color: '#FFFFFF' }}
        >
          Apartamentos, moradias e escritórios com garantia de verificação — sem
          intermediários abusivos, sem surpresas.
        </motion.p>

        {/* Status pills */}
        <motion.div variants={item} className="flex justify-center gap-2 mt-10">
          {STATUS_PILLS.map(p => (
            <button
              key={p.label}
              onClick={() => setTipo(p.value)}
              className="text-base font-semibold px-5 py-2 rounded-full transition-colors"
              style={{
                backgroundColor: tipo === p.value ? '#D9A45E' : 'rgba(255,255,255,0.1)',
                color: tipo === p.value ? '#132A4C' : '#E2E8F0',
                border: tipo === p.value ? 'none' : '1px solid rgba(255,255,255,0.25)',
              }}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Search card */}
        <motion.div variants={item} className="mt-6 max-w-4xl mx-auto">
          <div
            className="rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(6px)' }}
          >
          <div
            className="flex flex-col lg:flex-row lg:items-stretch gap-2 lg:gap-0 p-2"
          >
            <div className="flex-1 relative lg:pr-3">
              <label className="hidden lg:block text-[11px] font-semibold uppercase tracking-wide px-4 pt-1.5" style={{ color: '#9CA3AF' }}>
                Pesquisa
              </label>
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 lg:hidden" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Zona, título..."
                value={texto}
                onChange={e => setTexto(e.target.value)}
                className="w-full pl-11 lg:pl-4 pr-4 py-3 lg:pb-2.5 lg:pt-0 rounded-xl text-sm outline-none bg-transparent"
                style={{ color: '#1A1A1A' }}
              />
            </div>

            <div className="hidden lg:block w-px my-2" style={{ backgroundColor: '#E5E0D9' }} />

            <div className="flex-1 lg:px-3 relative">
              <label className="hidden lg:block text-[11px] font-semibold uppercase tracking-wide px-4 pt-1.5" style={{ color: '#9CA3AF' }}>
                Tipologia
              </label>
              <select
                value={tipologia}
                onChange={e => setTipologia(e.target.value as Tipologia | '')}
                className="w-full px-4 py-3 lg:pb-2.5 lg:pt-0 rounded-xl text-sm outline-none bg-transparent appearance-none"
                style={{ color: tipologia ? '#1A1A1A' : '#9CA3AF' }}
              >
                <option value="">Todas as tipologias</option>
                {TIPOLOGIAS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="hidden lg:block w-px my-2" style={{ backgroundColor: '#E5E0D9' }} />

            <div className="flex-1 lg:px-3 relative">
              <label className="hidden lg:block text-[11px] font-semibold uppercase tracking-wide px-4 pt-1.5" style={{ color: '#9CA3AF' }}>
                Zona
              </label>
              <select
                value={zona}
                onChange={e => setZona(e.target.value)}
                className="w-full px-4 py-3 lg:pb-2.5 lg:pt-0 rounded-xl text-sm outline-none bg-transparent appearance-none"
                style={{ color: '#1A1A1A' }}
              >
                {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>

            <div className="flex gap-2 lg:pl-2">
              <button
                onClick={() => setFiltrosOpen(!filtrosOpen)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: filtrosOpen || temFiltros ? '#132A4C' : '#F3EFE7',
                  color: filtrosOpen || temFiltros ? '#FFF' : '#132A4C',
                }}
                aria-label="Mais filtros"
              >
                <SlidersHorizontal size={15} />
                {temFiltros && <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#D9A45E' }} />}
              </button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-lg"
                style={{ backgroundColor: '#D9A45E', color: '#132A4C' }}
              >
                <Search size={15} />
                <span className="lg:hidden">Pesquisar</span>
              </motion.button>
            </div>
          </div>
          </div>

          {filtrosOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 rounded-2xl p-4 text-left grid gap-3 shadow-xl"
              style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Preço mín. (Kz)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={precoMin}
                    onChange={e => setPrecoMin(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Preço máx. (Kz)</label>
                  <input
                    type="number"
                    placeholder="Ilimitado"
                    value={precoMax}
                    onChange={e => setPrecoMax(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#1A1A1A' }}>
                    <input type="checkbox" checked={mobilado} onChange={e => setMobilado(e.target.checked)} className="accent-amber-700" />
                    Mobilado
                  </label>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#1A1A1A' }}>
                    <input type="checkbox" checked={garagem} onChange={e => setGaragem(e.target.checked)} className="accent-amber-700" />
                    Garagem
                  </label>
                </div>
              </div>
              {temFiltros && (
                <button onClick={limparFiltros} className="flex items-center gap-1 text-xs" style={{ color: '#AD7B3B' }}>
                  <X size={12} /> Limpar filtros
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>

    {/* Floating trust card — straddles the hero/next-section boundary in the bottom-right corner */}
    <div className="relative w-full">
      <div className="hidden lg:block absolute right-0 z-20" style={{ top: '-48px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-4 px-7 py-5 rounded-2xl shadow-2xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.97)' }}
        >
          <div className="flex -space-x-2.5">
            {AVATARS.map(src => (
              <img key={src} src={src} alt="" className="w-8 h-8 rounded-full border-2" style={{ borderColor: '#FFF' }} />
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#132A4C' }}>Captadores verificados</p>
            <div className="flex items-center gap-1 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} fill="#D9A45E" color="#D9A45E" />
              ))}
              <span className="text-xs ml-1" style={{ color: '#6B7280' }}>4.8/5</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </div>

    {/* Category strip — straddles the boundary between the hero image and the next section */}
    <div className="relative z-10 max-w-5xl mx-auto px-4 -mt-14 md:-mt-16 mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid rounded-2xl overflow-hidden grid-cols-3 md:grid-cols-6"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 45px -12px rgba(11,27,50,0.28)',
            gap: 0,
          }}
        >
          {CATEGORIAS.map((c, i) => {
            const Icon = c.icon
            const ativo = tipologia === c.tipologia
            const ultimaColuna = i === CATEGORIAS.length - 1
            return (
              <motion.button
                key={c.label}
                onClick={() => setTipologia(ativo ? '' : c.tipologia)}
                whileHover={{ backgroundColor: '#F3EFE7' }}
                className="appearance-none flex flex-col items-center justify-center gap-3 text-center"
                style={{
                  backgroundColor: ativo ? '#F3EFE7' : 'transparent',
                  padding: '24px 8px',
                  margin: 0,
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  borderRight: ultimaColuna ? 'none' : '1px solid #E5E5E5',
                }}
              >
                <Icon size={30} style={{ color: ativo ? '#AD7B3B' : '#132A4C' }} strokeWidth={1.5} />
                <span className="text-xs font-semibold" style={{ color: ativo ? '#AD7B3B' : '#132A4C' }}>
                  {c.label}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
    </div>
    </>
  )
}
