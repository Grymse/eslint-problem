import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mailer from "@repo/mailer";
import type { NextAuthConfig, NextAuthResult } from "next-auth";
import { getNameFromEmail } from "@repo/ui/lib/formatters/names";
import { DefaultSession } from "next-auth";
import { Validate, emailValidator } from "@repo/utility/src/io/validators";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const config: NextAuthConfig = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token?.sub || "undefined" },
    }),
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Email provider
    {
      id: "email",
      type: "email",
      maxAge: 24 * 60 * 60, // 24 hours,
      name: "Email",
      server: "",
      from: "",
      options: {},
      sendVerificationRequest({ identifier: email, url }) {
        mailer.templates.user.sendMagicLink(
          getNameFromEmail(email),
          email,
          url
        );
      },
      normalizeIdentifier(identifier: string): string {
        const error = Validate(emailValidator)(identifier);
        if (error) {
          throw new Error(error);
        }

        let [local, domain] = identifier.toLowerCase().trim().split("@");
        // The part before "@" can contain a ","
        // but we remove it on the domain part
        domain = domain.split(",")[0];
        return `${local}@${domain}`;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
    newUser: "/new-user",
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut }: NextAuthResult =
  NextAuth(config);
