export default function SignInForm() {
  return (
    <form method='post' className='my-8'>
      <div className='mb-3'>
        <label htmlFor='identifier' className='block mb-1'>
          Email or username *
        </label>
        <input
          type='text'
          id='identifier'
          name='identifier'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='block mb-1'>
          Password *
        </label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='bg-white border border-zinc-300 w-full rounded-sm p-2'
        />
      </div>
      <div className='mb-3'>
        <button
          type='submit'
          className='bg-blue-400 px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-500'
        >
          sign in
        </button>
      </div>
    </form>
  );
}
