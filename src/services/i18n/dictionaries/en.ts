import { Dictionary } from 'src/types/i18n-types';

const en: Dictionary = {
  common: {
    companyName: 'Conectar UserHub',
    welcome: 'Welcome!',
    increment: 'Increment',
    decrement: 'Decrement',
    signOut: 'SignOut',
    signIn: 'SignIn',
    signUp: 'SignUp',
    signInToContinue: 'Sign in to continue',
    signUpToContinue: 'Sign up to continue',
    getStarted: 'Get Started',
  },
  home: {
    title: 'Welcome to Conectar UserHub',
    description: 'Sign in to continue',
  },
  auth: {
    signIn: {
      title: 'Sign In',
      subtitle: 'Sign in to continue',
      fields: {
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          placeholder: 'Enter your password',
        },
      },
      actions: {
        submit: 'Sign In',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        userNotFound: 'User not found',
        userNotFoundPassword: 'Password not found sign in with Google',
        invalidCredentials: 'Invalid credentials',
      },
      footer: {
        orContinueWith: 'Or continue with',
        google: 'Login with Google',
      },
    },
    signUp: {
      title: 'Sign Up',
      subtitle: 'Create your account',
      orContinueWith: 'Or continue with',
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Enter your name',
        },
        lastname: {
          label: 'Last Name',
          placeholder: 'Enter your last name',
        },
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          placeholder: 'Enter your password',
        },
      },
      actions: {
        submit: 'Sign Up',
        alreadyHaveAccount: 'Already have an account?',
        signIn: 'Sign in',
        emailAlreadyExists: 'This email is already registered',
      },
      footer: {
        orContinueWith: 'Or continue with',
        google: 'Google',
      },
    },
  },
  interface: {
    accountStatus: 'You are now logged in to your account',
    actions: {
      viewDashboard: 'View Dashboard',
      quickActions: 'Quick Actions',
      profile: 'Profile',
      settings: 'Settings',
    },
  },
};

export default en;
