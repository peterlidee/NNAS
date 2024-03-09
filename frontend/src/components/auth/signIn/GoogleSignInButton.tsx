'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  return (
    <button
      className='bg-white border border-zinc-300 py-1 rounded-md w-full text-zinc-700'
      onClick={() => signIn('google', { callbackUrl: callbackUrl })}
    >
      <span className='text-red-700 mr-2'>G</span> Sign in with Google
    </button>
  );
}
