import type { iConfig } from "./interface/iConfig.ts"
//import { ClientBuilder } from "npm:@commercetools/sdk-client-v2@latest"
import { ClientBuilder } from "@commercetools/ts-client"
import {
	type ApiRoot,
	createApiBuilderFromCtpClient,
	//} from "npm:@commercetools/importapi-sdk@latest"
} from "@commercetools/importapi-sdk"
import { loglevel } from "./interface/iLogger.ts"
import { importapiHttpMiddleware } from "./middlewares/httpMiddleware.ts"
import { ClientCredentialsAuthMiddleware } from "./middlewares/ClientCredentialsAuthMiddleware.ts"
import { userAgentMiddleware } from "./middlewares/userAgentMiddleware.ts"
//export { ApiRoot } from "npm:@commercetools/importapi-sdk@latest"
export { ApiRoot } from "@commercetools/importapi-sdk"

export class importClient {
	protected _config: iConfig
	protected _projectKey: string
	protected _verbose: loglevel

	constructor(config: iConfig, verbose: loglevel = loglevel.quiet) {
		this._config = config
		this._projectKey = config.project_key
		this._verbose = verbose
	}

	public withClientCredentials(): ApiRoot {
		if (this._verbose === loglevel.verbose) {
			const client = new ClientBuilder()
				.withProjectKey(this._projectKey)
				.withClientCredentialsFlow(
					ClientCredentialsAuthMiddleware(this._config),
				)
				.withHttpMiddleware(importapiHttpMiddleware(this._config))
				.withLoggerMiddleware()
				.withUserAgentMiddleware(userAgentMiddleware)
				.build()
			return createApiBuilderFromCtpClient(client)
		}
		const client = new ClientBuilder()
			.withProjectKey(this._projectKey)
			.withClientCredentialsFlow(
				ClientCredentialsAuthMiddleware(this._config),
			)
			.withHttpMiddleware(importapiHttpMiddleware(this._config))
			.withUserAgentMiddleware(userAgentMiddleware)
			.build()
		return createApiBuilderFromCtpClient(client)
	}
}
