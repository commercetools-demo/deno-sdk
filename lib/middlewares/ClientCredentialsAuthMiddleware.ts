import type { AuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2@latest/dist/declarations/src/types/sdk.d.ts"
import type { iConfig } from "../interface/iConfig.ts"

export const ClientCredentialsAuthMiddleware = (
	config: iConfig,
): AuthMiddlewareOptions => {
	return {
		credentials: {
			clientId: config.client_id,
			clientSecret: config.client_secret,
		},
		host: config.auth_url,
		projectKey: config.project_key,
		fetch: fetch,
	}
}
