//import type { HttpMiddlewareOptions } from "npm:@commercetools/sdk-client-v2@latest/dist/declarations/src/types/sdk.d.ts"
import type { HttpMiddlewareOptions } from "@commercetools/ts-client"

import type { iConfig } from "../interface/iConfig.ts"

export const apiHttpMiddleware = (config: iConfig): HttpMiddlewareOptions => {
	return {
		host: config.api_url,
		httpClient: fetch,
	}
}

export const importapiHttpMiddleware = (
	config: iConfig,
): HttpMiddlewareOptions => {
	return {
		host: config.import_url!,
		httpClient: fetch,
	}
}
