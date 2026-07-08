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
        // NOTE: LinkedIn does not expose headline / current job title / company
        // through the standard Sign In with LinkedIn (OIDC) product you're using.
        // The only LinkedIn scope that returns current work experience is
        // r_primary_current_experience, which belongs to the "Verified on LinkedIn"
        // identity-verification product and is gated behind their paid Plus tier —
        // it's meant for identity checks, not general profile enrichment.
        // These fields are left here so they can be populated either by:
        //   1) the user self-reporting after signup, or
        //   2) Google People API's `organizations` field (see getUserInfo below)
        headline: { type: "string", required: false },
        currentTitle: { type: "string", required: false },
        currentCompany: { type: "string", required: false },
      },
    },
    advanced: {
      useSecureCookies: env.apiBaseUrl.startsWith("https://"),
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: false,
      },
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
      },
    },
    account: {
      storeStateStrategy: "database",
      skipStateCookieCheck: true,
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
              scope: [
                "openid",
                "email",
                "profile",
                "https://www.googleapis.com/auth/user.phonenumbers.read",
                // Requesting this lets People API return `organizations`
                // (current job title + company), which is the closest
                // realistic equivalent to "current work experience" available
                // via social login without a paid partner API.
                "https://www.googleapis.com/auth/user.organization.read",
              ],
              getUserInfo: async (token) => {
                const res = await fetch(
                  "https://www.googleapis.com/oauth2/v3/userinfo",
                  {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                  },
                );
                const profile = (await res.json()) as Record<string, any>;

                let phoneNumber: string | undefined;
                let currentTitle: string | undefined;
                let currentCompany: string | undefined;

                try {
                  const peopleRes = await fetch(
                    "https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,organizations",
                    {
                      headers: { Authorization: `Bearer ${token.accessToken}` },
                    },
                  );
                  const peopleData = (await peopleRes.json()) as Record<string, any>;
                  console.log(
                    "[Auth] Google People API Raw Response:",
                    JSON.stringify(peopleData, null, 2),
                  );
                  if (peopleData?.phoneNumbers?.length > 0) {
                    phoneNumber =
                      peopleData.phoneNumbers[0].canonicalForm ||
                      peopleData.phoneNumbers[0].value;
                  }

                  // organizations[] is ordered; entries without an `endDate`
                  // represent current employment. Fall back to the first entry
                  // if none are explicitly marked current.
                  const orgs = peopleData?.organizations as Array<Record<string, any>> | undefined;
                  if (orgs?.length) {
                    const current = orgs.find((o) => !o.endDate) ?? orgs[0];
                    currentTitle = current?.title || undefined;
                    currentCompany = current?.name || undefined;
                  }
                } catch (err) {
                  console.error(
                    "[Auth] Failed to fetch phone number / organization from Google People API:",
                    err,
                  );
                }

                console.log(
                  "[Auth] Google Social Login - User Profile:",
                  JSON.stringify(profile, null, 2),
                );
                if (phoneNumber) {
                  console.log(
                    "[Auth] Google Social Login - Phone Number:",
                    phoneNumber,
                  );
                }
                if (currentTitle || currentCompany) {
                  console.log(
                    "[Auth] Google Social Login - Current Role:",
                    currentTitle,
                    currentCompany,
                  );
                }

                return {
                  user: {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    phoneNumber: phoneNumber || undefined,
                    phoneNumberVerified: !!phoneNumber,
                    currentTitle: currentTitle || undefined,
                    currentCompany: currentCompany || undefined,
                  },
                  data: profile,
                };
              },
            },
          }),
          ...(env.linkedin && {
            linkedin: {
              ...env.linkedin,
              scope: ["openid", "profile", "email"],
              // If you later get approved for LinkedIn's "Verified on LinkedIn"
              // Plus tier, add "r_primary_current_experience" here and fetch
              // https://api.linkedin.com/v2/identityMe (3-legged OAuth) inside
              // mapProfileToUser to populate currentTitle / currentCompany.
              // Until then, LinkedIn cannot supply this data.
              mapProfileToUser: async (profile) => {
                console.log(
                  "[Auth] LinkedIn Social Login - User Profile:",
                  JSON.stringify(profile, null, 2),
                );
                return {
                  firstName: profile.given_name,
                  lastName: profile.family_name,
                };
              },
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
            const { firstName, lastName, email, headline, currentTitle, currentCompany } = body;
            const updates: Record<string, any> = {};
            if (firstName !== undefined) updates.firstName = firstName;
            if (lastName !== undefined) updates.lastName = lastName;
            if (headline !== undefined) updates.headline = headline;
            if (currentTitle !== undefined) updates.currentTitle = currentTitle;
            if (currentCompany !== undefined) updates.currentCompany = currentCompany;
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