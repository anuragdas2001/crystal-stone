import './config/load-env';
import type { NextFunction, Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import { AppModule } from './app.module';
import { createAuth } from './auth/auth.factory';
import { getAuthEnv } from './config/auth-env';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const env = getAuthEnv();
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

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

  await app.listen(env.port);
}
void bootstrap();
