import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, AtSign, Send, Globe2 } from 'lucide-react'

const COLUNAS = [
  {
    titulo: 'Imóveis',
    links: [
      { label: 'Comprar', to: '/' },
      { label: 'Arrendar', to: '/' },
      { label: 'Empreendimentos', to: '/' },
      { label: 'Publicar Imóvel', to: '/publicar' },
    ],
  },
  {
    titulo: 'Serviços',
    links: [
      { label: 'Pedido Assistido', to: '/pedido-assistido' },
      { label: 'Mudanças', to: '/mudancas' },
      { label: 'Candidatura a Captador', to: '/captador/candidatura' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'Sobre nós', to: '/' },
      { label: 'Entrar', to: '/login' },
      { label: 'Registar', to: '/registo' },
    ],
  },
]

const REDES = [
  { icon: Globe2, href: 'https://facebook.com', label: 'Facebook' },
  { icon: AtSign, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Send, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#132A4C' }}>
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        {/* Marca */}
        <div>
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src="/icones/myplace-icon-reversed.svg" alt="" className="w-8 h-8" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
              <span style={{ color: '#AD7B3B' }}>My</span>
              <span style={{ color: '#FFF' }}>Place</span>
            </span>
          </Link>
          <p className="text-sm mt-4 max-w-xs" style={{ color: '#93A1B5' }}>
            A infraestrutura digital do mercado imobiliário angolano — imóveis verificados,
            sem intermediários abusivos.
          </p>

          <div className="flex flex-col gap-2.5 mt-6 text-sm" style={{ color: '#93A1B5' }}>
            <a href="mailto:geral@myplace.ao" className="flex items-center gap-2 no-underline transition-colors" style={{ color: '#93A1B5' }}>
              <Mail size={14} /> geral@myplace.ao
            </a>
            <a href="tel:+244900000000" className="flex items-center gap-2 no-underline transition-colors" style={{ color: '#93A1B5' }}>
              <Phone size={14} /> +244 900 000 000
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Talatona, Luanda, Angola
            </span>
          </div>

          <div className="flex items-center gap-2 mt-6">
            {REDES.map(r => {
              const Icon = r.icon
              return (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={r.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#E2E8F0' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#AD7B3B')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>

        {/* Colunas de links */}
        {COLUNAS.map(col => (
          <div key={col.titulo}>
            <p className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#FFFFFF' }}>
              {col.titulo}
            </p>
            <div className="flex flex-col gap-2.5">
              {col.links.map(l => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm no-underline transition-colors"
                  style={{ color: '#93A1B5' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#93A1B5')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#6B7B94' }}>
            © {new Date().getFullYear()} My Place. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: '#6B7B94' }}>
            <Link to="/" className="no-underline" style={{ color: '#6B7B94' }}>Termos de Serviço</Link>
            <Link to="/" className="no-underline" style={{ color: '#6B7B94' }}>Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
