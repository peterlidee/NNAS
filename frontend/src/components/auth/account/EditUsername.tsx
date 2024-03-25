'use client';

import { FormEvent, useState } from 'react';
import editUsernameAction, { EditUsernameActionT } from './editUsernameAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  username: string;
};

export default function EditUsername({ username }: Props) {
  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    // validate newUsername
    if (newUsername === '' || newUsername.length < 4) {
      setError('Username is too short.');
      setLoading(false);
      return;
    }

    // call server action
    const actionResponse: EditUsernameActionT = await editUsernameAction(
      newUsername
    );
    // screen flicker only in dev mode because of revalidateTags in editUsernameAction

    // handle error
    if (actionResponse.error) {
      setError(actionResponse.message);
      setMessage(actionResponse.message);
      setLoading(false);
      return;
    }

    // handle success
    // username is updated in DB and getCurrentUser fetch was updated with revalidateTag
    if (!actionResponse.error && actionResponse.message === 'Success') {
      // inform user of success
      setError(null);
      setMessage('Updated username.');
      setLoading(false);

      // update NextAuth token
      await update({ username: actionResponse.data.username });
      // refresh server components
      router.refresh();
    }
  }

  return (
    <div className='mb-2'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username' className='block italic'>
          Username:
        </label>
        <div className='flex gap-1'>
          {!edit && <div>{username}</div>}
          {edit && (
            <>
              <input
                type='text'
                className='bg-white border border-zinc-300 rounded-sm px-2 py-1 w-48'
                required
                name='username'
                id='username'
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                type='submit'
                className={`bg-blue-400 px-3 py-1 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait`}
                disabled={loading}
                aria-disabled={loading}
              >
                {loading ? 'saving' : 'save'}
              </button>
            </>
          )}
          <button
            type='button'
            onClick={() => {
              setEdit((prev) => !prev);
              setError(null);
              setMessage(null);
              setNewUsername(username);
            }}
            className='underline text-sky-700 ml-1'
          >
            {edit ? 'close' : 'edit'}
          </button>
        </div>
        {edit && error && (
          <div className='text-red-700' aria-live='polite'>
            Something went wrong: {error}
          </div>
        )}
        {edit && !error && message ? (
          <div className='text-green-700' aria-live='polite'>
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
