import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, BedDouble, Bath, Car, Clock } from 'lucide-react'
import type { Imovel } from '../data/mock'
import { formatarPreco, quartosDeTipologia, wcDeTipologia } from '../data/mock'

const CAROUSEL_DURATION = 3500

function tempoDesdePublicacao(criadoEm: string): string {
  const dias = Math.max(0, Math.floor((Date.now() - new Date(criadoEm).getTime()) / (1000 * 60 * 60 * 24)))
  if (dias === 0) return 'hoje'
  if (dias === 1) return 'há 1 dia'
  if (dias < 30) return `há ${dias} dias`
  const meses = Math.floor(dias / 30)
  return meses === 1 ? 'há 1 mês' : `há ${meses} meses`
}

export default function ImovelCard({ imovel }: { imovel: Imovel }) {
  const fotos = imovel.fotos.slice(0, 3)
  const [foto, setFoto] = useState(0)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (fotos.length <= 1 || pausado) return
    const id = setInterval(() => setFoto(f => (f + 1) % fotos.length), CAROUSEL_DURATION)
    return () => clearInterval(id)
  }, [fotos.length, pausado])

  const quartos = quartosDeTipologia(imovel.tipologia)
  const wc = wcDeTipologia(imovel.tipologia)
  const negocioCor = imovel.tipo === 'Venda'
    ? { bg: '#C0392B', text: '#FFF' }
    : { bg: '#D9A45E', text: '#132A4C' }

  return (
    <Link
      to={`/imoveis/${imovel.id}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 1px 3px rgba(19,42,76,0.08)' }}
      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(19,42,76,0.28)')}
      onMouseOut={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(19,42,76,0.08)')}
    >
      {/* Imagem / carrossel */}
      <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '4/3', backgroundColor: '#D9D3C8' }}>
        {fotos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={imovel.titulo}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === foto ? 1 : 0 }}
          />
        ))}

        {/* Topo esquerdo: destaque */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: '#FFF', color: '#132A4C' }}
          >
            Destaque
          </span>
        </div>

        {/* Topo direito: tipo de negócio + favoritar */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: negocioCor.bg, color: negocioCor.text }}
          >
            {imovel.tipo}
          </span>
          <button
            onClick={e => e.preventDefault()}
            aria-label="Favoritar"
            className="flex items-center justify-center w-7 h-7 rounded-full shadow-sm"
            style={{ backgroundColor: '#FFF' }}
          >
            <Heart size={13} style={{ color: '#132A4C' }} />
          </button>
        </div>

        {/* Indicadores do carrossel */}
        {fotos.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {fotos.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === foto ? 14 : 6,
                  height: 6,
                  backgroundColor: i === foto ? '#FFF' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Corpo */}
      <div className="p-6 flex flex-col gap-3.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className="font-bold text-lg leading-snug line-clamp-2 uppercase transition-colors duration-200 group-hover:text-[#AD7B3B]"
            style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}
          >
            {imovel.titulo}
          </p>
          <span
            className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: '#F3EFE7', color: '#6B7280' }}
          >
            {imovel.tipologia === 'Comercial' ? 'comercial' : imovel.tipologia === 'Terreno' ? 'terreno' : imovel.tipologia === 'Moradia' ? 'vivenda' : 'apartamento'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm" style={{ color: '#9CA3AF' }}>
          <MapPin size={15} />
          <span>{imovel.zona}, Luanda</span>
        </div>

        <div className="flex items-center gap-5 text-sm" style={{ color: '#6B7280' }}>
          {quartos > 0 && (
            <span className="flex items-center gap-1.5"><BedDouble size={17} /> {quartos}</span>
          )}
          {wc > 0 && (
            <span className="flex items-center gap-1.5"><Bath size={17} /> {wc}</span>
          )}
          {imovel.garagem && (
            <span className="flex items-center gap-1.5"><Car size={17} /> 1</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-3.5 mt-1" style={{ borderTop: '1px solid #F0EBE3' }}>
          <p className="font-bold text-2xl" style={{ fontFamily: 'var(--font-display)', color: '#C0392B' }}>
            {formatarPreco(imovel.preco)}
            {imovel.tipo === 'Arrendamento' && <span className="text-sm font-normal">/mês</span>}
          </p>
          <span className="flex items-center gap-1 text-xs shrink-0" style={{ color: '#9CA3AF' }}>
            <Clock size={12} /> {tempoDesdePublicacao(imovel.criadoEm)}
          </span>
        </div>
      </div>
    </Link>
  )
}
