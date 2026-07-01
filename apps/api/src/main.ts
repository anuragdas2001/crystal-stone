import './config/load-env';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextFunction, Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { toNodeHandler } from 'better-auth/node';
import express from 'express';
import { AppModule } from './app.module';
import { createAuth } from './auth/auth.factory';
import { getAuthEnv } from './config/auth-env';
import { PrismaService } from './prisma/prisma.service';

const server = express();
let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  const env = getAuthEnv();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { bodyParser: false },
  );

  app.enableCors({
    credentials: true,
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (
        !origin ||
        origin === 'https://crystal-stone-web-v1.vercel.app' ||
        origin.endsWith('.vercel.app') ||
        origin.startsWith('http://localhost:') ||
        env.trustedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
  });

  const auth = createAuth(app.get(PrismaService));
  const authHandler = toNodeHandler(auth.handler);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const urlPath = (req.originalUrl || req.url || '').split('?')[0];
    const isAuthRoute =
      urlPath === '/api/auth' || urlPath.startsWith('/api/auth/');

    if (!isAuthRoute) {
      next();
      return;
    }

    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With',
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
    }

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    if (req.originalUrl && !req.url.startsWith('/api/auth')) {
      req.url = req.originalUrl;
    }

    void Promise.resolve(authHandler(req, res)).catch(next);
  });

  await app.init();
  cachedApp = app;
  return cachedApp;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  await bootstrap();
  server(req, res);
}

if (!process.env.VERCEL) {
  bootstrap().then(() => {
    const port = getAuthEnv().port || 3001;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
}

