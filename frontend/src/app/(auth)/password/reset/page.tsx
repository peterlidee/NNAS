import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import ResetPassword from '@/components/auth/password/ResetPassword';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    code?: string;
  };
};

export default async function page({ searchParams }: Props) {
  // if the user is logged in, redirect to account where password change is possible
  const session = await getServerSession(authOptions);
  if (session) redirect('/account');
  return <ResetPassword code={searchParams.code} />;
}
