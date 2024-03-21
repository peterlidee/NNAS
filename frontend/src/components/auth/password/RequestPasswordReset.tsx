'use client';

import { useFormState } from 'react-dom';

import PendingSubmitButton from '../PendingSubmitButton';
import requestPasswordResetAction from './requestPasswordResetAction';

type InputErrorsT = {
  email?: string[];
};
type NoErrorFormStateT = {
  error: false;
  message?: string;
};
type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RequestPasswordResetFormStateT =
  | NoErrorFormStateT
  | ErrorFormStateT;

const initialState: NoErrorFormStateT = {
  error: false,
};

export default function ForgotPassword() {
  const [state, formAction] = useFormState<
    RequestPasswordResetFormStateT,
    FormData
  >(requestPasswordResetAction, initialState);

  if (!state.error && state.message === 'Success') {
    return (
      <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
        <h2 className='font-bold text-lg mb-4'>Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your
          password. Carefull, expires ...
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Request a password reset
      </h2>
      <p className='mb-4'>
        Forgot your password? Enter your account email here and we will send you
        a link you can use to reset your password.
      </p>
      <form action={formAction} className='my-8'>
        <div className='mb-3'>
          <label htmlFor='email' className='block mb-1'>
            Email *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='bg-white border border-zinc-300 w-full rounded-sm p-2'
          />
          {state.error && state?.inputErrors?.email ? (
            <div className='text-red-700' aria-live='polite'>
              {state.inputErrors.email[0]}
            </div>
          ) : null}
        </div>
        <div className='mb-3'>
          <PendingSubmitButton />
        </div>
        {state.error && state.message ? (
          <div className='text-red-700' aria-live='polite'>
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
