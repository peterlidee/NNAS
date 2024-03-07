'use client';

import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      className='bg-sky-400 rounded-md px-4 py-2'
      onClick={() => signIn()}
    >
      sign in
    </button>
  );
}
