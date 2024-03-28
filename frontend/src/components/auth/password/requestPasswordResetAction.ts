'use server';

import { z } from 'zod';
import { RequestPasswordResetFormStateT } from './RequestPasswordReset';

const formSchema = z.object({
  email: z.string().email('Enter a valid email.').trim(),
});

export default async function requestPasswordResetAction(
  prevState: RequestPasswordResetFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      message: 'Please verify your data.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email } = validatedFields.data;

  try {
    const strapiResponse: any = await fetch(
      process.env.STRAPI_BACKEND_URL + '/api/auth/forgot-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        cache: 'no-cache',
      }
    );
    const data = await strapiResponse.json();

    // handle strapi error
    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: '',
      };
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data = await strapiResponse.json();
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }

    // we do handle success here, we do not use a redirect!!
    return {
      error: false,
      message: 'Success',
    };
  } catch (error: any) {
    // network error or something
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
    };
  }
}
