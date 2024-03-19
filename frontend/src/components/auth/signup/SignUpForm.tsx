export default function SignUpForm() {
  return (
    <form className='my-8'>
      <div className='mb-3'>
        <label htmlFor='username' className='block mb-1'>
          Username *
        </label>
        <input
          type='text'
          id='username'
          name='username'
          required
          className='border border-gray-300 w-full rounded-sm px-2 py-1'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='block mb-1'>
          Email *
        </label>
        <input
          type='email'
          id='email'
          name='email'
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
          className='bg-blue-400 px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait'
        >
          sign up
        </button>
      </div>
    </form>
  );
}
