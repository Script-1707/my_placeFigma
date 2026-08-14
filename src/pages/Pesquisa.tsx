import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { mockImoveis, type Tipologia, type TipoNegocio } from '../data/mock'
import ImovelCard from '../components/ImovelCard'

const ZONAS = ['Todas', 'Talatona', 'Miramar', 'Kilamba', 'Ingombota', 'Viana', 'Rangel', 'Maianga', 'Samba', 'Cacuaco']
const TIPOLOGIAS: Tipologia[] = ['T1', 'T2', 'T3', 'T4', 'T5+', 'Moradia', 'Comercial', 'Terreno']
const PER_PAGE = 6

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

  const temFiltros = zona !== 'Todas' || tipologia || tipo || precoMin || precoMax || mobilado || garagem

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      {/* Hero search */}
      <div style={{ backgroundColor: '#132A4C', padding: '2.5rem 1rem 2rem' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: '#FFF' }}
          >
            Encontra o teu imóvel em Angola
          </h1>
          <p className="text-sm mb-6" style={{ color: '#94A3B8' }}>
            Apartamentos, moradias, escritórios — com garantia de verificação
          </p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6B7280' }} />
              <input
                type="text"
                placeholder="Pesquisar por zona, título..."
                value={texto}
                onChange={e => { setTexto(e.target.value); setPagina(1) }}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9', color: '#1A1A1A' }}
              />
            </div>
            <button
              onClick={() => setFiltrosOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: filtrosOpen || temFiltros ? '#AD7B3B' : '#1F3D6B',
                color: '#FFF',
              }}
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filtros</span>
              {temFiltros && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />}
            </button>
          </div>

          {/* Filtros expandidos */}
          {filtrosOpen && (
            <div
              className="mt-3 rounded-xl p-4 text-left grid gap-3"
              style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Zona</label>
                  <select
                    value={zona}
                    onChange={e => { setZona(e.target.value); setPagina(1) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  >
                    {ZONAS.map(z => <option key={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tipologia</label>
                  <select
                    value={tipologia}
                    onChange={e => { setTipologia(e.target.value as Tipologia | ''); setPagina(1) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  >
                    <option value="">Todas</option>
                    {TIPOLOGIAS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tipo</label>
                  <select
                    value={tipo}
                    onChange={e => { setTipo(e.target.value as TipoNegocio | ''); setPagina(1) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  >
                    <option value="">Todos</option>
                    <option>Arrendamento</option>
                    <option>Venda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Preço mín. (Kz)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={precoMin}
                    onChange={e => { setPrecoMin(e.target.value); setPagina(1) }}
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
                    onChange={e => { setPrecoMax(e.target.value); setPagina(1) }}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#1A1A1A' }}>
                    <input type="checkbox" checked={mobilado} onChange={e => { setMobilado(e.target.checked); setPagina(1) }} className="accent-amber-700" />
                    Mobilado
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#1A1A1A' }}>
                    <input type="checkbox" checked={garagem} onChange={e => { setGaragem(e.target.checked); setPagina(1) }} className="accent-amber-700" />
                    Garagem
                  </label>
                </div>
              </div>
              {temFiltros && (
                <button onClick={limparFiltros} className="flex items-center gap-1 text-xs" style={{ color: '#AD7B3B' }}>
                  <X size={12} /> Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Resultados */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
          {resultados.length} imóve{resultados.length !== 1 ? 'is' : 'l'} encontrado{resultados.length !== 1 ? 's' : ''}
        </p>

        {paginados.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#6B7280' }}>
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhum imóvel encontrado</p>
            <p className="text-sm mt-1">Tenta ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginados.map(im => <ImovelCard key={im.id} imovel={im} />)}
          </div>
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
              style={{ border: '1px solid #D9D3C8', color: '#132A4C', backgroundColor: pagina === 1 ? 'transparent' : '#FFF' }}
            >
              ← Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className="w-9 h-9 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: p === pagina ? '#132A4C' : '#FFF',
                  color: p === pagina ? '#FFF' : '#132A4C',
                  border: '1px solid #D9D3C8',
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
              style={{ border: '1px solid #D9D3C8', color: '#132A4C', backgroundColor: pagina === totalPaginas ? 'transparent' : '#FFF' }}
            >
              Seguinte →
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
