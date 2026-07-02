export type AuthEnv = {
  apiBaseUrl: string;
  port: number;
  secret: string;
  trustedOrigins: string[];
  google?: {
    clientId: string;
    clientSecret: string;
  };
  linkedin?: {
    clientId: string;
    clientSecret: string;
  };
};

const DEFAULT_API_PORT = 3001;
const DEFAULT_WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:3000';
const DEV_AUTH_SECRET = 'dev-only-better-auth-secret-change-before-production';

function normalizeOrigin(origin: string) {
  return origin.trim().replace(/\/$/, '');
}

function splitOrigins(value?: string) {
  return value ? value.split(',').map(normalizeOrigin).filter(Boolean) : [];
}

function parsePort(value?: string) {
  if (!value) {
    return DEFAULT_API_PORT;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return port;
}

function assertProductionEnv(
  key: string,
  value: string | undefined,
): asserts value is string {
  if (process.env.NODE_ENV === 'production' && !value) {
    throw new Error(`${key} is required in production`);
  }
}

export function getAuthEnv(): AuthEnv {
  const port = parsePort(process.env.PORT);
  const apiBaseUrl = normalizeOrigin(
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${port}`),
  );
  const webOrigin = normalizeOrigin(
    process.env.WEB_ORIGIN ?? DEFAULT_WEB_ORIGIN,
  );
  const secret = process.env.BETTER_AUTH_SECRET ?? DEV_AUTH_SECRET;
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  // Note: Restart the API dev server after updating credentials in .env
  const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
  const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not set.');
  }

  if (Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    console.warn(
      'WARNING: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET should be configured together.',
    );
  }

  if (Boolean(linkedinClientId) !== Boolean(linkedinClientSecret)) {
    console.warn(
      'WARNING: LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET should be configured together.',
    );
  }

  return {
    apiBaseUrl,
    port,
    secret,
    trustedOrigins: Array.from(
      new Set([
        webOrigin,
        ...splitOrigins(process.env.BETTER_AUTH_TRUSTED_ORIGINS),
      ]),
    ),
    google:
      googleClientId && googleClientSecret
        ? {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        }
        : undefined,
    linkedin:
      linkedinClientId && linkedinClientSecret
        ? {
          clientId: linkedinClientId,
          clientSecret: linkedinClientSecret,
        }
        : undefined,
  };
}
