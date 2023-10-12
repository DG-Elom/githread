import GithubProvider from "next-auth/providers/github";
import { env } from "./env";
import { AuthOptions, getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { get } from "http";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        console.log("PROFILE DATA:", { profile });
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = getServerSession(authOptions);
  return session;
};
