import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { mockImoveis, type Tipologia, type TipoNegocio } from '../data/mock'
import ImovelCard from '../components/ImovelCard'
import Hero from '../components/Hero'
import PedidoAssistidoBand from '../components/PedidoAssistidoBand'
import MudancasBand from '../components/MudancasBand'

const PER_PAGE = 12

export default function Pesquisa() {
  const [texto, setTexto] = useState('')
  const [zona, setZona] = useState('Todas')
  const [tipologia, setTipologia] = useState<Tipologia | ''>('')
  const [tipo, setTipo] = useState<TipoNegocio | ''>('')
  const [precoMin, setPrecoMin] = useState('')
  const [precoMax, setPrecoMax] = useState('')
  const [mobilado, setMobilado] = useState(false)
  const [garagem, setGaragem] = useState(false)
  const [filtrosOpen, setFiltrosOpen] = useState(false)
  const [pagina, setPagina] = useState(1)

  const resultados = useMemo(() => {
    return mockImoveis.filter(im => {
      if (im.estado !== 'Publicado') return false
      if (texto && !im.titulo.toLowerCase().includes(texto.toLowerCase()) && !im.zona.toLowerCase().includes(texto.toLowerCase())) return false
      if (zona !== 'Todas' && im.zona !== zona) return false
      if (tipologia && im.tipologia !== tipologia) return false
      if (tipo && im.tipo !== tipo) return false
      if (precoMin && im.preco < Number(precoMin)) return false
      if (precoMax && im.preco > Number(precoMax)) return false
      if (mobilado && !im.mobilado) return false
      if (garagem && !im.garagem) return false
      return true
    })
  }, [texto, zona, tipologia, tipo, precoMin, precoMax, mobilado, garagem])

  const totalPaginas = Math.max(1, Math.ceil(resultados.length / PER_PAGE))
  const paginados = resultados.slice((pagina - 1) * PER_PAGE, pagina * PER_PAGE)

  function limparFiltros() {
    setZona('Todas')
    setTipologia('')
    setTipo('')
    setPrecoMin('')
    setPrecoMax('')
    setMobilado(false)
    setGaragem(false)
    setPagina(1)
  }

  const temFiltros = Boolean(zona !== 'Todas' || tipologia || tipo || precoMin || precoMax || mobilado || garagem)

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: 'calc(100vh - 56px)' }}>
      <Hero
        texto={texto}
        setTexto={(v) => { setTexto(v); setPagina(1) }}
        zona={zona}
        setZona={(v) => { setZona(v); setPagina(1) }}
        tipologia={tipologia}
        setTipologia={(v) => { setTipologia(v); setPagina(1) }}
        tipo={tipo}
        setTipo={(v) => { setTipo(v); setPagina(1) }}
        precoMin={precoMin}
        setPrecoMin={(v) => { setPrecoMin(v); setPagina(1) }}
        precoMax={precoMax}
        setPrecoMax={(v) => { setPrecoMax(v); setPagina(1) }}
        mobilado={mobilado}
        setMobilado={(v) => { setMobilado(v); setPagina(1) }}
        garagem={garagem}
        setGaragem={(v) => { setGaragem(v); setPagina(1) }}
        filtrosOpen={filtrosOpen}
        setFiltrosOpen={setFiltrosOpen}
        temFiltros={temFiltros}
        limparFiltros={limparFiltros}
        totalImoveis={mockImoveis.length}
      />

      {/* Resultados */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}
            >
              Imóveis em destaque
            </h2>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              {resultados.length} imóve{resultados.length !== 1 ? 'is' : 'l'} encontrado{resultados.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {paginados.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#6B7280' }}>
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhum imóvel encontrado</p>
            <p className="text-sm mt-1">Tenta ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={pagina + texto + zona + tipologia + tipo}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {paginados.map(im => (
                <motion.div
                  key={im.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
                  }}
                >
                  <ImovelCard imovel={im} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ border: '1px solid #D9D3C8', color: '#132A4C', backgroundColor: 'transparent' }}
            >
              Anterior
            </button>
            <p className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Página {pagina} de {totalPaginas}
            </p>
            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      <PedidoAssistidoBand />
      <MudancasBand />
    </main>
  )
}
