'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ConfirmationNewRequestFormStateT } from './ConfirmationNewRequest';

const formSchema = z.object({
  email: z.string().email('Enter a valid email.').trim(),
});

export default async function confirmNewRequestAction(
  prevState: ConfirmationNewRequestFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Please verify your data.',
    };
  }
  const { email } = validatedFields.data;

  try {
    const strapiResponse: any = await fetch(
      process.env.STRAPI_BACKEND_URL + '/api/auth/send-email-confirmation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        cache: 'no-cache',
      }
    );

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

        // we don't ever want to confirm that an email exists inside strapi DB
        // but we can't redirect inside a try catch block
        // return response only is this is not the case
        // if it is the case we will fall through to the redirect
        if (data.error.message !== 'Already confirmed') {
          response.message = data.error.message;
          return response;
        }
      } else {
        response.message = strapiResponse.statusText;
        return response;
      }
    }
    // we redirect on success outside try cacth block
  } catch (error: any) {
    // network error or something
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
    };
  }

  redirect('/confirmation/message');
}
