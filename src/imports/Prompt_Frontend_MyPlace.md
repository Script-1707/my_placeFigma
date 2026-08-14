# Prompt — Desenvolvimento do Frontend "My Place"

> Copia tudo o que está abaixo e cola directamente na IA que vais usar para gerar o frontend (v0, Lovable, Bolt, Cursor, Claude, etc.). O prompt é autocontido — não depende de nenhum outro documento.

---

Quero que construas o **frontend web (React)** de uma plataforma imobiliária digital chamada **My Place**, focada no mercado de Angola. Lê todo o contexto abaixo antes de gerar qualquer código.

## 1. Contexto do Projecto

A My Place resolve um problema real do mercado imobiliário angolano: intermediários informais que cobram por visitas sem garantia, falta de plataformas digitais acessíveis para a classe média/baixa, e ausência de transparência de preços. A plataforma tem três pilares: um **marketplace de imóveis**, um serviço de **Pedido Assistido** (o cliente descreve o que procura e capadores respondem com propostas), e uma **rede de Captadores formalizados** com sistema de reputação. Todo imóvel tem um **nível de confiança/verificação** (Bronze, Prata, Ouro, Diamante) visível publicamente.

## 2. Stack Técnico Obrigatório

- **Frontend:** React (SPA)
- **Backend (já especificado, não construir agora):** API REST em Spring Boot, prefixo `/api/v1`, JSON, autenticação por **JWT Bearer token**
- **Idioma da interface:** Português de Angola (pt-AO) — nunca português do Brasil ou de Portugal em termos que soem estranhos localmente
- **Moeda:** Kwanza, formatado como `150.000 Kz`
- **Responsividade:** mobile-first, funcional a partir de **360px** de largura (muitos utilizadores acedem via smartphones de entrada de gama)

## 3. Identidade Visual

- **Cor primária:** azul-marinho escuro `#132A4C`
- **Cor secundária:** azul mais claro `#1F3D6B`
- **Cor de destaque (accent):** dourado/bronze `#AD7B3B`
- **Fundos neutros:** bege claro `#F3EFE7` e azul muito pálido `#EDF1F6`
- **Tom visual:** profissional, confiável, acessível — **não** um visual de luxo/imobiliário de elite. O público-alvo é a classe média e popular angolana.
- **Tipografia:** sans-serif limpa e legível (ex.: Inter, ou equivalente)
- Usa selos/badges de cor diferenciada para os 4 níveis de verificação (sugestão: Bronze em tom terroso, Prata em cinza, Ouro no dourado de destaque, Diamante num azul mais vivo ou com brilho sutil)

## 4. Perfis de Utilizador

A interface deve adaptar-se a estes perfis (apenas um perfil activo de cada vez por sessão):

- **Visitante** — sem conta, só pesquisa e vê fichas de imóveis
- **Proprietário** — publica e gere os seus imóveis
- **Cliente** — procura, agenda visitas, submete Pedidos Assistidos, fecha negócios
- **Captador/Agente** — responde a Pedidos Assistidos, gere a sua reputação
- **Administrador** — aprova anúncios, gere utilizadores

## 5. Ecrãs a Construir (âmbito fechado do MVP — não adicionar mais do que isto)

### 5.1 Autenticação
- **Login:** email/telefone + password
- **Registo:** nome, email, telefone, password, selecção de perfil (Proprietário / Cliente / Captador / Imobiliária)

### 5.2 Pesquisa de Imóveis (página inicial)
- Barra de pesquisa por texto livre
- Filtros: zona, tipologia, preço (min/max), área, mobilado, garagem
- Grelha de resultados: foto de capa, preço, zona, tipologia, selo do nível de verificação
- Paginação

### 5.3 Ficha de Imóvel
- Galeria de fotos/vídeo
- Preço, condições, descrição completa
- Selo de nível de verificação com tooltip explicando o que significa
- Localização (mapa, se viável)
- Botão "Agendar Visita" e botão "Contactar"

