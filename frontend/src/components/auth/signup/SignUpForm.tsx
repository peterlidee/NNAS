'use client';

import { useFormState } from 'react-dom';
import signUpAction from './signUpAction';
import PendingSubmitButton from '../PendingSubmitButton';

type InputErrorsT = {
  username?: string[];
  email?: string[];
  password?: string[];
};

type SignUpFormInitialStateT = {
  error: false;
};

type SignUpFormErrorStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
};

export default function SignUpForm() {
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState
  );
  return (
    <form className='my-8' action={formAction}>
      <div className='mb-3'>
        <label htmlFor='username' className='block mb-1'>
          Username *
        </label>
        <input
          type='text'
          id='username'
          name='username'
          required
          className='border border-gray-300 w-full rounded-sm px-2 py-1'
        />
        {state.error && state?.inputErrors?.username ? (
          <div className='text-red-700' aria-live='polite'>
            {state.inputErrors.username[0]}
          </div>
        ) : null}
      </div>
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
        <label htmlFor='password' className='block mb-1'>
          Password *
        </label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
        {state.error && state?.inputErrors?.password ? (
          <div className='text-red-700' aria-live='polite'>
            {state.inputErrors.password[0]}
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
  );
}
