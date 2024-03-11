import { StrapiErrorT } from '@/types/strapi/StrapiError';
import { StrapiLoginResponseT } from '@/types/strapi/User';
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
    async jwt({ token, trigger, account, user, session }) {
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   account,
      //   user,
      //   session,
      // });

      if (account) {
        if (account.provider === 'google') {
          // we now know we are doing a sign in using GoogleProvider
          try {
            const strapiResponse = await fetch(
              `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            );
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json();
            // customize token
            // name and email will already be on here
            token.strapiToken = strapiLoginResponse.jwt;
          } catch (error) {
            console.error('strapi error', error);
            throw error;
          }
        }
      }

      return token;
    },
    async session({ token, session }) {
      // console.log('session callback', {
      //   token,
      //   session,
      // });
      session.strapiToken = token.strapiToken;
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