### 5.4 Publicar Imóvel (Proprietário)
- Formulário: categoria, tipologia, arrendamento/venda, localização, preço, área, descrição, upload de fotos/vídeos
- Feedback de estado: "Publicado" ou "Pendente de aprovação"

### 5.5 Agendar Visita
- Selector de data/hora disponível
- Ecrã de confirmação

### 5.6 Pedido Assistido (Cliente)
- Formulário: zona, tipologia, orçamento máximo, condições especiais
- Lista de propostas recebidas, com estado (pendente/aceite/rejeitada)

### 5.7 Painel do Captador
- Lista de Pedidos Assistidos em aberto na sua zona
- Formulário para submeter proposta (seleccionar imóvel existente ou descrever um novo)
- Perfil público de reputação (taxa de sucesso, avaliação média)

### 5.8 Candidatura a Captador
- Formulário: dados pessoais, upload de documento de identificação, aceitação do código de conduta
- Estado da candidatura (pendente / aprovado / rejeitado)

### 5.9 Registar Fecho de Negócio
- Formulário simples: imóvel associado, tipo (arrendamento/venda), valor final

### 5.10 Painel Administrativo
- Fila de anúncios pendentes, com acção de aprovar/rejeitar
- Lista de utilizadores, com acção de activar/suspender

## 6. Estrutura de Rotas Sugerida

```
/                          → pesquisa de imóveis
/imoveis/:id               → ficha de imóvel
/login
/registo
/publicar                  → publicar imóvel (Proprietário)
/pedido-assistido          → novo pedido assistido (Cliente)
/pedido-assistido/:id      → detalhe + propostas recebidas
/captador/painel           → pedidos em aberto + submeter proposta
/captador/candidatura      → candidatura a captador
/admin                     → aprovação de anúncios e gestão de utilizadores
```

## 7. Integração com a API (backend já definido — consome, não inventes endpoints diferentes)

```
POST   /api/v1/auth/registo
POST   /api/v1/auth/login
GET    /api/v1/imoveis                          (filtros via query params)
GET    /api/v1/imoveis/{id}
POST   /api/v1/imoveis
PUT    /api/v1/imoveis/{id}
POST   /api/v1/imoveis/{id}/visitas
POST   /api/v1/pedidos-assistidos
GET    /api/v1/pedidos-assistidos
POST   /api/v1/pedidos-assistidos/{id}/propostas
PATCH  /api/v1/propostas/{id}
POST   /api/v1/captadores/candidatura
PATCH  /api/v1/captadores/{id}/estado
POST   /api/v1/negocios
PATCH  /api/v1/anuncios/{id}/aprovacao
```

Todos os pedidos autenticados devem enviar `Authorization: Bearer <token>`. Enquanto o backend não estiver disponível para testes, usa dados mock/estado local que sigam exactamente esta forma de dados, para a integração ser directa depois.

## 8. Fora de Âmbito — Não implementar nesta fase

- Notificações em tempo real (push/SMS)
- Relatórios de mercado / dashboards analíticos avançados
- Avaliação de captadores por estrelas (ecrã completo)
- Fluxo completo de verificação Prata/Ouro/Diamante (apenas mostrar o selo/estado já atribuído)
- Plano Destaque / subscrições pagas
- Autenticação multi-factor
- Internacionalização (só português de Angola, sem selector de idioma)

## 9. Entregável Esperado

- Estrutura de páginas/rotas em React conforme a secção 6
- Componentes reutilizáveis para: cartão de imóvel, selo de verificação, formulários, tabela/lista de propostas
- Camada de serviços isolada para chamadas à API (fácil de trocar mock por chamadas reais)
- Estilização consistente com a identidade visual da secção 3
- Layout mobile-first, testado visualmente a partir de 360px de largura

---

*Este prompt foi preparado com base na Especificação Funcional e Técnica e no Plano de Projecto do MVP My Place — âmbito limitado aos requisitos "Must Have" da priorização MoSCoW.*
