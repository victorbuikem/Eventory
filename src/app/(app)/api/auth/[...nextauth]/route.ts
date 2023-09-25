import NextAuth, { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/server/prisma";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: <Adapter>PrismaAdapter(prisma),
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
};

const handler = NextAuth(authOptions);

export function getAuthSession() {
  return getServerSession(authOptions);
}

export { handler as GET, handler as POST };
