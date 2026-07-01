import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { getAuthEnv } from '../config/auth-env';

export function createAuth(prisma: PrismaClient) {
  const env = getAuthEnv();

  return betterAuth({
    appName: "Crystal Stone",
    baseURL: env.apiBaseUrl,
    secret: env.secret,
    trustedOrigins: env.trustedOrigins,

    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    advanced: {
      useSecureCookies: true,
      defaultCookieAttributes: {
        sameSite: "none",   // REQUIRED — cross-domain cookies are blocked by "lax" (default)
        secure: true,        // REQUIRED when sameSite is "none"
        partitioned: true,   // needed for Chrome's CHIPS / third-party cookie changes
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
      },
    },

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      requireEmailVerification: false,
    },

    socialProviders: env.google
      ? {
        google: {
          ...env.google,
          prompt: "select_account",
        },
      }
      : undefined,
  });
}
