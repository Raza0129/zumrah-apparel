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

      if (nextUrl.pathname.startsWith("/admin")) {
        // Handled entirely in admin/layout.tsx, which renders its own
        // admin login form instead of bouncing to the customer /login page.
        return true;
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
