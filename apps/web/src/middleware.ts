import { NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";
import { AuthNextRequest } from "./lib/auth/types";

export const middleware = auth((req: AuthNextRequest) => {
  const path = req.nextUrl.pathname;

  let isAuth = req.auth !== null;
  const isAuthPage = path.startsWith("/login");

  if (!isAuthPage && !isAuth) {
    let from = path;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
    );
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
