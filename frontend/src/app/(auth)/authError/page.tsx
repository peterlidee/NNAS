type Props = {
  searchParams: {
    error?: string;
  };
};

export default function AuthErrorPage({ searchParams }: Props) {
  return (
    <div className='bg-zinc-100 rounded-sm p-4 mb-4'>
      AuthError: {searchParams.error}
    </div>
  );
}
