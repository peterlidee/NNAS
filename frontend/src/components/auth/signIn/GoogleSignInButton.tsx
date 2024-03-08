'use client';

import { signIn } from 'next-auth/react';

export default function GoogleSignInButton() {
  return (
    <button
      className='bg-white border border-zinc-300 py-1 rounded-md w-full text-zinc-700'
      onClick={() => signIn('google')}
    >
      <span className='text-red-700 mr-2'>G</span> Sign in with Google
    </button>
  );
}
