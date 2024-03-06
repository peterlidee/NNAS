import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/header/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}  px-2 bg-zinc-200`}>
        <div className='max-w-6xl mx-auto'>
          <NavBar />
          <main className='my-4'>{children}</main>
        </div>
      </body>
    </html>
  );
}
