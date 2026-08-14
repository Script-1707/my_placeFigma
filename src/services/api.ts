const BASE = '/api/v1'

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('myplace_token')
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const api = {
  auth: {
    login: (data: unknown) => request('POST', '/auth/login', data),
    registo: (data: unknown) => request('POST', '/auth/registo', data),
  },
  imoveis: {
    listar: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : ''
      return request('GET', `/imoveis${qs}`)
    },
    obter: (id: string) => request('GET', `/imoveis/${id}`),
    criar: (data: unknown) => request('POST', '/imoveis', data),
    atualizar: (id: string, data: unknown) => request('PUT', `/imoveis/${id}`, data),
    agendarVisita: (id: string, data: unknown) => request('POST', `/imoveis/${id}/visitas`, data),
  },
  pedidosAssistidos: {
    criar: (data: unknown) => request('POST', '/pedidos-assistidos', data),
    listar: () => request('GET', '/pedidos-assistidos'),
    submeterProposta: (id: string, data: unknown) => request('POST', `/pedidos-assistidos/${id}/propostas`, data),
  },
  propostas: {
    atualizar: (id: string, data: unknown) => request('PATCH', `/propostas/${id}`, data),
  },
  captadores: {
    candidatura: (data: unknown) => request('POST', '/captadores/candidatura', data),
    atualizarEstado: (id: string, data: unknown) => request('PATCH', `/captadores/${id}/estado`, data),
  },
  negocios: {
    registar: (data: unknown) => request('POST', '/negocios', data),
  },
  anuncios: {
    aprovacao: (id: string, data: unknown) => request('PATCH', `/anuncios/${id}/aprovacao`, data),
  },
}
