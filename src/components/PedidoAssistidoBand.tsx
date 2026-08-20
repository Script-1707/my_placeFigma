import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Wallet, LayoutGrid, CheckCircle2, Home, ArrowRight } from 'lucide-react'

const PASSOS = [
  'Preenches o pedido (2 minutos)',
  'Recebemos e filtramos propostas verificadas',
  'Escolhes o imóvel e tratamos da visita',
]

const CAMPOS = [
  { icon: MapPin, label: 'Localização', valor: 'Talatona, Luanda' },
  { icon: Wallet, label: 'Orçamento', valor: 'até 400.000 Kz/mês' },
  { icon: LayoutGrid, label: 'Tipologia', valor: 'T2 · Mobilado · Garagem' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function PedidoAssistidoBand() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">
        {/* Coluna esquerda: texto */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={item}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(232,150,60,0.1)', color: '#E8963C' }}
          >
            Pedido Assistido
          </motion.span>

          <motion.h2
            variants={item}
            className="font-bold text-[26px] md:text-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#1E2A47' }}
          >
            Não percas tempo a procurar. Nós procuramos por ti.
          </motion.h2>

          <motion.p variants={item} className="text-base mt-4" style={{ color: '#6B7280' }}>
            Diz-nos exatamente o que precisas — localização, orçamento, tipologia — e a nossa
            equipa especializada pesquisa, filtra e negoceia os melhores imóveis verificados do mercado.
          </motion.p>

          <motion.div variants={item} className="relative flex flex-col gap-6 mt-8">
            {/* Linha vertical conectando os passos */}
            <motion.span
              className="absolute left-4 top-4 w-px"
              style={{ backgroundColor: '#F0DCC0' }}
              initial={{ height: 0 }}
              whileInView={{ height: 'calc(100% - 32px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
            />
            {PASSOS.map((passo, i) => (
              <div key={passo} className="relative flex items-center gap-4">
                <motion.span
                  className="relative z-10 flex items-center justify-center shrink-0 rounded-full font-bold text-sm"
                  style={{ width: 32, height: 32, backgroundColor: '#E8963C', color: '#FFFFFF' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: 'backOut' }}
                >
                  {i + 1}
                </motion.span>
                <p className="text-sm md:text-base" style={{ color: '#1E2A47' }}>{passo}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <Link
              to="/pedido-assistido"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-semibold no-underline transition-all duration-300 hover:gap-3 hover:shadow-lg"
              style={{ backgroundColor: '#E8963C', color: '#1E2A47' }}
            >
              Fazer o meu pedido
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Coluna direita: mockup visual */}
        <div className="relative hidden sm:block">
          <motion.div
            className="absolute rounded-full"
            style={{ width: 340, height: 340, top: '-30px', right: '-20px', backgroundColor: 'rgba(30,42,71,0.06)' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{ width: 120, height: 120, bottom: '-10px', left: '-30px', backgroundColor: 'rgba(232,150,60,0.08)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute opacity-10"
            style={{ color: '#1E2A47', top: 10, left: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Home size={40} />
          </motion.div>
          <motion.div
            className="absolute opacity-10"
            style={{ color: '#1E2A47', bottom: 30, right: 10 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Home size={28} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, rotate: 0.5 }}
            className="relative rounded-2xl bg-white p-6 md:p-7"
            style={{ boxShadow: '0 24px 48px -16px rgba(30,42,71,0.25)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: '#1E2A47' }}>
                Novo Pedido Assistido
              </p>
              <motion.span
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16A34A' }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.4, ease: 'backOut' }}
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  <CheckCircle2 size={13} />
                </motion.span>
                Pedido enviado
              </motion.span>
            </div>

            <div className="flex flex-col gap-3">
              {CAMPOS.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                  >
                    <label className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#9CA3AF' }}>
                      <Icon size={12} /> {c.label}
                    </label>
                    <div className="rounded-lg px-3 py-2.5 text-sm" style={{ backgroundColor: '#F3EFE7', color: '#1E2A47' }}>
                      {c.valor}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
