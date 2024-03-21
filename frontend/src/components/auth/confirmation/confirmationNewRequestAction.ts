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
      fieldErrors: validatedFields.error.flatten().fieldErrors,
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

    // !strapiResponse.ok basically does not happen, if you enter an email, it will return
    // status 200
    // { email: 'email', sent: true }
    // thus, hiding if the email actually exists in DB
    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: 'An error occured',
      };
      return response;
    }

    // we redirect on success
  } catch (error) {
    // network error or something
    console.log('[confirmationRequestAction] catch error', error);
    return {
      error: true,
      message: 'Server error please try again later.',
    };
  }

  redirect('/confirmation/message');
}
