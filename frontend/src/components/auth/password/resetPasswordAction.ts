'use server';

import { z } from 'zod';
import { ResetPasswordFormStateT } from './ResetPassword';
import { StrapiErrorT } from '@/types/strapi/StrapiError';

const formSchema = z.object({
  password: z.string().min(6).max(30).trim(),
  passwordConfirmation: z.string().min(6).max(30).trim(),
});

export default async function resetPasswordAction(
  prevState: ResetPasswordFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
      code: prevState.code,
    };
  }
  const { password, passwordConfirmation } = validatedFields.data;

  try {
    const strapiResponse: any = await fetch(
      process.env.STRAPI_BACKEND_URL + '/api/auth/reset-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          passwordConfirmation,
          code: prevState.code,
        }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: '',
        code: prevState.code,
      };
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }

    // success
    // no need to pass code anymore
    return {
      error: false,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
      code: prevState.code,
    };
  }
}
