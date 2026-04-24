import _NextAuth from "next-auth";
import _GitHubProvider from "next-auth/providers/github";

const NextAuth = _NextAuth.default ?? _NextAuth;
const GitHubProvider = _GitHubProvider.default ?? _GitHubProvider;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
      if (account && profile) {
        token.id = profile.id?.toString();
        token.login = profile.login;
        token.role = profile.login === "Enayat-Ahmadi" ? "admin" : "user";
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