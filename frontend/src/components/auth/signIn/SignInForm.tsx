'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const initialState = {
  identifier: '',
  password: '',
};

export default function SignInForm() {
  const [data, setData] = useState(initialState);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn('credentials', {
      identifier: data.identifier,
      password: data.password,
    });
  }
  return (
    <form onSubmit={handleSubmit} method='post' className='my-8'>
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
          value={data.identifier}
          onChange={handleChange}
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
          value={data.password}
          onChange={handleChange}
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
