import { json, urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import { loggingMiddleware } from "./logger";
import { AuthenticatedRequest, requireAuth } from "./auth";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(loggingMiddleware)
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/protected", requireAuth, (req: AuthenticatedRequest, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
