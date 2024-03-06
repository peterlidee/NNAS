import Link from 'next/link';

export default async function NavBar() {
  return (
    <nav className='flex gap-4 items-center my-4 p-4 bg-zinc-100 rounded-sm'>
      <Link href='/' className='mr-auto'>
        home
      </Link>
    </nav>
  );
}
