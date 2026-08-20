export type NivelVerificacao = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante'
export type TipoNegocio = 'Arrendamento' | 'Venda'
export type Tipologia = 'T1' | 'T2' | 'T3' | 'T4' | 'T5+' | 'Moradia' | 'Comercial' | 'Terreno'
export type EstadoAnuncio = 'Publicado' | 'Pendente' | 'Rejeitado'
export type PerfilUtilizador = 'Visitante' | 'Proprietário' | 'Cliente' | 'Captador' | 'Administrador'

export interface Imovel {
  id: string
  titulo: string
  preco: number
  zona: string
  tipologia: Tipologia
  tipo: TipoNegocio
  area: number
  mobilado: boolean
  garagem: boolean
  descricao: string
  fotos: string[]
  nivel: NivelVerificacao
  estado: EstadoAnuncio
  proprietarioId: string
  criadoEm: string
}

export interface PedidoAssistido {
  id: string
  zona: string
  tipologia: Tipologia
  orcamentoMax: number
  condicoes: string
  clienteId: string
  estado: 'Aberto' | 'Em análise' | 'Fechado'
  criadoEm: string
  propostas: Proposta[]
}

export interface Proposta {
  id: string
  pedidoId: string
  captadorId: string
  captadorNome: string
  descricao: string
  imovelId?: string
  estado: 'Pendente' | 'Aceite' | 'Rejeitada'
  criadoEm: string
}

export interface Utilizador {
  id: string
  nome: string
  email: string
  telefone: string
  perfil: PerfilUtilizador
  ativo: boolean
  taxaSucesso?: number
  avaliacaoMedia?: number
  estadoCandidatura?: 'Pendente' | 'Aprovado' | 'Rejeitado'
}

