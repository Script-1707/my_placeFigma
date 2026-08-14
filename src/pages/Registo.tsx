import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { PerfilUtilizador } from '../data/mock'

const PERFIS: { valor: PerfilUtilizador; label: string; descricao: string }[] = [
  { valor: 'Proprietário', label: 'Proprietário', descricao: 'Publicar e gerir imóveis' },
  { valor: 'Cliente', label: 'Cliente', descricao: 'Procurar e agendar visitas' },
  { valor: 'Captador', label: 'Captador/Agente', descricao: 'Responder a pedidos assistidos' },
]

export default function Registo() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', password: '', perfil: '' as PerfilUtilizador | '' })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function set(field: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.perfil) { setErro('Selecciona um perfil para continuar.'); return }
    setErro('')
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 700))
      login({ id: 'new-user', nome: form.nome, email: form.email, perfil: form.perfil, token: 'new-token' })
      navigate('/')
    } catch {
      setErro('Erro ao criar conta. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center px-4 py-10" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Criar conta
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Junta-te à comunidade My Place</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Nome completo</label>
              <input
                required
                value={form.nome}
                onChange={e => set('nome', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="Maria Santos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => set('email', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="maria@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Telefone</label>
              <input
                type="tel"
                required
                value={form.telefone}
                onChange={e => set('telefone', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="923 000 000"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={e => set('password', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </div>

          {/* Selecção de perfil */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Vou utilizar a plataforma como</label>
            <div className="grid grid-cols-1 gap-2">
              {PERFIS.map(p => (
                <label
                  key={p.valor}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: form.perfil === p.valor ? '2px solid #132A4C' : '1px solid #D9D3C8',
                    backgroundColor: form.perfil === p.valor ? '#EDF1F6' : '#FFF',
                  }}
                >
                  <input
                    type="radio"
                    name="perfil"
                    value={p.valor}
                    checked={form.perfil === p.valor}
                    onChange={() => set('perfil', p.valor)}
                    className="accent-blue-900"
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#132A4C' }}>{p.label}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{p.descricao}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {erro && (
            <p className="text-sm rounded-lg px-3 py-2" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            {loading ? 'A criar conta...' : 'Criar conta'}
          </button>

          <p className="text-center text-sm" style={{ color: '#6B7280' }}>
            Já tens conta?{' '}
            <Link to="/login" style={{ color: '#AD7B3B', fontWeight: 600 }}>Entrar</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
