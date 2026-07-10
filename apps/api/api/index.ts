import type { IncomingMessage, ServerResponse } from "http";

// Import the pre-compiled NestJS Express handler from dist/main after `nest build` runs during Vercel build
import handler from "../dist/main";

export default async function vercelServerlessHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    return await handler(req, res);
  } catch (err: any) {
    console.error("❌ Fatal Vercel Serverless Crash during invocation:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify(
        {
          error: "Vercel Serverless Function Invocation Crash",
          message: err?.message || String(err),
          stack: err?.stack,
        },
        null,
        2,
      ),
    );
  }
}
