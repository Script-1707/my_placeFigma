import { useState } from 'react'
import { Truck } from 'lucide-react'

export default function Mudancas() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ origem: '', destino: '', data: '', telefone: '' })

  function set(f: string, v: string) { setForm(p => ({ ...p, [f]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 600))
    setEnviado(true)
  }

  return (
    <main className="flex items-center justify-center px-4 py-16" style={{ minHeight: 'calc(100vh - 56px)', backgroundColor: '#F3EFE7' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span
            className="flex items-center justify-center rounded-full mx-auto mb-4"
            style={{ width: 60, height: 60, backgroundColor: '#E8963C' }}
          >
            <Truck size={28} color="#FFFFFF" />
          </span>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#132A4C' }}>
            Pedido de Mudança
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Trata da logística da tua mudança connosco — transporte, embalagem e entrega.
          </p>
        </div>

        {enviado ? (
          <div className="text-center rounded-2xl bg-white p-8" style={{ border: '1px solid #E5E0D9' }}>
            <p className="font-semibold" style={{ color: '#132A4C' }}>Pedido recebido!</p>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              A equipa My Place vai contactar-te em breve com um orçamento.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 flex flex-col gap-4" style={{ border: '1px solid #E5E0D9' }}>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Endereço de origem</label>
              <input
                required
                value={form.origem}
                onChange={e => set('origem', e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Endereço de destino</label>
              <input
                required
                value={form.destino}
                onChange={e => set('destino', e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Data prevista</label>
              <input
                type="date"
                required
                value={form.data}
                onChange={e => set('data', e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Telefone</label>
              <input
                required
                value={form.telefone}
                onChange={e => set('telefone', e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                style={{ border: '1px solid #E5E0D9', color: '#1A1A1A' }}
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-full py-2.5 text-sm font-semibold"
              style={{ backgroundColor: '#E8963C', color: '#FFF' }}
            >
              Pedir orçamento
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
