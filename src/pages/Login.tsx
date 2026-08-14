import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      // Mock login — substituir por api.auth.login(form)
      await new Promise(r => setTimeout(r, 600))
      const mockUser = {
        id: 'u1',
        nome: 'Maria Silva',
        email: form.email,
        perfil: 'Cliente' as const,
        token: 'mock-token-abc123',
      }
      login(mockUser)
      navigate('/')
    } catch {
      setErro('Credenciais incorrectas. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center px-4 py-12" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Bem-vindo de volta
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Entra na tua conta My Place</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
        >
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
              Email ou telefone
            </label>
            <input
              type="text"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              placeholder="maria@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              placeholder="••••••••"
            />
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
            {loading ? 'A entrar...' : 'Entrar'}
          </button>

          <p className="text-center text-sm" style={{ color: '#6B7280' }}>
            Não tens conta?{' '}
            <Link to="/registo" style={{ color: '#AD7B3B', fontWeight: 600 }}>
              Registar
            </Link>
          </p>
        </form>

        {/* Demo shortcuts */}
        <div className="mt-4 rounded-xl p-4 text-xs" style={{ backgroundColor: '#EDF1F6', border: '1px solid #D9D3C8' }}>
          <p className="font-semibold mb-2" style={{ color: '#132A4C' }}>Demo — entra como:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: 'Cliente', perfil: 'Cliente' as const, nome: 'Maria Silva' },
              { label: 'Proprietário', perfil: 'Proprietário' as const, nome: 'João Costa' },
              { label: 'Captador', perfil: 'Captador' as const, nome: 'António Fernandes' },
              { label: 'Admin', perfil: 'Administrador' as const, nome: 'Admin My Place' },
            ].map(p => (
              <button
                key={p.perfil}
                onClick={() => {
                  login({ id: 'demo', nome: p.nome, email: 'demo@myplace.ao', perfil: p.perfil, token: 'demo-token' })
                  navigate('/')
                }}
                className="px-2 py-1.5 rounded-lg text-left transition-colors"
                style={{ backgroundColor: '#FFF', border: '1px solid #D9D3C8', color: '#132A4C' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F3EFE7')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFF')}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
