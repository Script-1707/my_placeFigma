import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Maximize2, Car, Sofa, Phone, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockImoveis, formatarPreco } from '../data/mock'
import VerificacaoBadge from '../components/VerificacaoBadge'
import { useAuth } from '../context/AuthContext'

export default function FichaImovel() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const imovel = mockImoveis.find(i => i.id === id)
  const [fotoIdx, setFotoIdx] = useState(0)

  if (!imovel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <p style={{ color: '#6B7280' }}>Imóvel não encontrado.</p>
        <Link to="/" style={{ color: '#AD7B3B' }}>← Voltar à pesquisa</Link>
      </div>
    )
  }

  function prev() { if (imovel) setFotoIdx(i => (i - 1 + imovel.fotos.length) % imovel.fotos.length) }
  function next() { if (imovel) setFotoIdx(i => (i + 1) % imovel.fotos.length) }

  function handleAgendar() {
    if (!user) { navigate('/login'); return }
    navigate(`/imoveis/${id}/agendar`)
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm mb-4 no-underline" style={{ color: '#6B7280' }}>
          <ChevronLeft size={15} /> Voltar aos resultados
        </Link>

        {/* Galeria */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9', backgroundColor: '#D9D3C8' }}>
          <img
            src={imovel.fotos[fotoIdx]}
            alt={`${imovel.titulo} foto ${fotoIdx + 1}`}
            className="w-full h-full object-cover"
          />
          {imovel.fotos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <ChevronLeft size={18} style={{ color: '#132A4C' }} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <ChevronRight size={18} style={{ color: '#132A4C' }} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {imovel.fotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFotoIdx(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ backgroundColor: i === fotoIdx ? '#FFF' : 'rgba(255,255,255,0.5)' }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Info principal */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ backgroundColor: '#132A4C', color: '#FFF' }}
                >
                  {imovel.tipo}
                </span>
                <VerificacaoBadge nivel={imovel.nivel} />
              </div>
              <h1
                className="text-xl md:text-2xl font-bold leading-snug"
                style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}
              >
                {imovel.titulo}
              </h1>
              <div className="flex items-center gap-1 mt-1 text-sm" style={{ color: '#6B7280' }}>
                <MapPin size={14} />
                <span>{imovel.zona}, Luanda</span>
              </div>
            </div>

            {/* Características */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Maximize2 size={15} />, label: `${imovel.area} m²` },
                { icon: null, label: imovel.tipologia },
                ...(imovel.garagem ? [{ icon: <Car size={15} />, label: 'Garagem' }] : []),
                ...(imovel.mobilado ? [{ icon: <Sofa size={15} />, label: 'Mobilado' }] : []),
              ].map((c, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: '#EDF1F6', color: '#132A4C', border: '1px solid #D9D3C8' }}
                >
                  {c.icon}
                  {c.label}
                </span>
              ))}
            </div>

            {/* Descrição */}
            <div>
              <h2 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
                Descrição
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{imovel.descricao}</p>
            </div>

            {/* Localização placeholder */}
            <div>
              <h2 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
                Localização
              </h2>
              <div
                className="rounded-xl overflow-hidden flex items-center justify-center text-sm"
                style={{ height: 180, backgroundColor: '#EDF1F6', border: '1px solid #D9D3C8', color: '#6B7280' }}
              >
                <MapPin size={20} className="mr-2 opacity-40" />
                {imovel.zona}, Luanda, Angola
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div
              className="rounded-xl p-5 sticky top-20"
              style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
            >
              <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#AD7B3B' }}>
                {formatarPreco(imovel.preco)}
                {imovel.tipo === 'Arrendamento' && <span className="text-sm font-normal text-gray-400">/mês</span>}
              </p>
              <p className="text-xs mt-0.5 mb-4" style={{ color: '#6B7280' }}>
                {imovel.tipo === 'Arrendamento' ? 'Arrendamento mensal' : 'Venda — valor total'}
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleAgendar}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  style={{ backgroundColor: '#132A4C', color: '#FFF' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F3D6B')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#132A4C')}
                >
                  <CalendarDays size={15} />
                  Agendar Visita
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C9963F')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#AD7B3B')}
                >
                  <Phone size={15} />
                  Contactar
                </button>
              </div>

              <div className="mt-4 pt-4 text-xs space-y-1" style={{ borderTop: '1px solid #F0EBE3', color: '#6B7280' }}>
                <p>Publicado em {new Date(imovel.criadoEm).toLocaleDateString('pt-PT')}</p>
                <p>Ref: MP-{imovel.id.padStart(4, '0')}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
