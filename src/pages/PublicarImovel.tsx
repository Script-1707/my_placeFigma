import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const TIPOLOGIAS = ['T1', 'T2', 'T3', 'T4', 'T5+', 'Moradia', 'Comercial', 'Terreno']
const ZONAS = ['Talatona', 'Miramar', 'Kilamba', 'Ingombota', 'Viana', 'Rangel', 'Maianga', 'Samba', 'Cacuaco', 'Sambizanga']

export default function PublicarImovel() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [publicado, setPublicado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titulo: '',
    categoria: '',
    tipologia: '',
    tipo: '',
    zona: '',
    preco: '',
    area: '',
    mobilado: false,
    garagem: false,
    descricao: '',
  })

  if (!user || user.perfil !== 'Proprietário') {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-3 px-4">
        <p className="text-base font-medium" style={{ color: '#132A4C' }}>Acesso restrito a Proprietários</p>
        <button onClick={() => navigate('/login')} className="text-sm" style={{ color: '#AD7B3B' }}>
          Entra na tua conta
        </button>
      </div>
    )
  }

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setPublicado(true)
  }

  if (publicado) {
    return (
      <main className="flex items-center justify-center px-4 py-16" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EDF1F6' }}>
            <CheckCircle size={32} style={{ color: '#AD7B3B' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Imóvel submetido!
          </h2>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
            O teu anúncio está <strong>pendente de aprovação</strong>. A equipa My Place irá rever e publicar em breve.
          </p>
          <div className="rounded-xl px-4 py-3 mb-6 text-sm" style={{ backgroundColor: '#FFF8ED', border: '1px solid #F0C989', color: '#92400E' }}>
            Estado: <strong>Pendente de aprovação</strong>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            Ver todos os imóveis
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: '#F3EFE7', minHeight: 'calc(100vh - 56px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
          Publicar Imóvel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: '#FFF', border: '1px solid #E5E0D9' }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Título do anúncio</label>
              <input
                required
                value={form.titulo}
                onChange={e => set('titulo', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="Apartamento T3 mobilado em Talatona"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Tipologia</label>
              <select
                required
                value={form.tipologia}
                onChange={e => set('tipologia', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: form.tipologia ? '#1A1A1A' : '#9CA3AF' }}
              >
                <option value="">Seleccionar</option>
                {TIPOLOGIAS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Tipo de negócio</label>
              <select
                required
                value={form.tipo}
                onChange={e => set('tipo', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: form.tipo ? '#1A1A1A' : '#9CA3AF' }}
              >
                <option value="">Seleccionar</option>
                <option>Arrendamento</option>
                <option>Venda</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Zona</label>
              <select
                required
                value={form.zona}
                onChange={e => set('zona', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: form.zona ? '#1A1A1A' : '#9CA3AF' }}
              >
                <option value="">Seleccionar</option>
                {ZONAS.map(z => <option key={z}>{z}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Preço (Kz)</label>
              <input
                required
                type="number"
                min={0}
                value={form.preco}
                onChange={e => set('preco', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="350000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Área (m²)</label>
              <input
                required
                type="number"
                min={1}
                value={form.area}
                onChange={e => set('area', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="90"
              />
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#374151' }}>
                <input type="checkbox" checked={form.mobilado} onChange={e => set('mobilado', e.target.checked)} className="accent-amber-700" />
                Mobilado
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#374151' }}>
                <input type="checkbox" checked={form.garagem} onChange={e => set('garagem', e.target.checked)} className="accent-amber-700" />
                Garagem
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Descrição</label>
              <textarea
                required
                rows={4}
                value={form.descricao}
                onChange={e => set('descricao', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: '1px solid #D9D3C8', color: '#1A1A1A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#132A4C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
                placeholder="Descreve o imóvel — características especiais, estado de conservação, comodidades próximas..."
              />
            </div>

            {/* Upload de fotos */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Fotos e vídeos</label>
              <div
                className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 gap-3 cursor-pointer transition-colors"
                style={{ borderColor: '#D9D3C8', backgroundColor: '#F9F7F4' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#AD7B3B')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#D9D3C8')}
              >
                <Upload size={28} style={{ color: '#D9D3C8' }} />
                <div className="text-center">
                  <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Clica para adicionar fotos</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>JPG, PNG ou MP4 até 20MB por ficheiro</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#132A4C', color: '#FFF' }}
          >
            {loading ? 'A submeter...' : 'Submeter para aprovação'}
          </button>
        </form>
      </div>
    </main>
  )
}
