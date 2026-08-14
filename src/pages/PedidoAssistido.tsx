import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, XCircle, ChevronRight, Plus } from 'lucide-react'
import { mockPedidosAssistidos, formatarPreco, type Tipologia } from '../data/mock'
import { useAuth } from '../context/AuthContext'

const TIPOLOGIAS: Tipologia[] = ['T1', 'T2', 'T3', 'T4', 'T5+', 'Moradia', 'Comercial', 'Terreno']
const ZONAS = ['Talatona', 'Miramar', 'Kilamba', 'Ingombota', 'Viana', 'Rangel', 'Maianga', 'Samba', 'Cacuaco']

function estadoIcon(estado: string) {
  if (estado === 'Aceite') return <CheckCircle size={14} style={{ color: '#16A34A' }} />
  if (estado === 'Rejeitada') return <XCircle size={14} style={{ color: '#DC2626' }} />
  return <Clock size={14} style={{ color: '#D97706' }} />
}

export default function PedidoAssistido() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ zona: '', tipologia: '', orcamentoMax: '', condicoes: '' })

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3 px-4">
        <p style={{ color: '#132A4C' }}>É necessário iniciar sessão.</p>
        <Link to="/login" className="text-sm font-semibold" style={{ color: '#AD7B3B' }}>Entrar</Link>
      </div>
    )
  }

  function set(f: string, v: string) { setForm(p => ({ ...p, [f]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    setEnviado(true)
    setMostrarForm(false)
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Pedido Assistido
          </h1>
          <button
            onClick={() => { setMostrarForm(true); setEnviado(false) }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            <Plus size={15} /> Novo pedido
          </button>
        </div>

        {enviado && (
          <div className="rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-sm" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#15803D' }}>
            <CheckCircle size={15} /> Pedido enviado com sucesso! Os captadores na tua zona irão responder em breve.
          </div>
        )}

        {/* Formulário */}
        {mostrarForm && (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-5 mb-6 space-y-4"
            style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
          >
            <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
              O que procuras?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Zona pretendida</label>
                <select
                  required
                  value={form.zona}
                  onChange={e => set('zona', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid #D9D3C8', color: form.zona ? '#1A1A1A' : '#9CA3AF' }}
                >
                  <option value="">Seleccionar zona</option>
                  {ZONAS.map(z => <option key={z}>{z}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tipologia</label>
                <select
                  required
                  value={form.tipologia}
                  onChange={e => set('tipologia', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid #D9D3C8', color: form.tipologia ? '#1A1A1A' : '#9CA3AF' }}
                >
                  <option value="">Seleccionar</option>
                  {TIPOLOGIAS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Orçamento máximo (Kz/mês)</label>
                <input
                  required
                  type="number"
                  value={form.orcamentoMax}
                  onChange={e => set('orcamentoMax', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                  placeholder="400000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Condições especiais</label>
                <input
                  value={form.condicoes}
                  onChange={e => set('condicoes', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                  placeholder="Preciso de garagem, mobilado..."
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setMostrarForm(false)}
                className="px-4 py-2 rounded-lg text-sm border"
                style={{ border: '1px solid #D9D3C8', color: '#6B7280' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
                style={{ backgroundColor: '#132A4C', color: '#FFF' }}
              >
                {loading ? 'A enviar...' : 'Enviar pedido'}
              </button>
            </div>
          </form>
        )}

        {/* Lista de pedidos */}
        <div className="space-y-3">
          {mockPedidosAssistidos.map(pa => (
            <Link
              key={pa.id}
              to={`/pedido-assistido/${pa.id}`}
              className="block rounded-xl p-4 no-underline transition-shadow hover:shadow-md"
              style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold" style={{ color: '#132A4C' }}>
                      {pa.tipologia} em {pa.zona}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: pa.estado === 'Fechado' ? '#F0FDF4' : pa.estado === 'Em análise' ? '#FFF8ED' : '#EDF1F6',
                        color: pa.estado === 'Fechado' ? '#15803D' : pa.estado === 'Em análise' ? '#92400E' : '#1F3D6B',
                      }}
                    >
                      {pa.estado}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    Orçamento: {formatarPreco(pa.orcamentoMax)}/mês · {pa.propostas.length} proposta{pa.propostas.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ChevronRight size={16} style={{ color: '#D9D3C8', flexShrink: 0 }} />
              </div>

              {pa.propostas.length > 0 && (
                <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: '1px solid #F0EBE3' }}>
                  {pa.propostas.slice(0, 2).map(pr => (
                    <div key={pr.id} className="flex items-center gap-2 text-xs" style={{ color: '#374151' }}>
                      {estadoIcon(pr.estado)}
                      <span className="truncate">{pr.captadorNome}: {pr.descricao}</span>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}

          {mockPedidosAssistidos.length === 0 && (
            <div className="text-center py-12" style={{ color: '#6B7280' }}>
              <p className="text-sm">Ainda não tens pedidos assistidos.</p>
              <p className="text-sm mt-1">Cria um pedido e os captadores irão encontrar o teu imóvel ideal.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
