<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo" />
  <h1>UserHub</h1>
  <p>Sistema de autenticação e gerenciamento de usuários</p>
</div>

---

## Funcionalidades

### 1. Tela de Login
- Campos: email e senha
- Integração com Google OAuth
- Validação de campos em tempo real
- Feedback visual para erros
- Redirecionamento pós-login:
  - **Admin:** Dashboard administrativo
  - **User:** Perfil do usuário

### 2. Recuperação de Senha
- Fluxo completo de recuperação
- Feedback visual do status
- Redirecionamento automático após redefinição
- Interface responsiva e acessível

### 3. Tela de Cadastro
- Campos: nome, email, senha
- Validação em tempo real
- Força da senha
- Termos de uso
- Redirecionamento automático para login
- Tratamento de erros

### 4. Tela de Listagem (Admins)
- Lista completa de usuários
- Colunas: nome, email, papel, status, últ. acesso
- Filtros avançados:
  - Por papel (admin/user)
  - Por status (ativo/inativo)
  - Busca por nome/email
- Ordenação por qualquer coluna
- Paginação com seleção de itens por página
- Ações rápidas (editar, desativar, redefinir senha)

### 5. Tela de Perfil (Usuário)
- Informações do usuário:
  - Nome e email
  - Foto de perfil
  - Data de cadastro
  - Último acesso
- Edição de perfil
- Alteração de senha segura
- Preferências de notificação
- Sessões ativas
- Exportação de dados

---

## Requisitos Técnicos

### Dependências Principais
- **Framework:** Nextjs + TypeScript
- **Gerenciamento de Estado:** 
  - Context API para autenticação
  - React Query para dados remotos
  - Zustand para estado manipulaveis
- **UI/UX:**
  - TailwindCSS para estilização
  - Shadcn/ui para componentes
  - Framer Motion para animações
  - React Hook Form para formulários
  - Zod para validação
- **Autenticação:** JWT + OAuth2
- **Testes:** Jest + React Testing Library
- **Formatação:** ESLint + Prettier

## Design Responsivo
- Mobile-first
- Breakpoints otimizados
- Navegação adaptativa
- Tabelas responsivas
- Imagens responsivas
- Suporte a dark/light mode

## Segurança
- Tokens JWT armazenados em httpOnly cookies
- Validação de formulários no cliente e servidor
- Rate limiting nas requisições de autenticação
- CORS configurado corretamente
- Headers de segurança habilitados
---

## Pré-requisitos
- Node.js 18+
- npm ou yarn
- Backend rodando localmente
- Conta no Google Cloud para OAuth

## Como Executar

1. Instale as dependências:
```bash
yarn
# ou
npm install
```

2. Configure as variáveis de ambiente no `.env.local`

3. Inicie o servidor de desenvolvimento:
```bash
yarn dev
# ou
npm run dev
```

4. Acesse `http://localhost:3000`

## 📁 Estrutura de Pastas

```
src/
├── app/                    # Páginas e rotas do Next.js
│    │
│    ├─ auth/               # Páginas de autenticação
│    │  ├─ sign-in/         # Página de login
│    │  ├─ sign-up/         # Página de cadastro
│    │  └─ forgot-password/ # Página de recuperação de senha
│    └── ...
├── components/             # Componentes reutilizáveis
│ 
├── config/                 # Configurações do projeto
│   ├── env.ts              # Variáveis de ambiente
│   ├── slack.ts            # Integração com o Slack
│   ├── hrefs.ts            # URLs do projeto
│   └── routes.ts           # Configurações de rotas
├── lib/                    # Bibliotecas e utilitários
│   ├── constants/          # Constantes do projeto
│   └── utils/              # Funções utilitárias
├── services/               # Serviços e integrações
│   ├── fetch/              # Serviços de requisição HTTP
│   └── reactQuery/         # Configuração do React Query
├── server/                 # Servidor e integrações
│   ├── actions/            # Ações do servidor
│   ├── logger/             # Logger do servidor
│   └── slack/              # Integração com o Slack
└── types/                  # Tipos TypeScript
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

## 📝 Licença

[MIT](LICENSE)

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
- [Documentação do VLibras](https://vlibras.gov.br/)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
