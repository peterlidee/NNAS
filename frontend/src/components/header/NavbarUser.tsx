import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SignOutButton from './SignOutButton';
import SignInLink from './SignInLink';

export default async function NavbarUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignInLink />;
  }
  return (
    <>
      <div className='text-sky-700'>{session.user?.name}</div>
      <SignOutButton />
    </>
  );
}
