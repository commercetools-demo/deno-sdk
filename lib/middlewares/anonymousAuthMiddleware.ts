//import type { AnonymousAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2@latest/dist/declarations/src/types/sdk.d.ts"
import type { AuthMiddlewareOptions } from "@commercetools/ts-client"
import type { iConfig } from "../interface/iConfig.ts"
import type { iOptions } from "../interface/isdk.ts"

export const anonymousAuthMiddleware = (
	config: iConfig,
	options: iOptions,
): AuthMiddlewareOptions => {
	return {
		credentials: {
			clientId: config.client_id,
			clientSecret: config.client_secret,
			anonymousId: options.anonymous!.anonymous_id,
		},
		host: config.auth_url,
		projectKey: config.project_key,
		httpClient: fetch,
	}
}
