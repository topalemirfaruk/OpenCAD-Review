import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                (session.user as { id?: string }).id = token.sub;
            }
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.provider = account.provider;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // After login, redirect to /viewer
            if (url.startsWith(baseUrl)) return url;
            return baseUrl + '/viewer';
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
