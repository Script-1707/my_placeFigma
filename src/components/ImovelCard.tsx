import { Link } from 'react-router-dom'
import { MapPin, Maximize2, Car, Sofa } from 'lucide-react'
import type { Imovel } from '../data/mock'
import { formatarPreco } from '../data/mock'
import VerificacaoBadge from './VerificacaoBadge'

export default function ImovelCard({ imovel }: { imovel: Imovel }) {
  return (
    <Link
      to={`/imoveis/${imovel.id}`}
      className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
      style={{ border: '1px solid #E5E0D9' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', backgroundColor: '#D9D3C8' }}>
        <img
          src={imovel.fotos[0]}
          alt={imovel.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            {imovel.tipo}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <VerificacaoBadge nivel={imovel.nivel} />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p
          className="font-semibold text-sm leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}
        >
          {imovel.titulo}
        </p>

        <div className="flex items-center gap-1 text-xs" style={{ color: '#6B7280' }}>
          <MapPin size={12} />
          <span>{imovel.zona}</span>
          <span className="mx-1">·</span>
          <span>{imovel.tipologia}</span>
        </div>

        <div className="flex items-center gap-3 text-xs mt-auto pt-2" style={{ color: '#6B7280', borderTop: '1px solid #F0EBE3' }}>
          <span className="flex items-center gap-1"><Maximize2 size={11} /> {imovel.area} m²</span>
          {imovel.garagem && <span className="flex items-center gap-1"><Car size={11} /> Garagem</span>}
          {imovel.mobilado && <span className="flex items-center gap-1"><Sofa size={11} /> Mobilado</span>}
        </div>

        <p className="font-bold text-base mt-1" style={{ fontFamily: 'var(--font-display)', color: '#AD7B3B' }}>
          {formatarPreco(imovel.preco)}
          {imovel.tipo === 'Arrendamento' && <span className="text-xs font-normal text-gray-400">/mês</span>}
        </p>
      </div>
    </Link>
  )
}
