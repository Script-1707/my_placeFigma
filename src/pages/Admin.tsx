import { useState } from 'react'
import { CheckCircle, XCircle, UserCheck, UserX } from 'lucide-react'
import { mockImoveis, mockUtilizadores } from '../data/mock'
import VerificacaoBadge from '../components/VerificacaoBadge'
import { useAuth } from '../context/AuthContext'

type AnuncioLocal = { id: string; estado: 'Publicado' | 'Pendente' | 'Rejeitado'; titulo: string; zona: string; nivel: import('../data/mock').NivelVerificacao }

export default function Admin() {
  const { user } = useAuth()
  const [aba, setAba] = useState<'anuncios' | 'utilizadores'>('anuncios')
  const [anuncios, setAnuncios] = useState<AnuncioLocal[]>(
    mockImoveis.filter(i => i.estado === 'Pendente').map(i => ({ id: i.id, estado: i.estado, titulo: i.titulo, zona: i.zona, nivel: i.nivel }))
  )
  const [utilizadores, setUtilizadores] = useState(mockUtilizadores)

  if (!user || user.perfil !== 'Administrador') {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3 px-4">
        <p style={{ color: '#132A4C' }}>Acesso restrito a Administradores.</p>
      </div>
    )
  }

  function aprovarAnuncio(id: string) {
    setAnuncios(a => a.map(x => x.id === id ? { ...x, estado: 'Publicado' } : x))
  }
  function rejeitarAnuncio(id: string) {
    setAnuncios(a => a.map(x => x.id === id ? { ...x, estado: 'Rejeitado' } : x))
  }
  function toggleUtilizador(id: string) {
    setUtilizadores(u => u.map(x => x.id === id ? { ...x, ativo: !x.ativo } : x))
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
          Painel Administrativo
        </h1>

        {/* Abas */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ backgroundColor: '#EDF1F6' }}>
          {(['anuncios', 'utilizadores'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setAba(tab)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: aba === tab ? '#132A4C' : 'transparent',
                color: aba === tab ? '#FFF' : '#6B7280',
              }}
            >
              {tab === 'anuncios' ? `Anúncios (${anuncios.filter(a => a.estado === 'Pendente').length} pendentes)` : `Utilizadores (${utilizadores.length})`}
            </button>
          ))}
        </div>

        {aba === 'anuncios' && (
          <div>
            {anuncios.length === 0 ? (
              <div className="text-center py-10 rounded-xl" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9', color: '#6B7280' }}>
                Não há anúncios pendentes de revisão.
              </div>
            ) : (
              <div className="space-y-3">
                {anuncios.map(an => (
                  <div key={an.id} className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#132A4C' }}>{an.titulo}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs" style={{ color: '#6B7280' }}>{an.zona}</span>
                        <VerificacaoBadge nivel={an.nivel} />
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: an.estado === 'Publicado' ? '#F0FDF4' : an.estado === 'Rejeitado' ? '#FEF2F2' : '#FFF8ED',
                            color: an.estado === 'Publicado' ? '#15803D' : an.estado === 'Rejeitado' ? '#DC2626' : '#92400E',
                          }}
                        >
                          {an.estado}
                        </span>
                      </div>
                    </div>
                    {an.estado === 'Pendente' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => aprovarAnuncio(an.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{ backgroundColor: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}
                        >
                          <CheckCircle size={13} /> Aprovar
                        </button>
                        <button
                          onClick={() => rejeitarAnuncio(an.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
                        >
                          <XCircle size={13} /> Rejeitar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {aba === 'utilizadores' && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E0D9' }}>
            <table className="w-full text-sm" style={{ backgroundColor: '#FFF' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9F7F4', borderBottom: '1px solid #E5E0D9' }}>
                  <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: '#6B7280' }}>Nome</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs hidden sm:table-cell" style={{ color: '#6B7280' }}>Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: '#6B7280' }}>Perfil</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: '#6B7280' }}>Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {utilizadores.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: i < utilizadores.length - 1 ? '1px solid #F0EBE3' : undefined }}>
                    <td className="px-4 py-3 font-medium" style={{ color: '#132A4C' }}>{u.nome}</td>
                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: '#6B7280' }}>{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EDF1F6', color: '#132A4C' }}>
                        {u.perfil}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: u.ativo ? '#F0FDF4' : '#FEF2F2',
                          color: u.ativo ? '#15803D' : '#DC2626',
                        }}
                      >
                        {u.ativo ? 'Activo' : 'Suspenso'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUtilizador(u.id)}
                        className="flex items-center gap-1 text-xs font-medium transition-colors"
                        style={{ color: u.ativo ? '#DC2626' : '#15803D' }}
                      >
                        {u.ativo ? <><UserX size={13} /> Suspender</> : <><UserCheck size={13} /> Activar</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
