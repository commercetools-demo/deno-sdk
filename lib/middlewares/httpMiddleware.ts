import type { HttpMiddlewareOptions } from "npm:@commercetools/sdk-client-v2@latest/dist/declarations/src/types/sdk.d.ts"
import type { iConfig } from "../interface/iConfig.ts"

export const apiHttpMiddleware = (config: iConfig): HttpMiddlewareOptions => {
	return {
		host: config.api_url,
		fetch: fetch,
	}
}

export const importapiHttpMiddleware = (
	config: iConfig,
): HttpMiddlewareOptions => {
	return {
		host: config.import_url!,
		fetch: fetch,
	}
}
