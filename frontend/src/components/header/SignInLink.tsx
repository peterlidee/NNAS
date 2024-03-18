'use client';

import Link from 'next/link';
import useCallbackUrl from '@/hooks/useCallbackUrl';

export default function SignInLink() {
  const callbackUrl = useCallbackUrl();
  return (
    <Link
      href={`/signin?callbackUrl=${callbackUrl}`}
      className='bg-blue-400 rounded-md px-4 py-2'
    >
      sign in
    </Link>
  );
}
