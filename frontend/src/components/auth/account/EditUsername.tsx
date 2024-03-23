'use client';

import { useState } from 'react';

type Props = {
  username: string;
};

export default function EditUsername({ username }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <div className='mb-2'>
      <form>
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
              />
              <button
                type='submit'
                className={`bg-blue-400 px-3 py-1 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait`}
              >
                save
              </button>
            </>
          )}
          <button
            type='button'
            onClick={() => {
              setEdit((prev) => !prev);
            }}
            className='underline text-sky-700 ml-1'
          >
            {edit ? 'close' : 'edit'}
          </button>
        </div>
      </form>
    </div>
  );
}
