import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { getServerSession } from 'next-auth';

export default async function Account() {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser(session!.strapiToken!);
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
      <h2 className='font-bold text-lg mb-4'>Account</h2>

      <div className='mb-8'>
        <h3 className='font-bold mb-4 text-sky-700'>User Data</h3>
        <div className='mb-2'>
          <div className='block italic'>Username: </div>
          <div>{currentUser.username}</div>
        </div>
        <div className='mb-2'>
          <div className='block italic'>Email: </div>
          <div>{currentUser.email}</div>
          <div>(You cannot edit your email.)</div>
        </div>
        <div className='mb-2'>
          Last updated: {new Date(currentUser.updatedAt).toLocaleString()}
        </div>
      </div>

      <div className='mb-8'>
        <h3 className='font-bold mb-4 text-sky-700'>Change password</h3>
        [change password component]
      </div>
    </div>
  );
}
