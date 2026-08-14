import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { mockPedidosAssistidos, formatarPreco } from '../data/mock'

function EstadoBadge({ estado }: { estado: string }) {
  const config = {
    Pendente: { bg: '#FFF8ED', text: '#92400E', icon: <Clock size={12} /> },
    Aceite: { bg: '#F0FDF4', text: '#15803D', icon: <CheckCircle size={12} /> },
    Rejeitada: { bg: '#FEF2F2', text: '#DC2626', icon: <XCircle size={12} /> },
  }[estado] ?? { bg: '#EDF1F6', text: '#374151', icon: null }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
      {config.icon} {estado}
    </span>
  )
}

export default function DetalhesPedido() {
  const { id } = useParams()
  const pedido = mockPedidosAssistidos.find(p => p.id === id)

  if (!pedido) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3">
        <p style={{ color: '#6B7280' }}>Pedido não encontrado.</p>
        <Link to="/pedido-assistido" style={{ color: '#AD7B3B' }}>← Voltar</Link>
      </div>
    )
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/pedido-assistido" className="inline-flex items-center gap-1 text-sm mb-5 no-underline" style={{ color: '#6B7280' }}>
          <ChevronLeft size={15} /> Todos os pedidos
        </Link>

        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}>
          <h1 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            {pedido.tipologia} em {pedido.zona}
          </h1>
          <p className="text-sm mb-3" style={{ color: '#6B7280' }}>
            Orçamento máximo: <strong style={{ color: '#132A4C' }}>{formatarPreco(pedido.orcamentoMax)}/mês</strong>
          </p>
          {pedido.condicoes && (
            <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: '#F9F7F4', color: '#374151' }}>
              "{pedido.condicoes}"
            </p>
          )}
          <p className="text-xs mt-3" style={{ color: '#9CA3AF' }}>
            Pedido criado em {new Date(pedido.criadoEm).toLocaleDateString('pt-PT')}
          </p>
        </div>

        <h2 className="text-base font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
          Propostas recebidas ({pedido.propostas.length})
        </h2>

        {pedido.propostas.length === 0 ? (
          <div className="text-center py-10 rounded-xl" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9', color: '#6B7280' }}>
            <p className="text-sm">Ainda não há propostas para este pedido.</p>
            <p className="text-sm mt-1">Os captadores serão notificados automaticamente.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pedido.propostas.map(pr => (
              <div key={pr.id} className="rounded-xl p-4" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDF1F6' }}>
                      <User size={14} style={{ color: '#132A4C' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#132A4C' }}>{pr.captadorNome}</p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>{new Date(pr.criadoEm).toLocaleDateString('pt-PT')}</p>
                    </div>
                  </div>
                  <EstadoBadge estado={pr.estado} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{pr.descricao}</p>
                {pr.estado === 'Pendente' && (
                  <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #F0EBE3' }}>
                    <button
                      className="flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                      style={{ backgroundColor: '#132A4C', color: '#FFF' }}
                    >
                      Aceitar
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-lg text-sm transition-colors"
                      style={{ border: '1px solid #D9D3C8', color: '#6B7280' }}
                    >
                      Rejeitar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
