'use client';

import { useRef, useState } from 'react';
import changePasswordAction from './changePasswordAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PendingSubmitButton from '../PendingSubmitButton';

type InputErrorsT = {
  currentPassword?: string[];
  newPassword?: string[];
  passwordConfirmation?: string[];
};
export type ErrorActionStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};
type NoErrorActionStateT = {
  error: false;
  message: 'Success';
  data: {
    strapiToken: string;
  };
};
type InitialActionStateT = {
  error: false;
};
export type ChangePasswordActionStateT =
  | ErrorActionStateT
  | NoErrorActionStateT
  | InitialActionStateT;

export default function ChangePassword() {
  const [actionState, setActionState] = useState<ChangePasswordActionStateT>({
    error: false,
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { update } = useSession();

  async function handleSubmit(formData: FormData) {
    const actionRes = await changePasswordAction(formData);
    setActionState(actionRes);

    // if actionRes was successfull (password was updated)
    // the actionRes returns us a new jwt strapiToken
    // we use this token to update next auth token and session
    if (
      !actionRes.error &&
      'message' in actionRes &&
      actionRes.message === 'Success'
    ) {
      // reset formfields with useRef
      // https://sabin.dev/blog/how-to-clear-your-forms-when-using-server-actions-in-nextjs
      formRef.current?.reset();
      // update next auth
      await update({ strapiToken: actionRes.data.strapiToken });
      // after update we should do a router.refresh to refresh the server session
      router.refresh();
    }
  }

  return (
    <form className='my-8 max-w-sm' action={handleSubmit} ref={formRef}>
      <div className='mb-3'>
        <label htmlFor='currentPassword' className='block mb-1'>
          Enter your old password *
        </label>
        <input
          type='password'
          id='currentPassword'
          name='currentPassword'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
        {actionState.error && actionState?.inputErrors?.currentPassword ? (
          <div className='text-red-700' aria-live='polite'>
            {actionState.inputErrors.currentPassword[0]}
          </div>
        ) : null}
      </div>
      <div className='mb-3'>
        <label htmlFor='newPassword' className='block mb-1'>
          Enter your new password *
        </label>
        <input
          type='password'
          id='newPassword'
          name='newPassword'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
        {actionState.error && actionState?.inputErrors?.newPassword ? (
          <div className='text-red-700' aria-live='polite'>
            {actionState.inputErrors.newPassword[0]}
          </div>
        ) : null}
      </div>
      <div className='mb-3'>
        <label htmlFor='passwordConfirmation' className='block mb-1'>
          Confirm your new password *
        </label>
        <input
          type='password'
          id='passwordConfirmation'
          name='passwordConfirmation'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
        {actionState.error && actionState?.inputErrors?.passwordConfirmation ? (
          <div className='text-red-700' aria-live='polite'>
            {actionState.inputErrors.passwordConfirmation[0]}
          </div>
        ) : null}
      </div>
      <div className='mb-3'>
        <PendingSubmitButton />
      </div>
      {actionState.error && actionState.message ? (
        <div className='text-red-700' aria-live='polite'>
          {actionState.message}
        </div>
      ) : null}
      {!actionState.error &&
      'message' in actionState &&
      actionState.message === 'Success' ? (
        <div className='text-green-700' aria-live='polite'>
          Your password was updated.
        </div>
      ) : null}
    </form>
  );
}
