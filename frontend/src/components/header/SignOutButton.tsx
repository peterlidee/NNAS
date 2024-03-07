'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      className='bg-sky-400 rounded-md px-4 py-2'
      onClick={() => signOut()}
    >
      sign out
    </button>
  );
}
