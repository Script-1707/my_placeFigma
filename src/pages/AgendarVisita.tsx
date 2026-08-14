import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CalendarDays, Clock, CheckCircle } from 'lucide-react'
import { mockImoveis } from '../data/mock'
import { useAuth } from '../context/AuthContext'

const HORAS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

function proximosDias(n: number): string[] {
  const dias: string[] = []
  const hoje = new Date()
  for (let i = 1; i <= n; i++) {
    const d = new Date(hoje)
    d.setDate(hoje.getDate() + i)
    if (d.getDay() !== 0) dias.push(d.toISOString().split('T')[0])
    if (dias.length === n) break
  }
  return dias
}

export default function AgendarVisita() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const imovel = mockImoveis.find(i => i.id === id)
  const dias = proximosDias(7)

  const [dia, setDia] = useState('')
  const [hora, setHora] = useState('')
  const [confirmado, setConfirmado] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3 px-4">
        <p style={{ color: '#132A4C' }}>É necessário iniciar sessão para agendar uma visita.</p>
        <Link to="/login" className="text-sm font-semibold" style={{ color: '#AD7B3B' }}>Entrar</Link>
      </div>
    )
  }

  if (!imovel) {
    return <div className="flex items-center justify-center min-h-96"><p style={{ color: '#6B7280' }}>Imóvel não encontrado.</p></div>
  }

  async function handleConfirmar() {
    if (!dia || !hora) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    setConfirmado(true)
  }

  if (confirmado) {
    return (
      <main className="flex items-center justify-center px-4 py-16" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EDF1F6' }}>
            <CheckCircle size={32} style={{ color: '#AD7B3B' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Visita agendada!
          </h2>
          <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
            <strong>{imovel.titulo}</strong>
          </p>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
            {new Date(dia).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })} às {hora}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            Voltar ao início
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
          Agendar Visita
        </h1>
        <p className="text-sm mb-6" style={{ color: '#6B7280' }}>{imovel.titulo}</p>

        <div className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={16} style={{ color: '#AD7B3B' }} />
              <span className="text-sm font-semibold" style={{ color: '#374151' }}>Selecciona um dia</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {dias.map(d => {
                const data = new Date(d + 'T12:00:00')
                return (
                  <button
                    key={d}
                    onClick={() => setDia(d)}
                    className="py-2 rounded-xl text-center transition-all"
                    style={{
                      border: dia === d ? '2px solid #132A4C' : '1px solid #D9D3C8',
                      backgroundColor: dia === d ? '#EDF1F6' : '#FFF',
                    }}
                  >
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {data.toLocaleDateString('pt-PT', { weekday: 'short' })}
                    </p>
                    <p className="text-sm font-bold" style={{ color: '#132A4C' }}>
                      {data.getDate()}
                    </p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {data.toLocaleDateString('pt-PT', { month: 'short' })}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} style={{ color: '#AD7B3B' }} />
              <span className="text-sm font-semibold" style={{ color: '#374151' }}>Selecciona um horário</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HORAS.map(h => (
                <button
                  key={h}
                  onClick={() => setHora(h)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    border: hora === h ? '2px solid #132A4C' : '1px solid #D9D3C8',
                    backgroundColor: hora === h ? '#EDF1F6' : '#FFF',
                    color: '#132A4C',
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleConfirmar}
            disabled={!dia || !hora || loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            {loading ? 'A confirmar...' : 'Confirmar visita'}
          </button>
        </div>
      </div>
    </main>
  )
}
