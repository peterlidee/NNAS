import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import SignUpForm from './SignUpForm';
import Link from 'next/link';

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Sign Up
      </h2>
      {session ? (
        <p className='text-center'>You are already signed in.</p>
      ) : (
        <div>
          <p className='mb-4'>
            Sign up for a new account or{' '}
            <Link href='/signin' className='underline'>
              sign in
            </Link>{' '}
            when you already have an account.
          </p>
          <SignUpForm />
        </div>
      )}
    </div>
  );
}
