'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

type FormErrorsT = {
  identifier?: undefined | string[];
  password?: undefined | string[];
  strapiError?: string;
};

const initialState = {
  identifier: '',
  password: '',
};

const formSchema = z.object({
  identifier: z.string().min(2).max(30),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters long.' })
    .max(30),
});

function ConfirmationError() {
  return (
    <p>
      It looks like you {"haven't"} confirmed your email yet. Check your email
      client for a confirmation email. Did not find it?{' '}
      <Link href='/confirmation/newrequest' className='underline'>
        Resend the confirmation email.
      </Link>
    </p>
  );
}

export default function SignInForm() {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrorsT>({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  // listen for unconfirmed email
  const hasConfirmationError =
    errors.strapiError === 'Your account email is not confirmed';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors);
      setLoading(false);
    } else {
      // no zod errors
      const signInResponse = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });
      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error
            ? signInResponse.error
            : 'Something went wrong.',
        });
        setLoading(false);
      } else {
        // handle success
        router.push(callbackUrl);
        router.refresh();
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} method='post' className='my-8'>
      <div className='mb-3'>
        <label htmlFor='identifier' className='block mb-1'>
          Email or username *
        </label>
        <input
          type='text'
          id='identifier'
          name='identifier'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
          value={data.identifier}
          onChange={handleChange}
        />
        {errors?.identifier ? (
          <div className='text-red-700' aria-live='polite'>
            {errors.identifier[0]}
          </div>
        ) : null}
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='block mb-1'>
          Password *
        </label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
          value={data.password}
          onChange={handleChange}
        />
        {errors?.password ? (
          <div className='text-red-700' aria-live='polite'>
            {errors.password[0]}
          </div>
        ) : null}
      </div>
      <div className='mb-3'>
        <button
          type='submit'
          className='bg-blue-400 px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait'
          disabled={loading}
          aria-disabled={loading}
        >
          sign in
        </button>
        <Link href='/password/requestreset' className='underline ml-3'>
          Forgot password?
        </Link>
      </div>
      {errors.password || errors.identifier ? (
        <div className='text-red-700' aria-live='polite'>
          Something went wrong. Please check your data.
        </div>
      ) : null}
      {hasConfirmationError ? (
        <div className='text-red-700' aria-live='polite'>
          <ConfirmationError />
        </div>
      ) : null}
      {!hasConfirmationError && errors.strapiError ? (
        <div className='text-red-700' aria-live='polite'>
          Something went wrong: {errors.strapiError}
        </div>
      ) : null}
    </form>
  );
}
