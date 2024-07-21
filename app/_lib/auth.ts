import NextAuth, { Session, User } from 'next-auth'

import Google from "next-auth/providers/google";
import { createGuest, getGuest } from './data-service';

import { AdapterUser } from 'next-auth/adapters';

const authConfig = {
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const existingGuest = await getGuest(user.email as string)

        if (!existingGuest) {
          await createGuest({
            email: user.email as string,
            fullName: user.name as string,
          })
        }

        return true
      } catch {
        return false
      }
    },
    async session({ session }: { session: { user: AdapterUser } }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest!.id;

      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
}


export const { signIn, signOut, auth, handlers: { GET, POST } } = NextAuth(authConfig)
