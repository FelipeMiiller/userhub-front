'use server';
import { redirect } from 'next/navigation';
import { createSession } from './session.actions';
import {
  ChangePasswordState,
  ForgotPasswordState,
  SignInFormState,
  SignUpFormState,
} from 'src/types/forms';
import { routesBackend } from 'src/config/routes';
import { hrefs } from 'src/config/hrefs';
import {
  SignInFormSchema,
  SignUpFormSchema,
  changePasswordSchema,
  forgotPasswordSchema,
} from 'src/lib/validators/auth.validators';
import HTTP_STATUS from 'src/lib/constants/http-status-codes';

import { logError, logInfo, logWarn } from '../logger';

const { signin, signup } = routesBackend.auth;

export async function signUp(
  _state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validationFields = SignUpFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    lastname: formData.get('lastname'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Email: validationFields.data.email,
      Password: validationFields.data.password,
      Name: validationFields.data.name,
      LastName: validationFields.data.lastname,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    return {
      status: response.status,
      message: data.message,
    };
  }

  if (response.ok) {
    redirect(hrefs.auth.signIn);
  }

  logInfo('signUp', response.statusText, {
    email: validationFields.data.email,
  });
  return {
    status: response.status,
    message: response.statusText,
  };
}

export async function forgotPassword(
  _state: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      status: HTTP_STATUS.BAD_REQUEST.code,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const email = validatedFields.data.email;

  try {
    const response = await fetch(routesBackend.auth.forgotPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email }),
    });

    const data = await response.json();

    if (!response.ok) {
      logWarn('Forgot password error:', data);
      return {
        status: response.status,
        message: data.message || 'Ocorreu um erro ao processar sua solicitação',
      };
    }

    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    logError('Forgot password error:', error);
    return {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      message: 'Não foi possível processar sua solicitação. Tente novamente mais tarde.',
    };
  }
}

export async function ChangePassword(
  _state: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const validatedFields = changePasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    newPassword: formData.get('newPassword'),
  });

  if (!validatedFields.success) {
    return {
      status: HTTP_STATUS.BAD_REQUEST.code,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(routesBackend.auth.changePassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: validatedFields.data.email,
        Password: validatedFields.data.password,
        NewPassword: validatedFields.data.newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logWarn('Change password error:', data);
      return {
        status: response.status,
        message: data.message || 'Ocorreu um erro ao processar sua solicitação',
      };
    }

    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    logError('Change password error:', error);
    return {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      message: 'Não foi possível processar sua solicitação. Tente novamente mais tarde.',
    };
  }
}

export async function signIn(
  _state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  let result: SignInFormState = {
    status: undefined,
    message: undefined,
  };

  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(signin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: validatedFields.data.email,
        Password: validatedFields.data.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      const resp = {
        message: data.message || 'Authentication failed',
        status: response.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
        path: response.url,
      };
      logWarn('signIn', resp.message, resp);
      result = {
        message: resp.message,
        status: resp.status,
      };
      return result;
    }
    logInfo('signIn', 'Authentication successful', {
      email: validatedFields.data.email,
    });
    const { data } = await response.json();

    await createSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return {
      status: HTTP_STATUS.OK.code,
      message: 'Authentication successful',
    };
  } catch (error: unknown) {
    logError('signIn', error);
    result = {
      message: 'Error during authentication',
      status: HTTP_STATUS.UNAUTHORIZED.code,
    };
  }
  return result;
}
