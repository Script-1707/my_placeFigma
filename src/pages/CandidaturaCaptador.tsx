import { useState } from 'react'
import { CheckCircle, Upload, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function CandidaturaCaptador() {
  const { user } = useAuth()
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nome: '', bi: '', telefone: '', zona: '', aceito: false })
  const [docNome, setDocNome] = useState('')

  function set(f: string, v: string | boolean) { setForm(p => ({ ...p, [f]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.aceito) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <main className="flex items-center justify-center px-4 py-16" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EDF1F6' }}>
            <Clock size={32} style={{ color: '#AD7B3B' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Candidatura submetida
          </h2>
          <p className="text-sm mb-3" style={{ color: '#6B7280' }}>
            A tua candidatura está em análise. A equipa My Place irá rever os teus documentos e informar-te por email em 2 a 5 dias úteis.
          </p>
          <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: '#FFF8ED', border: '1px solid #F0C989', color: '#92400E' }}>
            Estado: <strong>Pendente de aprovação</strong>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
          Candidatura a Captador
        </h1>
        <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
          Junta-te à rede de captadores certificados My Place e gere comissões em imóveis que ajudes a fechar.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
        >
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Nome completo</label>
            <input
              required
              value={form.nome || user?.nome || ''}
              onChange={e => set('nome', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Número do BI / Passaporte</label>
            <input
              required
              value={form.bi}
              onChange={e => set('bi', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              placeholder="000000000LA000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Telefone de contacto</label>
            <input
              required
              type="tel"
              value={form.telefone}
              onChange={e => set('telefone', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              placeholder="923 000 000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Zona principal de actuação</label>
            <input
              required
              value={form.zona}
              onChange={e => set('zona', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              placeholder="Talatona, Miramar..."
            />
          </div>

          {/* Upload de documento */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Documento de identificação</label>
            <label
              className="flex flex-col items-center justify-center py-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors gap-2"
              style={{ borderColor: docNome ? '#AD7B3B' : '#D9D3C8', backgroundColor: '#F9F7F4' }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={e => setDocNome(e.target.files?.[0]?.name || '')}
              />
              {docNome ? (
                <>
                  <CheckCircle size={22} style={{ color: '#AD7B3B' }} />
                  <p className="text-sm font-medium" style={{ color: '#374151' }}>{docNome}</p>
                </>
              ) : (
                <>
                  <Upload size={22} style={{ color: '#D9D3C8' }} />
                  <p className="text-sm" style={{ color: '#6B7280' }}>Frente e verso do BI, ou passaporte</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>JPG, PNG ou PDF até 5MB</p>
                </>
              )}
            </label>
          </div>

          {/* Código de conduta */}
          <div className="rounded-xl p-4 text-sm" style={{ backgroundColor: '#F9F7F4', border: '1px solid #E5E0D9' }}>
            <p className="font-semibold mb-2" style={{ color: '#132A4C' }}>Código de Conduta My Place</p>
            <ul className="space-y-1 text-xs" style={{ color: '#6B7280' }}>
              <li>• Nunca cobrar taxas antecipadas por visitas</li>
              <li>• Apresentar imóveis reais e disponíveis</li>
              <li>• Tratar todos os clientes com respeito e profissionalismo</li>
              <li>• Divulgar toda a informação relevante sobre o imóvel</li>
            </ul>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.aceito}
              onChange={e => set('aceito', e.target.checked)}
              className="mt-0.5 accent-amber-700"
            />
            <span className="text-sm" style={{ color: '#374151' }}>
              Li e aceito o Código de Conduta My Place e os Termos de Serviço para Captadores.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !form.aceito}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            {loading ? 'A submeter...' : 'Submeter candidatura'}
          </button>
        </form>
      </div>
    </main>
  )
}
