import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
    setUserMenuOpen(false)
  }

  const navLinks = [
    { label: 'Imóveis', to: '/' },
    ...(user?.perfil === 'Proprietário' ? [{ label: 'Publicar Imóvel', to: '/publicar' }] : []),
    ...(user?.perfil === 'Cliente' ? [{ label: 'Pedido Assistido', to: '/pedido-assistido' }] : []),
    ...(user?.perfil === 'Captador' ? [{ label: 'Painel Captador', to: '/captador/painel' }] : []),
    ...(user?.perfil === 'Administrador' ? [{ label: 'Administração', to: '/admin' }] : []),
  ]

  return (
    <header style={{ backgroundColor: '#132A4C', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 no-underline"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#FFF' }}
        >
          <span style={{ color: '#AD7B3B' }}>My</span>
          <span>Place</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors duration-150 no-underline"
              style={{ color: '#CBD5E1' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#AD7B3B')}
              onMouseLeave={e => (e.currentTarget.style.color = '#CBD5E1')}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop user area */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 text-sm font-medium rounded-full px-3 py-1.5 transition-colors"
                style={{ color: '#E2E8F0', backgroundColor: '#1F3D6B' }}
              >
                <User size={14} />
                <span className="max-w-28 truncate">{user.nome}</span>
                <ChevronDown size={13} />
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-xl w-44"
                  style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
                >
                  <div className="px-4 py-2.5 border-b" style={{ borderColor: '#F0EBE3' }}>
                    <p className="text-xs font-semibold" style={{ color: '#132A4C' }}>{user.nome}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{user.perfil}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors"
                    style={{ color: '#DC2626' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <LogOut size={14} /> Terminar sessão
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium no-underline"
                style={{ color: '#CBD5E1' }}
              >
                Entrar
              </Link>
              <Link
                to="/registo"
                className="text-sm font-semibold px-4 py-1.5 rounded-lg no-underline transition-colors"
                style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
              >
                Registar
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded"
          style={{ color: '#FFF' }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ backgroundColor: '#132A4C', borderTop: '1px solid #1F3D6B' }}>
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm py-2 no-underline"
              style={{ color: '#CBD5E1' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2" style={{ borderTop: '1px solid #1F3D6B' }}>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm text-left py-2"
                style={{ color: '#EF4444' }}
              >
                Terminar sessão
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm py-2 no-underline" style={{ color: '#CBD5E1' }} onClick={() => setMenuOpen(false)}>
                  Entrar
                </Link>
                <Link
                  to="/registo"
                  className="text-sm font-semibold py-2 px-4 rounded-lg text-center no-underline"
                  style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Registar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
