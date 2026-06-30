export type AuthEnv = {
  apiBaseUrl: string;
  port: number;
  secret: string;
  trustedOrigins: string[];
  google?: {
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
    process.env.BETTER_AUTH_URL ?? `http://localhost:${port}`,
  );
  const webOrigin = normalizeOrigin(
    process.env.WEB_ORIGIN ?? DEFAULT_WEB_ORIGIN,
  );
  const secret = process.env.BETTER_AUTH_SECRET ?? DEV_AUTH_SECRET;
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  assertProductionEnv('DATABASE_URL', process.env.DATABASE_URL);
  assertProductionEnv('BETTER_AUTH_SECRET', process.env.BETTER_AUTH_SECRET);
  assertProductionEnv('GOOGLE_CLIENT_ID', googleClientId);
  assertProductionEnv('GOOGLE_CLIENT_SECRET', googleClientSecret);

  if (Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    throw new Error(
      'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured together',
    );
  }

  return {
    apiBaseUrl,
    port,
    secret,
    trustedOrigins: Array.from(
      new Set([
        webOrigin,
        'https://*.vercel.app',
        'http://localhost:*',
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
  };
}
