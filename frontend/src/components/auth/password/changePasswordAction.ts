'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { z } from 'zod';
import { StrapiErrorT } from '@/types/strapi/StrapiError';
import {
  ChangePasswordActionStateT,
  ErrorActionStateT,
} from './ChangePassword';

const formSchema = z.object({
  currentPassword: z.string().min(6).max(25).trim(),
  newPassword: z.string().min(6).max(25).trim(),
  passwordConfirmation: z.string().min(6).max(25).trim(),
});

export default async function resetPasswordAction(
  formData: FormData
): Promise<ChangePasswordActionStateT> {
  // get session and validate
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      error: true,
      message: 'You need to be logged in.',
    };
  }

  // validate inputs
  const validatedFields = formSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { currentPassword, newPassword, passwordConfirmation } =
    validatedFields.data;

  // call Strapi
  try {
    const strapiResponse = await fetch(
      process.env.STRAPI_BACKEND_URL + '/api/auth/change-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session.strapiToken,
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          passwordConfirmation,
        }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      const response: ErrorActionStateT = {
        error: true,
        message: '',
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

    // handle Strapi success
    // Strapi returns a user + token, we return the token as data.strapiToken
    // carefull, this will not invalidate old token
    const data: { jwt: string } = await strapiResponse.json();
    return {
      error: false,
      message: 'Success',
      data: {
        strapiToken: data.jwt,
      },
    };
  } catch (error: any) {
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
    };
  }
}
