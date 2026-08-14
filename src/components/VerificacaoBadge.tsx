import { useState } from 'react'
import { Shield } from 'lucide-react'
import type { NivelVerificacao } from '../data/mock'
import { nivelConfig } from '../data/mock'

const descricoes: Record<NivelVerificacao, string> = {
  Bronze: 'Anúncio básico. Dados fornecidos pelo proprietário, ainda não verificados pela My Place.',
  Prata: 'Documentos do imóvel verificados. Propriedade confirmada.',
  Ouro: 'Visita física realizada por captador certificado. Fotos e condições confirmadas.',
  Diamante: 'Verificação completa: documentos, visita, histórico de negócios e avaliação jurídica.',
}

export default function VerificacaoBadge({ nivel }: { nivel: NivelVerificacao }) {
  const [tooltip, setTooltip] = useState(false)
  const cfg = nivelConfig(nivel)

  return (
    <div className="relative inline-flex items-center gap-1">
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold cursor-pointer select-none"
        style={{ backgroundColor: cfg.bg, color: cfg.text }}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        onTouchStart={() => setTooltip(v => !v)}
        aria-label={`Nível de verificação: ${nivel}`}
      >
        <Shield size={11} strokeWidth={2.5} />
        {nivel}
      </span>
      {tooltip && (
        <div
          className="absolute left-0 top-full mt-1.5 z-50 w-56 rounded-lg shadow-xl text-xs leading-relaxed p-3"
          style={{ backgroundColor: '#132A4C', color: '#EDF1F6', border: '1px solid #1F3D6B' }}
        >
          <p className="font-semibold mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
            Nível {nivel}
          </p>
          {descricoes[nivel]}
          <div className="absolute -top-1.5 left-3 w-3 h-3 rotate-45" style={{ backgroundColor: '#132A4C' }} />
        </div>
      )}
    </div>
  )
}
