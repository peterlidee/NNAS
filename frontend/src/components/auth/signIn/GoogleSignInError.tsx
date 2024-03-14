'use client';

import { useSearchParams } from 'next/navigation';

export default function GoogleSignInError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  if (!error) return null;
  return (
    <div className='text-center p-2 text-red-600 my-2'>
      Something went wrong! {error}
    </div>
  );
}
