'use client';

import { useState } from 'react';

type Props = {
  username: string;
};

export default function EditUsername({ username }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <div className='mb-2'>
      <div className='block italic'>Username:</div>
      <div className='flex gap-1'>
        {!edit && <div>{username}</div>}
        {edit && 'INPUT + BUTTON'}
        <button
          type='button'
          onClick={() => {
            setEdit((prev) => !prev);
          }}
          className='underline text-sky-700'
        >
          {edit ? 'close' : 'edit'}
        </button>
      </div>
    </div>
  );
}
