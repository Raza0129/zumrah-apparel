import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma/bcrypt here) — used by middleware for route protection.
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      if (nextUrl.pathname.startsWith("/admin")) {
        return isLoggedIn && role === "ADMIN";
      }
      if (nextUrl.pathname.startsWith("/account")) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "CUSTOMER" | "ADMIN";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
