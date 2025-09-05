import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import { account, session, user, verification } from "../db/schema/auth.schema";
import { magicLink } from "better-auth/plugins/magic-link";
import { Resend } from "resend";
import { env } from "@/config/env.server";
import { env as ENV_CLIENT } from "@/config/env.client";
import { UserRoleEnumSchema } from "@/types/enums/UserRoleEnum";

const resend = new Resend(env.RESEND_API_KEY);
const isProd = ENV_CLIENT.NEXT_PUBLIC_BASE_URL.startsWith("https://");

function getRootDomain(hostname: string) {
	const parts = hostname.split(".");
	return parts.length <= 2 ? `.${hostname}` : `.${parts.slice(-2).join(".")}`;
}
const hostname = ENV_CLIENT.NEXT_PUBLIC_BASE_URL.replace(
	/^https?:\/\//,
	"",
).split("/")[0];
const cookieDomain = isProd ? getRootDomain(hostname) : undefined;

const auth = betterAuth({
	advanced: {
		useSecureCookies: isProd,
		crossSubDomainCookies: {
			enabled: isProd,
			domain: cookieDomain,
		},
		defaultCookieAttributes: {
			sameSite: isProd ? "none" : "lax",
			secure: isProd,
			partitioned: isProd,
			domain: cookieDomain,
		},
	},
	trustedOrigins: [ENV_CLIENT.NEXT_PUBLIC_BASE_URL],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: user,
			account: account,
			session: session,
			verification: verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	plugins: [
		magicLink({
			disableSignUp: true,
			sendMagicLink: async ({ email, url }, _request) => {
				try {
					const magicLinkHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <h2 style="color: #333;">Hello 👋</h2>
            <p>Sign in to your <strong>PAP Con 2025</strong> account by clicking the button below:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${url}" 
                 style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Sign In
              </a>
            </p>
            <p style="color: #555; font-size: 14px;">
              This link will expire in 15 minutes. If you did not request this, you can safely ignore this email.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              PAP Con 2025
            </p>
          </div>
        `;

					await resend.emails.send({
						from: env.RESEND_FROM_EMAIL,
						to: email,
						subject: "PAP Con 2025: Your Sign-In Link",
						html: magicLinkHtml,
					});

					console.log(`Magic link sent to ${email}`);
				} catch (error) {
					console.error(`Failed to send magic link to ${email}`, error);
					throw error;
				}
			},
		}),
	],
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: UserRoleEnumSchema.Enum.USER,
				input: true,
			},
			hasClaimedKit: {
				type: "boolean",
				required: true,
				defaultValue: false,
				input: true,
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;
export type AuthInstance = ReturnType<typeof betterAuth>;
export interface AuthSessionData {
	user: Session["user"] | null;
	session: Session["session"] | null;
}

export default { auth };
