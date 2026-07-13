import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export function middleware(req: Parameters<typeof auth>[0]) {
  return auth(req);
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
