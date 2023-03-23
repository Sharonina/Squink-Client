import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyLogin, createUser } from "@/utils/api/auth"; // Create these utility functions

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials?: Record<"email" | "password", string>) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const user = await verifyLogin(credentials.email, credentials.password);
        if (user) {
          return {
            id: user.token,
            token: user.token,
            exp: user.exp,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account }) {
      if ((account?.type ?? "") === "credentials" && !user) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.token = user.token;
        token.customExp = user.exp;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.token = token.token;
      session.expires = token.customExp;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
});
