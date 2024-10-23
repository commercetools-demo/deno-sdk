//import type { RefreshAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2@latest/dist/declarations/src/types/sdk.d.ts"
import type { RefreshAuthMiddlewareOptions } from "@commercetools/ts-client"

import type { iConfig } from "../interface/iConfig.ts"
import type { iOptions } from "../interface/isdk.ts"

export const refreshAuthMiddleware = (
	config: iConfig,
	options: iOptions,
): RefreshAuthMiddlewareOptions => {
	return {
		credentials: {
			clientId: config.client_id,
			clientSecret: config.client_secret,
		},
		refreshToken: options.anonymous?.refresh_token!,
		host: config.auth_url,
		projectKey: config.project_key,
		httpClient: fetch,
	}
}
