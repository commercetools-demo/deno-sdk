import { AnonymousAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2/dist/declarations/src/types/sdk.d.ts"
import { iConfig } from "../interface/iConfig.ts"
import { iOptions } from "../interface/isdk.ts"

export const anonymousAuthMiddleware = (
	config: iConfig,
	options: iOptions,
): AnonymousAuthMiddlewareOptions => {
	return {
		credentials: {
			clientId: config.client_id,
			clientSecret: config.client_secret,
			anonymousId: options.anonymous!.anonymous_id,
		},
		host: config.auth_url,
		projectKey: config.project_key,
		fetch: fetch,
	}
}
