import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default async function NavbarUser() {
  const session = await getServerSession(authOptions);
  console.log('getServerSession', session);

  if (!session) {
    return <SignInButton />;
  }
  return (
    <>
      <div className='text-sky-700'>{session.user?.name}</div>
      <SignOutButton />
    </>
  );
}
