import { NextRequest } from "next/server";

export interface AuthRequest extends Request {
  auth: Session;
}

export interface AuthNextRequest extends NextRequest {
  auth: Session;
}
