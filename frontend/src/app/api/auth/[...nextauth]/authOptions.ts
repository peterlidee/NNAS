import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, profile, user, session }) {
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   profile,
      //   user,
      //   session,
      // });
      return token;
    },
    async session({ token, session }) {
      // console.log('session callback', {
      //   token,
      //   session,
      // });
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
