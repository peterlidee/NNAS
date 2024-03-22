import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SignOutButton from './SignOutButton';
import SignInLink from './SignInLink';
import Link from 'next/link';

export default async function NavbarUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignInLink />;
  }
  return (
    <>
      <Link href='/account' className='text-sky-700 underline'>
        {session.user?.name}
      </Link>
      <SignOutButton />
    </>
  );
}
