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
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (
        !origin ||
        env.trustedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.startsWith('http://localhost:')
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
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

    void Promise.resolve(authHandler(req, res)).catch(next);
  });

  await app.listen(env.port);
}
void bootstrap();
