export type SignUpFormState =
  | {
      error?: {
        name?: string[];
        lastname?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: number;
    }
  | undefined;

export type SignInFormState =
  | {
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: number;
    }
  | undefined;

export type SignInFormValues = {
  email: string;
  password: string;
};
export type ForgotPasswordState =
  | {
      error?: {
        email?: string[] | undefined;
      };
      message?: string | null;
      status?: number;
    }
  | undefined;

export type ChangePasswordState =
  | {
      error?: {
        password?: string[] | undefined;
        newPassword?: string[] | undefined;
        email?: string[] | undefined;
      };
      message?: string | null;
      status?: number;
    }
  | undefined;
