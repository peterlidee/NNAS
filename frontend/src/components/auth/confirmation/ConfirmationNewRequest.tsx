'use client';

import { useFormState } from 'react-dom';
import confirmationNewRequestAction from './confirmationNewRequestAction';
import PendingSubmitButton from '../PendingSubmitButton';

export type FieldErrorsT = {
  email?: string[];
};

export type ConfirmationNewRequestFormStateT = {
  error: boolean;
  fieldErrors?: FieldErrorsT;
  message?: string;
};

const initialState: ConfirmationNewRequestFormStateT = {
  error: false,
};

export default function ConfirmationNewRequest() {
  const [state, formAction] = useFormState<
    ConfirmationNewRequestFormStateT,
    FormData
  >(confirmationNewRequestAction, initialState);

  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Confirmation request
      </h2>
      <p className='mb-4'>
        Request a new confirmation email. Maybe some info about token expiry or
        limited request here.
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
          {state.error && state?.fieldErrors?.email ? (
            <div className='text-red-700' aria-live='polite'>
              {state.fieldErrors.email[0]}
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

        {!state.error && state.message ? (
          <div className='text-green-700' aria-live='polite'>
            {/* should be unreachable because we redirect in the register action */}
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
