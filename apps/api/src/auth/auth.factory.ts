import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { phoneNumber } from 'better-auth/plugins';
import { getAuthEnv } from '../config/auth-env';
import { sendSmsOtp } from './sms.service';

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
    user: {
      additionalFields: {
        firstName: { type: "string", required: false },
        lastName: { type: "string", required: false },
      },
    },
    advanced: {
      useSecureCookies: env.apiBaseUrl.startsWith("https://"),
      defaultCookieAttributes: {
        sameSite: env.apiBaseUrl.startsWith("https://") ? "none" : "lax",
        secure: env.apiBaseUrl.startsWith("https://"),
        partitioned: env.apiBaseUrl.startsWith("https://"),
      },
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "linkedin"],
      },
    },

    emailAndPassword: {
      enabled: false,
    },

    socialProviders:
      env.google || env.linkedin
        ? {
          ...(env.google && {
            google: {
              ...env.google,
              prompt: "select_account",
            },
          }),
          ...(env.linkedin && {
            linkedin: {
              ...env.linkedin,
            },
          }),
        }
        : undefined,

    plugins: [
      phoneNumber({
        otpLength: 6,
        sendOTP: async ({ phoneNumber, code }) => {
          await sendSmsOtp(phoneNumber, code);
        },
        signUpOnVerification: {
          getTempEmail: (phone) =>
            `${phone.replace(/[^0-9]/g, '')}@temp.crystalstone.portal`,
        },
        callbackOnVerification: async ({ user }, ctx) => {
          if (ctx && ctx.body) {
            const body = ctx.body as Record<string, any>;
            const { firstName, lastName, email } = body;
            const updates: Record<string, any> = {};
            if (firstName !== undefined) updates.firstName = firstName;
            if (lastName !== undefined) updates.lastName = lastName;
            if (firstName || lastName) {
              const u = user as any;
              updates.name = [
                firstName || u.firstName,
                lastName || u.lastName,
              ]
                .filter(Boolean)
                .join(' ');
            }
            if (email && typeof email === 'string' && email.includes('@')) {
              updates.email = email;
            }

            if (Object.keys(updates).length > 0) {
              await ctx?.context?.internalAdapter?.updateUser(
                user.id,
                updates,
              );
            }
          }
        },
      }),
    ],
  });
}
