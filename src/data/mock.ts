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

export function nivelConfig(nivel: NivelVerificacao) {
  const configs = {
    Bronze: { bg: '#7C5A3A', text: '#FFF8F2', label: 'Bronze' },
    Prata: { bg: '#6B7280', text: '#FFFFFF', label: 'Prata' },
    Ouro: { bg: '#AD7B3B', text: '#FFFFFF', label: 'Ouro' },
    Diamante: { bg: '#1F3D6B', text: '#FFFFFF', label: 'Diamante' },
  }
  return configs[nivel]
}
