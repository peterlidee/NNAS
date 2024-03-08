import Link from 'next/link';

export default function SignIn() {
  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Sign in
      </h2>
      <div>
        <p className='mb-4'>
          Sign in to your account or{' '}
          <Link href='/register' className='underline'>
            create a new account.
          </Link>
        </p>
        [form]
        <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0'>
          <span className='bg-zinc-100 px-4 relative z-10 text-zinc-400'>
            or
          </span>
        </div>
        <button className='bg-white border border-zinc-300 py-1 rounded-md w-full text-zinc-700'>
          <span className='text-red-700 mr-2'>G</span> Sign in with Google
        </button>
      </div>
    </div>
  );
}
