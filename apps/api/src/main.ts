import "./config/load-env";

import type { IncomingMessage, ServerResponse } from "http";
import type { NextFunction, Request, Response } from "express";
import express from "express";

import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { createAuth } from "./auth/auth.factory";
import { getAuthEnv } from "./config/auth-env";
import { PrismaService } from "./prisma/prisma.service";

const server = express();

let appInstance: Awaited<ReturnType<typeof NestFactory.create>> | null = null;

async function bootstrap() {
  if (appInstance) {
    return appInstance;
  }

  const env = getAuthEnv();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    {
      bodyParser: false,
    },
  );

  const expressApp = app.getHttpAdapter().getInstance();

  /**
   * Required behind Render/Vercel reverse proxy.
   */
  expressApp.set("trust proxy", 1);

  /**
   * Global CORS
   */
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:3000",
        "https://crystal-stone-web-v1.vercel.app",
        ...env.trustedOrigins,
      ];
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  });

  /**
   * Better Auth
   */
  const auth = await createAuth(app.get(PrismaService));
  const { toNodeHandler } = await import("better-auth/node");
  const authHandler = toNodeHandler(auth.handler);

  /**
   * Forward every /api/auth request to Better Auth.
   */
  server.use(
    "/api/auth",
    (req: Request, res: Response, next: NextFunction) => {
      console.log(`[API Auth] 🚀 Incoming ${req.method} ${req.url} | Origin: ${req.headers.origin || "none"} | Cookies present: ${!!req.headers.cookie}`);
      if (req.headers.cookie) {
        console.log(`[API Auth] 🍪 Cookie header keys:`, req.headers.cookie.split(";").map((c) => c.trim().split("=")[0]).join(", "));
      }
      Promise.resolve(authHandler(req, res)).catch(next);
    },
  );

  await app.init();

  appInstance = app;

  console.log("✅ API Base URL:", env.apiBaseUrl);
  console.log("✅ Trusted Origins:", env.trustedOrigins);

  return app;
}

/**
 * Render / Vercel entrypoint
 */
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    await bootstrap();
    server(req, res);
  } catch (err: any) {
    console.error("❌ Fatal Vercel Serverless Crash during bootstrap:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify(
        {
          error: "Vercel Serverless Function Bootstrap Crash",
          message: err?.message || String(err),
          stack: err?.stack,
        },
        null,
        2,
      ),
    );
  }
}

/**
 * Local & Container development
 */
if (!process.env.VERCEL) {
  bootstrap().then(() => {
    const { port } = getAuthEnv();

    server.listen(port, "0.0.0.0", () => {
      console.log(`🚀 API running and listening on 0.0.0.0:${port}`);
    });
  });
}