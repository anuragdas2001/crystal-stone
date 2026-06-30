import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { getAuthEnv } from '../config/auth-env';

export function createAuth(prisma: PrismaClient) {
  const env = getAuthEnv();

  return betterAuth({
    appName: 'Crystal Stone',
    baseURL: env.apiBaseUrl,
    secret: env.secret,
    trustedOrigins: env.trustedOrigins,
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['google'],
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
            prompt: 'select_account',
          },
        }
      : undefined,
  });
}
