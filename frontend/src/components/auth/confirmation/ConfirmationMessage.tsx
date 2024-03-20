export default function ConfirmationMessage() {
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
      <h2 className='font-bold text-lg mb-4'>Please confirm your email.</h2>
      <p>
        We sent you an email with a confirmation link. Please open this email
        and click the link to confirm your [project name] account and email.
      </p>
    </div>
  );
}