export const mockImoveis: Imovel[] = [
  {
    id: '1',
    titulo: 'Apartamento T3 com Vista Mar em Talatona',
    preco: 850000,
    zona: 'Talatona',
    tipologia: 'T3',
    tipo: 'Arrendamento',
    area: 120,
    mobilado: true,
    garagem: true,
    descricao: 'Apartamento espaçoso e moderno com vista privilegiada para o mar. Cozinha equipada, sala ampla, 3 quartos com roupeiros embutidos. Condomínio com segurança 24h, piscina e ginásio.',
    fotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Ouro',
    estado: 'Publicado',
    proprietarioId: 'p1',
    criadoEm: '2026-07-15',
  },
  {
    id: '2',
    titulo: 'Vivenda T4 com Piscina em Miramar',
    preco: 4500000,
    zona: 'Miramar',
    tipologia: 'T4',
    tipo: 'Venda',
    area: 280,
    mobilado: false,
    garagem: true,
    descricao: 'Vivenda de luxo em condomínio fechado, com piscina privativa, jardim e 4 suítes. Acabamentos de alta qualidade. Excelente localização, próxima a escolas internacionais.',
    fotos: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Diamante',
    estado: 'Publicado',
    proprietarioId: 'p2',
    criadoEm: '2026-07-20',
  },
  {
    id: '3',
    titulo: 'Apartamento T2 no Kilamba',
    preco: 280000,
    zona: 'Kilamba',
    tipologia: 'T2',
    tipo: 'Arrendamento',
    area: 75,
    mobilado: false,
    garagem: false,
    descricao: 'Apartamento prático no novo bairro do Kilamba, próximo ao mercado e transportes. Cozinha independente, sala e 2 quartos. Ideal para famílias pequenas.',
    fotos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Bronze',
    estado: 'Publicado',
    proprietarioId: 'p3',
    criadoEm: '2026-08-01',
  },
  {
    id: '4',
    titulo: 'Escritório Comercial no Ingombota',
    preco: 600000,
    zona: 'Ingombota',
    tipologia: 'Comercial',
    tipo: 'Arrendamento',
    area: 200,
    mobilado: false,
    garagem: true,
    descricao: 'Espaço comercial moderno no centro comercial de Luanda. Open space com possibilidade de divisão, WC privativo e estacionamento.',
    fotos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Prata',
    estado: 'Publicado',
    proprietarioId: 'p1',
    criadoEm: '2026-08-05',
  },
  {
    id: '5',
    titulo: 'Moradia T3 em Viana',
    preco: 1800000,
    zona: 'Viana',
    tipologia: 'T3',
    tipo: 'Venda',
    area: 160,
    mobilado: false,
    garagem: true,
    descricao: 'Moradia independente com quintal espaçoso, ideal para criação de animais ou horta. 3 quartos, sala com lareira e cozinha ampla.',
    fotos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Prata',
    estado: 'Publicado',
    proprietarioId: 'p4',
    criadoEm: '2026-08-08',
  },
  {
    id: '6',
    titulo: 'Apartamento T1 no Rangel',
    preco: 120000,
    zona: 'Rangel',
    tipologia: 'T1',
    tipo: 'Arrendamento',
    area: 45,
    mobilado: true,
    garagem: false,
    descricao: 'Apartamento compacto e mobilado, perfeito para solteiros ou estudantes. Próximo ao mercado do Rangel e transportes públicos.',
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Bronze',
    estado: 'Pendente',
    proprietarioId: 'p5',
    criadoEm: '2026-08-10',
  },
  {
    id: '7',
    titulo: 'Apartamento T4 Duplex na Ilha de Luanda',
    preco: 3200000,
    zona: 'Ingombota',
    tipologia: 'T4',
    tipo: 'Venda',
    area: 210,
    mobilado: true,
    garagem: true,
    descricao: 'Duplex de luxo com vista panorâmica sobre a baía, acabamentos importados, terraço privativo e 2 lugares de garagem.',
    fotos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Diamante',
    estado: 'Publicado',
    proprietarioId: 'p2',
    criadoEm: '2026-08-14',
  },
  {
    id: '8',
    titulo: 'Apartamento T2 Renovado em Talatona',
    preco: 320000,
    zona: 'Talatona',
    tipologia: 'T2',
    tipo: 'Arrendamento',
    area: 90,
    mobilado: true,
    garagem: true,
    descricao: 'Apartamento totalmente renovado, cozinha americana, 2 quartos com roupeiros e varanda. Condomínio com segurança e elevador.',
    fotos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560449017-7b8d4ce6d20d?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Ouro',
    estado: 'Publicado',
    proprietarioId: 'p1',
    criadoEm: '2026-08-13',
  },
  {
    id: '9',
    titulo: 'Vivenda T5+ com Jardim em Talatona',
    preco: 6800000,
    zona: 'Talatona',
    tipologia: 'T5+',
    tipo: 'Venda',
    area: 350,
    mobilado: false,
    garagem: true,
    descricao: 'Vivenda ampla em condomínio privado, 5 suítes, jardim tratado, piscina e churrasqueira. Excelente para famílias grandes.',
    fotos: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Diamante',
    estado: 'Publicado',
    proprietarioId: 'p4',
    criadoEm: '2026-08-05',
  },
  {
    id: '10',
    titulo: 'Apartamento T3 no Kilamba com Garagem',
    preco: 420000,
    zona: 'Kilamba',
    tipologia: 'T3',
    tipo: 'Arrendamento',
    area: 105,
    mobilado: false,
    garagem: true,
    descricao: 'Apartamento amplo no Kilamba, 3 quartos, sala e cozinha separadas, garagem privativa e acesso fácil às vias principais.',
    fotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Prata',
    estado: 'Publicado',
    proprietarioId: 'p3',
    criadoEm: '2026-07-28',
  },
  {
    id: '11',
    titulo: 'Loja Comercial na Maianga',
    preco: 950000,
    zona: 'Maianga',
    tipologia: 'Comercial',
    tipo: 'Arrendamento',
    area: 140,
    mobilado: false,
    garagem: false,
    descricao: 'Loja em rua movimentada da Maianga, vitrine ampla, ideal para comércio ou serviços. Wc privativo e depósito.',
    fotos: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Prata',
    estado: 'Publicado',
    proprietarioId: 'p1',
    criadoEm: '2026-08-02',
  },
  {
    id: '12',
    titulo: 'Terreno para Construção em Cacuaco',
    preco: 1500000,
    zona: 'Cacuaco',
    tipologia: 'Terreno',
    tipo: 'Venda',
    area: 500,
    mobilado: false,
    garagem: false,
    descricao: 'Terreno murado com título de propriedade regularizado, pronto para construção, próximo à via principal.',
    fotos: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format',
    ],
    nivel: 'Bronze',
    estado: 'Publicado',
    proprietarioId: 'p5',
    criadoEm: '2026-07-22',
  },
]

