import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { authDatabase, mongoClient } from "./mongodb";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  appName: "BookNook",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "booknook-development-secret-change-in-production",
  database: mongodbAdapter(authDatabase, { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : undefined,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    database: { joins: true },
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  plugins: [jwt()],
});
