import { PasswordAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2/dist/declarations/src/types/sdk.d.ts"
import { iConfig } from "../interface/iConfig.ts"
import { iOptions } from "../interface/isdk.ts"

export const passwordflowAuthMiddleware = (
	config: iConfig,
	options: iOptions,
): PasswordAuthMiddlewareOptions => {
	return {
		credentials: {
			clientId: config.client_id,
			clientSecret: config.client_secret,
			user: {
				username: options.passwordflow!.email,
				password: options.passwordflow!.password,
			},
		},
		host: config.auth_url,
		projectKey: config.project_key,
		fetch: fetch,
	}
}