export const mockPedidosAssistidos: PedidoAssistido[] = [
  {
    id: 'pa1',
    zona: 'Talatona',
    tipologia: 'T2',
    orcamentoMax: 400000,
    condicoes: 'Preciso de garagem e mobilado. Quero contrato formal.',
    clienteId: 'c1',
    estado: 'Aberto',
    criadoEm: '2026-08-12',
    propostas: [
      {
        id: 'pr1',
        pedidoId: 'pa1',
        captadorId: 'cap1',
        captadorNome: 'António Fernandes',
        descricao: 'Tenho um T2 mobilado em Talatona a 380.000 Kz/mês com garagem. Pronto a visitar.',
        imovelId: '1',
        estado: 'Pendente',
        criadoEm: '2026-08-13',
      },
    ],
  },
  {
    id: 'pa2',
    zona: 'Kilamba',
    tipologia: 'T3',
    orcamentoMax: 350000,
    condicoes: 'Para família com 2 filhos. Precisa de estar próximo a escola.',
    clienteId: 'c1',
    estado: 'Em análise',
    criadoEm: '2026-08-10',
    propostas: [],
  },
]

export const mockUtilizadores: Utilizador[] = [
  { id: 'u1', nome: 'Maria Silva', email: 'maria@example.com', telefone: '923456789', perfil: 'Cliente', ativo: true },
  { id: 'u2', nome: 'João Costa', email: 'joao@example.com', telefone: '912345678', perfil: 'Proprietário', ativo: true },
  { id: 'u3', nome: 'António Fernandes', email: 'antonio@example.com', telefone: '934567890', perfil: 'Captador', ativo: true, taxaSucesso: 87, avaliacaoMedia: 4.6, estadoCandidatura: 'Aprovado' },
  { id: 'u4', nome: 'Luísa Mendes', email: 'luisa@example.com', telefone: '945678901', perfil: 'Cliente', ativo: false },
  { id: 'u5', nome: 'Pedro Santos', email: 'pedro@example.com', telefone: '956789012', perfil: 'Captador', ativo: true, taxaSucesso: 72, avaliacaoMedia: 4.1, estadoCandidatura: 'Pendente' },
]

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-PT').replace(/\s/g, '.') + ' Kz'
}

export function quartosDeTipologia(tipologia: Tipologia): number {
  const mapa: Record<Tipologia, number> = { T1: 1, T2: 2, T3: 3, T4: 4, 'T5+': 5, Moradia: 4, Comercial: 0, Terreno: 0 }
  return mapa[tipologia]
}

export function wcDeTipologia(tipologia: Tipologia): number {
  const quartos = quartosDeTipologia(tipologia)
  return quartos === 0 ? 1 : Math.max(1, quartos - 1)
}

export function nivelConfig(nivel: NivelVerificacao) {
  const configs = {
    Bronze: { bg: '#7C5A3A', text: '#FFF8F2', label: 'Bronze' },
    Prata: { bg: '#6B7280', text: '#FFFFFF', label: 'Prata' },
    Ouro: { bg: '#AD7B3B', text: '#FFFFFF', label: 'Ouro' },
    Diamante: { bg: '#1F3D6B', text: '#FFFFFF', label: 'Diamante' },
  }
  return configs[nivel]
}
