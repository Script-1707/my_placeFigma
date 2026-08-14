import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, TrendingUp, CheckCircle, Send } from 'lucide-react'
import { mockPedidosAssistidos, mockUtilizadores, formatarPreco } from '../data/mock'
import { useAuth } from '../context/AuthContext'

export default function PainelCaptador() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const captador = mockUtilizadores.find(u => u.perfil === 'Captador' && u.estadoCandidatura === 'Aprovado')
  const pedidosAbertos = mockPedidosAssistidos.filter(p => p.estado === 'Aberto')

  const [propostaForm, setPropostaForm] = useState<{ pedidoId: string; descricao: string } | null>(null)
  const [enviado, setEnviado] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  if (!user || user.perfil !== 'Captador') {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3 px-4">
        <p style={{ color: '#132A4C' }}>Acesso restrito a Captadores.</p>
        <button onClick={() => navigate('/login')} className="text-sm" style={{ color: '#AD7B3B' }}>Entrar</button>
      </div>
    )
  }

  async function handleEnviarProposta() {
    if (!propostaForm?.descricao.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setEnviado(e => [...e, propostaForm.pedidoId])
    setPropostaForm(null)
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Perfil de reputação */}
        {captador && (
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#132A4C', color: '#FFF' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>{captador.nome}</h2>
                <p className="text-sm" style={{ color: '#94A3B8' }}>Captador Certificado</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}>
                Aprovado
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#1F3D6B' }}>
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <TrendingUp size={14} style={{ color: '#AD7B3B' }} />
                  <span className="text-xl font-bold">{captador.taxaSucesso}%</span>
                </div>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Taxa de sucesso</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#1F3D6B' }}>
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star size={14} style={{ color: '#AD7B3B' }} />
                  <span className="text-xl font-bold">{captador.avaliacaoMedia}</span>
                </div>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Avaliação média</p>
              </div>
            </div>
          </div>
        )}

        {/* Pedidos em aberto */}
        <div>
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Pedidos em aberto ({pedidosAbertos.length})
          </h2>
          {pedidosAbertos.length === 0 ? (
            <div className="text-center py-10 rounded-xl" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9', color: '#6B7280' }}>
              <p className="text-sm">Não há pedidos em aberto de momento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pedidosAbertos.map(pa => {
                const jaEnviou = enviado.includes(pa.id)
                const aEnviar = propostaForm?.pedidoId === pa.id
                return (
                  <div key={pa.id} className="rounded-xl p-4" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-sm font-semibold" style={{ color: '#132A4C' }}>
                        {pa.tipologia} em {pa.zona}
                      </p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF8ED', color: '#92400E' }}>
                        Aberto
                      </span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                      Orçamento máx: {formatarPreco(pa.orcamentoMax)}/mês
                    </p>
                    {pa.condicoes && (
                      <p className="text-xs italic" style={{ color: '#9CA3AF' }}>"{pa.condicoes}"</p>
                    )}

                    {jaEnviou ? (
                      <div className="mt-3 flex items-center gap-1.5 text-sm" style={{ color: '#16A34A' }}>
                        <CheckCircle size={14} /> Proposta enviada
                      </div>
                    ) : aEnviar ? (
                      <div className="mt-3 space-y-2">
                        <textarea
                          rows={3}
                          placeholder="Descreve o imóvel que tens disponível ou a proposta que queres fazer..."
                          value={propostaForm.descricao}
                          onChange={e => setPropostaForm(f => f ? { ...f, descricao: e.target.value } : f)}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                          style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPropostaForm(null)}
                            className="px-3 py-1.5 rounded-lg text-sm"
                            style={{ border: '1px solid #D9D3C8', color: '#6B7280' }}
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleEnviarProposta}
                            disabled={loading || !propostaForm.descricao.trim()}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold disabled:opacity-50"
                            style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
                          >
                            <Send size={13} /> {loading ? 'A enviar...' : 'Enviar proposta'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPropostaForm({ pedidoId: pa.id, descricao: '' })}
                        className="mt-3 text-sm font-semibold transition-colors"
                        style={{ color: '#132A4C' }}
                      >
                        Submeter proposta →
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link to="/captador/candidatura" className="text-sm no-underline" style={{ color: '#AD7B3B' }}>
            Ver estado da candidatura
          </Link>
        </div>
      </div>
    </main>
  )
}
