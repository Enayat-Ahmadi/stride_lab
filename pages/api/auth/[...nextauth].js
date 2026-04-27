import _NextAuth from "next-auth";
import _GitHubProvider from "next-auth/providers/github";
import _GoogleProvider from "next-auth/providers/google";

const NextAuth = _NextAuth.default ?? _NextAuth;
const GitHubProvider = _GitHubProvider.default ?? _GitHubProvider;
const GoogleProvider = _GoogleProvider.default ?? _GoogleProvider;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      const adminEmails = (process.env.ADMIN_EMAILS || "").split(",");
      if (account && profile) {
        token.id = profile.id?.toString();
        token.role = adminEmails.includes(profile.email) ? "admin" : "user";
        token.login = profile.login || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.login = token.login;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
