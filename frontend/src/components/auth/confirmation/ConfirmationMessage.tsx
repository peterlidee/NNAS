import Link from 'next/link';

export default function ConfirmationMessage() {
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
      <h2 className='font-bold text-lg mb-4'>Please confirm your email.</h2>
      <p>
        We sent you an email with a confirmation link. Please open this email
        and click the link to confirm your [project name] account and email.
      </p>
      <h3 className='font-bold my-4'>No email found?</h3>
      <p>
        If you did not receive an email with a confirmation link please check
        your spam folder or wait a couple of minutes.
      </p>
      <p>
        Still no email?{' '}
        <Link href='/confirmation/newrequest' className='underline'>
          Request a new confirmation email.
        </Link>
      </p>
    </div>
  );
}
