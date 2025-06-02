import { Dictionary } from 'src/types/i18n-types';

const pt: Dictionary = {
  common: {
    companyName: 'Conectar UserHub',
    welcome: 'Bem-vindo!',
    increment: 'Incrementar',
    decrement: 'Decrementar',
    signOut: 'Sair',
    signIn: 'Entrar',
    signUp: 'Cadastrar',
    signInToContinue: 'Entrar para continuar',
    signUpToContinue: 'Cadastrar para continuar',
    getStarted: 'Começar',
  },

  home: {
    title: 'Bem-vindo ao Conectar UserHub',
    description: 'Faça login para continuar',
  },
  auth: {
    signIn: {
      title: 'Entrar',
      subtitle: 'Faça login para continuar',
      fields: {
        email: {
          label: 'E-mail',
          placeholder: 'Digite seu e-mail',
        },
        password: {
          label: 'Senha',
          placeholder: 'Digite sua senha',
        },
      },
      actions: {
        submit: 'Entrar',
        forgotPassword: 'Esqueceu a senha?',
        noAccount: 'Não tem uma conta?',
        signUp: 'Cadastre-se',
        userNotFound: 'Usuário não encontrado',
        userNotFoundPassword: 'Senha não encontrada entre com Google',
        invalidCredentials: 'Credenciais inválidas',
      },
      footer: {
        orContinueWith: 'Ou continue com',
        google: 'Sign in with Google',
      },
    },
    signUp: {
      title: 'Cadastre-se',
      subtitle: 'Crie sua conta',

      fields: {
        name: {
          label: 'Nome',
          placeholder: 'Digite seu nome',
        },
        lastname: {
          label: 'Sobrenome',
          placeholder: 'Digite seu sobrenome',
        },
        email: {
          label: 'Email',
          placeholder: 'Digite seu email',
        },
        password: {
          label: 'Senha',
          placeholder: 'Digite sua senha',
        },
      },
      actions: {
        submit: 'Cadastrar',
        alreadyHaveAccount: 'Já tem uma conta?',
        signIn: 'Entrar',
        emailAlreadyExists: 'Este e-mail já está cadastrado',
      },
      footer: {
        orContinueWith: 'Ou continue com',
        google: 'Google',
      },
    },
  },
  interface: {
    accountStatus: 'Você está logado em sua conta',
    actions: {
      viewDashboard: 'Ver Painel',
      quickActions: 'Ações Rápidas',
      profile: 'Perfil',
      settings: 'Configurações',
    },
  },
};

export default pt;
