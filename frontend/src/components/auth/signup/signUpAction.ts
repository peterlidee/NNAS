'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { SignUpFormStateT } from './SignUpForm';

const formSchema = z.object({
  username: z.string().min(2).max(30).trim(),
  email: z.string().email('Enter a valid email.').trim(),
  password: z.string().min(6).max(30).trim(),
});

export default async function signUpAction(
  prevState: SignUpFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Please verify your data.',
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const strapiResponse = await fetch(
      process.env.STRAPI_BACKEND_URL + '/api/auth/local/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
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
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }
  } catch (error: any) {
    // network error or something
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
    };
  }

  // redirect outside try catch block!
  redirect('/confirmation/message');
}
