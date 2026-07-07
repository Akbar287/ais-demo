import type { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

type KeycloakClaims = {
  realm_access?: {
    roles?: string[];
  };
};

function readRoles(accessToken?: string): string[] {
  if (!accessToken) return [];

  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return [];

    const claims = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as KeycloakClaims;

    return claims.realm_access?.roles ?? [];
  } catch {
    return [];
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
      issuer: process.env.KEYCLOAK_ISSUER ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.roles = readRoles(account.access_token);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles ?? [];
      }

      // accessToken intentionally stays in the encrypted next-auth JWT cookie.
      return session;
    },
  },
};
