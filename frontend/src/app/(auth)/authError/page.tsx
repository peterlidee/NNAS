type Props = {
  searchParams: {
    error?: string;
  };
};

export default function AuthErrorPage({ searchParams }: Props) {
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
      AuthError: {searchParams.error}
    </div>
  );
}
