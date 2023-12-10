import { NextFunction, Response, Request } from "express";
import { logger } from "./logger";
import hkdf from "@panva/hkdf";
import { jwtDecrypt } from "jose";

/**
 * Represents a user session.
 */
export type UserSession = {
  id: string;
  image: string;
  name: string;
  email: string;
};

/**
 * Represents an authenticated request object.
 * Extends the base Request interface from Express.
 * The user property is optional and contains the user session information.
 */
export interface AuthenticatedRequest extends Request {
  user?: UserSession;
}

/**
 * Middleware function that checks if the request is authenticated.
 * If the request is authenticated, it attaches the user information to the request object.
 * If the request is not authenticated, it sends a 401 Unauthorized response.
 * If the authentication token is invalid, it sends a 403 Forbidden response.
 * @param req - The authenticated request object.
 * @param res - The response object.
 * @param next - The next function to call in the middleware chain.
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  decode(token)
    .then((user) => {
      req.user = toSession(user);
      next();
    })
    .catch((err) => {
      logger.warning("Failed to decode token: ", err);
      return res.sendStatus(403);
    });
}

function toSession(object: any): UserSession {
  return {
    id: object.sub,
    image: object.picture,
    name: object.name,
    email: object.email,
  };
}

/**
 * Represents a key passport object.
 */
type KeyPassport = {
  secret: Uint8Array | undefined;
  getSecret: () => Promise<Uint8Array>;
};

const keyPassport: KeyPassport = {
  secret: undefined,
  /**
   * Produces the secret key for encryption.
   * If the secret key is not already generated, it generates it using the hkdf function.
   * @returns A promise that resolves to the secret key.
   */
  getSecret: async () => {
    if (keyPassport.secret == undefined) {
      const salt = process.env.NEXTAUTH_SALT as string;
      const secret = process.env.NEXTAUTH_SECRET as string;

      keyPassport.secret = await hkdf(
        "sha256",
        secret,
        salt,
        `Auth.js Generated Encryption Key (${salt})`,
        32
      );
    }
    return keyPassport.secret;
  },
};

export async function decode(token: string) {
  const encryptionSecret = await keyPassport.getSecret();
  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15,
  });
  return payload;
}
