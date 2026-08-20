import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Truck, PackageCheck, Wrench, ArrowRight } from 'lucide-react'

const ITENS = [
  'Transporte porta-a-porta',
  'Embalagem e proteção de bens',
  'Montagem e desmontagem de mobiliário',
  'Equipa profissional e segura',
]

const CHECKLIST = [
  { icon: Truck, label: 'Transporte' },
  { icon: PackageCheck, label: 'Embalagem' },
  { icon: Wrench, label: 'Montagem' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function MudancasBand() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden" style={{ backgroundColor: '#F7F5F2' }}>
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-12 items-center">
        {/* Coluna esquerda: visual */}
        <div className="relative order-2 lg:order-1 hidden sm:block">
          <motion.div
            className="absolute rounded-full"
            style={{ width: 320, height: 320, top: '-20px', left: '-30px', backgroundColor: 'rgba(232,150,60,0.07)' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{ width: 110, height: 110, bottom: '-10px', right: '-20px', backgroundColor: 'rgba(30,42,71,0.06)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, rotate: -0.5 }}
            className="relative rounded-2xl bg-white p-6 md:p-7"
            style={{ boxShadow: '0 24px 48px -16px rgba(30,42,71,0.2)' }}
          >
            <p className="font-bold text-sm mb-5" style={{ fontFamily: 'var(--font-display)', color: '#1E2A47' }}>
              Orçamento de Mudança
            </p>

            {/* Percurso pontilhado com camião a meio */}
            <div className="relative flex items-center justify-between mb-6 px-1">
              <span className="flex items-center justify-center rounded-full" style={{ width: 12, height: 12, backgroundColor: '#1E2A47' }} />
              <div className="flex-1 mx-2 border-t-2 border-dashed" style={{ borderColor: '#D9D3C8' }} />
              <motion.span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: 34, height: 34, backgroundColor: '#E8963C' }}
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Truck size={17} color="#FFFFFF" />
              </motion.span>
              <div className="flex-1 mx-2 border-t-2 border-dashed" style={{ borderColor: '#D9D3C8' }} />
              <span className="flex items-center justify-center rounded-full" style={{ width: 12, height: 12, backgroundColor: '#E8963C' }} />
            </div>

            <div className="flex flex-col gap-3">
              {CHECKLIST.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={c.label}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5"
                    style={{ backgroundColor: '#F7F5F2' }}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  >
                    <span className="flex items-center gap-2 text-sm" style={{ color: '#1E2A47' }}>
                      <Icon size={15} />
                      {c.label}
                    </span>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Coluna direita: texto */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="order-1 lg:order-2"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(232,150,60,0.1)', color: '#E8963C' }}
          >
            Mudanças My Place
          </motion.span>

          <motion.h2
            variants={item}
            className="font-bold text-[26px] md:text-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#1E2A47' }}
          >
            Encontraste a casa. Nós tratamos da mudança.
          </motion.h2>

          <motion.p variants={item} className="text-base mt-4" style={{ color: '#6B7280' }}>
            Da embalagem ao transporte, coordenamos toda a logística da tua mudança para que
            só tenhas de te preocupar em instalar-te na tua nova casa.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 mt-7">
            {ITENS.map(texto => (
              <div key={texto} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center shrink-0 rounded-full"
                  style={{ width: 24, height: 24, backgroundColor: 'rgba(232,150,60,0.12)' }}
                >
                  <CheckCircle2 size={14} style={{ color: '#E8963C' }} />
                </span>
                <p className="text-sm md:text-base" style={{ color: '#1E2A47' }}>{texto}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <Link
              to="/mudancas"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-semibold no-underline transition-all duration-300 hover:gap-3 hover:shadow-lg"
              style={{ backgroundColor: '#E8963C', color: '#1E2A47' }}
            >
              Pedir orçamento de mudança
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
