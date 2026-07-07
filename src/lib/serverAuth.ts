import "server-only";

import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getServerAccessToken(
  request: NextRequest,
): Promise<string | null> {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.accessToken ?? null;
}
