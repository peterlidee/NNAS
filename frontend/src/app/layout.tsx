import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/header/Navbar';

// import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={`${inter.className}  px-2 bg-zinc-200`}>
        <Provider session={session}>
          <div className='max-w-6xl mx-auto'>
            <NavBar />
            <main className='my-4'>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
