import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export default async function LoggedInServer() {
  const session = await getServerSession(authOptions);
  // console.log('getServerSession', session);
  return (
    <div
      className={`p-4 basis-2/4 rounded-sm text-center ${
        session ? 'bg-green-200' : 'bg-red-200'
      }`}
    >
      Server:{' '}
      {session ? `logged in as ${session.user?.name}.` : 'not logged in.'}
    </div>
  );
}
