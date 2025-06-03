<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo" />
</div>

# Frontend - UserHub
Sistema de autenticação e gerenciamento de usuários

---

## Funcionalidades

### 1. Tela de Login
- Campos: email e senha
- Após login:
  - **Admin:** Redireciona para listagem de usuários
  - **User:** Redireciona para tela de perfil

### 2. Tela de Cadastro
- Campos: nome, email, senha
- Redireciona para tela de login após cadastro

### 3. Tela de Listagem (Admins)
- Mostra: nome, email, papel, status (ativo/inativo)
- Filtros por papel (`admin`/`user`), ordenação por nome/data
- Botões para editar ou excluir (opcional)

### 4. Tela de Perfil (Usuário)
- Mostra: nome, email, data de criação
- Permite editar nome e senha

---

## Requisitos Técnicos
- **Framework:** ReactJS + TypeScript
- **Rotas:** React Router
- **Estado Global:** Context API ou Redux
- **HTTP Client:** Axios ou Fetch API
- **Estilo:** TailwindCSS, Styled Components ou CSS Modules
- **Login Social (Opcional):** react-google-login, msal-react

## Responsividade
- Compatível com dispositivos móveis e desktops

---

## Observações
- O backend deve estar rodando e configurado para autenticação.
- Variáveis de ambiente para integração com Slack, Google OAuth, etc., devem estar presentes no `.env.local`.
- Para personalizar estilos, edite os arquivos em `src/styles`.


## 🚀 Tecnologias Principais

- **Next.js 15.3.2** - Framework React com foco em performance e SEO
- **React 19** - Biblioteca JavaScript para UI
- **React Query 5** - Gerenciamento de estado assincronos, com persistência via IndexedDB
- **VLibras** - Plugin de acessibilidade para libras
- **Tailwind CSS** - Framework de estilização
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estados manipulaveis
- **Jest e React Testing Library** - Frameworks de testes
- **TypeScript** - Tipagem estática
- **ESLint** - Linter para código JavaScript/TypeScript

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de autenticação completo 
- Páginas de login e cadastro responsivas
- Suporte a autenticação via Google
- Proteção de rotas autenticadas
- Gerenciamento de sessão seguro
- Validação de formulários em tempo real
- Feedback visual para erros de validação
- Estados de carregamento durante as requisições
- Tratamento de erros detalhado
- Redirecionamento inteligente pós-autenticação


## 📁 Estrutura de Pastas

```
src/
├── app/                      # Páginas e rotas do Next.js
│   └── [lang]/               # Rotas com suporte a múltiplos idiomas
│       ├── auth/             # Páginas de autenticação
│       │   ├── sign-in/      # Página de login
│       │   └── sign-up/      # Página de cadastro
│       └── ...
├── components/               # Componentes reutilizáveis
│ 
├── config/                  # Configurações do projeto
│   ├── env.ts              # Variáveis de ambiente
│   ├── slack.ts            # Integração com o Slack
│   ├── hrefs.ts            # URLs do projeto
│   └── routes.ts           # Configurações de rotas
├── lib/                     # Bibliotecas e utilitários
│   ├── constants/          # Constantes do projeto
│   └── utils/              # Funções utilitárias
├── services/                # Serviços e integrações
│   ├── fetch/              # Serviços de requisição HTTP
│   └── reactQuery/         # Configuração do React Query
├── server/                 # Servidor e integrações
│   ├── actions/            # Ações do servidor
│   ├── logger/             # Logger do servidor
│   └── slack/              # Integração com o Slack
└── types/                  # Tipos TypeScript
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ e Yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/felipemiiller/nextjs-template.git
   cd nextjs-template
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```


## 🛠️ Scripts Disponíveis

```bash
# Iniciar o servidor de desenvolvimento
yarn dev

# Construir para produção
yarn build

# Iniciar em modo produção
yarn start

# Limpar cache e formatar código
yarn clean

# Formatar código
yarn format

# Executar lint
yarn lint

# Executar testes
yarn test

# Executar testes em modo watch
yarn test:watch

```

## 🚨 Notificações de Erro no Slack

Este projeto envia automaticamente mensagens de erro e warning para um canal do Slack, facilitando o monitoramento de problemas em produção.

### Como configurar

1. Gere um Webhook do Slack e copie a URL.
2. Adicione as seguintes variáveis ao seu arquivo `.env.local`:
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
SLACK_CHANNEL=nome-do-canal-ou-#canal
SLACK_USERNAME=Nome do Bot (opcional)
SLACK_ICON_EMOJI=:emoji: (opcional)
```

- As mensagens são automaticamente sanitizadas e truncadas para evitar erros de payload no Slack.
- O envio só ocorre se `SLACK_WEBHOOK_URL` estiver configurado.
- Os níveis de log enviados por padrão são `error` e `warn`.

---

## 📚 Documentação

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do React Query](https://tanstack.com/query/latest/docs)
- [Next-Intl (i18n)](https://next-intl-docs.vercel.app/)
- [Next-Auth](https://next-auth.js.org/)
- [Documentação do VLibras](https://vlibras.gov.br/)

## 🌍 Idiomas Suportados

- Português (Brasil)
- Inglês (Estados Unidos)


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
