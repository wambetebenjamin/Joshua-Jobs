import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const providers: any[] = [];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: { signIn: '/login' },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'joshua-jobs-local-development-only-secret' : undefined),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token }: any) {
      if (token.email && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          const url = process.env.KV_REST_API_URL.replace(/\/$/, '');
          const key = encodeURIComponent(`account:${token.email.toLowerCase()}`);
          const response = await fetch(`${url}/get/${key}`, {
            headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
            cache: 'no-store',
          });
          const data = await response.json();
          let profile = data.result;
          if (typeof profile === 'string') profile = JSON.parse(profile);
          if (profile?.role) token.role = profile.role;
        } catch {
          // Keep account role unavailable if the profile store is temporarily unreachable.
        }
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
} as any);
