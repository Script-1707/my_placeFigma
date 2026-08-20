import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User, ChevronDown, Globe, PlusCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [servicosOpen, setServicosOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
    setUserMenuOpen(false)
  }

  const mainLinks = [
    { label: 'Início', to: '/' },
    { label: 'Comprar/Alugar', to: '/' },
    { label: 'Empreendimentos', to: '/' },
  ]

  const servicos = [
    { label: 'Pedido Assistido', to: '/pedido-assistido' },
    { label: 'Candidatura a Captador', to: '/captador/candidatura' },
  ]

  const roleLinks = [
    ...(user?.perfil === 'Proprietário' ? [{ label: 'Publicar Imóvel', to: '/publicar' }] : []),
    ...(user?.perfil === 'Captador' ? [{ label: 'Painel Captador', to: '/captador/painel' }] : []),
    ...(user?.perfil === 'Administrador' ? [{ label: 'Administração', to: '/admin' }] : []),
  ]

  return (
    <header style={{ backgroundColor: '#132A4C', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
          <img src="/icones/myplace-icon-reversed.svg" alt="" className="w-8 h-8" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            <span style={{ color: '#AD7B3B' }}>My</span>
            <span style={{ color: '#FFF' }}>Place</span>
          </span>
        </Link>

        {/* Desktop main nav */}
        <nav className="hidden lg:flex items-center gap-2 mr-auto">
          {mainLinks.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-semibold px-3.5 py-2 rounded-full no-underline transition-colors"
              style={{
                backgroundColor: i === 0 ? '#AD7B3B' : 'rgba(255,255,255,0.08)',
                color: i === 0 ? '#FFF' : '#CBD5E1',
              }}
              onMouseEnter={e => { if (i !== 0) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.16)' }}
              onMouseLeave={e => { if (i !== 0) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setServicosOpen(v => !v)}
              className="flex items-center gap-1 text-sm font-semibold px-3.5 py-2 rounded-full transition-colors"
              style={{ color: '#CBD5E1', backgroundColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Serviços
              <ChevronDown size={14} />
            </button>
            {servicosOpen && (
              <div
                className="absolute left-0 top-full mt-2 rounded-xl overflow-hidden shadow-xl w-52"
                style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
              >
                {[...servicos, ...roleLinks].map(s => (
                  <Link
                    key={s.label}
                    to={s.to}
                    onClick={() => setServicosOpen(false)}
                    className="block px-4 py-2.5 text-sm no-underline transition-colors"
                    style={{ color: '#132A4C' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F3EFE7')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop right area */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
          <button
            className="flex items-center gap-1.5 text-sm font-medium px-2 py-1.5 rounded-lg transition-colors"
            style={{ color: '#CBD5E1' }}
          >
            <Globe size={16} />
            🇦🇴 PT
            <ChevronDown size={13} />
          </button>

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
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-semibold no-underline px-3.5 py-2 rounded-full transition-colors"
              style={{ color: '#FFF', border: '1px solid rgba(255,255,255,0.35)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Entrar / Registar
            </Link>
          )}

          <Link
            to="/publicar"
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full no-underline transition-colors"
            style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
          >
            <PlusCircle size={15} />
            Anuncie o seu Imóvel
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded"
          style={{ color: '#FFF' }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-2" style={{ backgroundColor: '#132A4C', borderTop: '1px solid #1F3D6B' }}>
          {mainLinks.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm py-2 no-underline"
              style={{ color: '#CBD5E1' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {[...servicos, ...roleLinks].map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm py-2 no-underline"
              style={{ color: '#CBD5E1' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/publicar"
            className="text-sm font-semibold py-2 px-4 rounded-lg text-center no-underline"
            style={{ backgroundColor: '#AD7B3B', color: '#FFF' }}
            onClick={() => setMenuOpen(false)}
          >
            Anuncie o seu Imóvel
          </Link>
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
              <Link to="/login" className="text-sm py-2 no-underline" style={{ color: '#CBD5E1' }} onClick={() => setMenuOpen(false)}>
                Entrar / Registar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
