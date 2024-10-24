import type { iConfig } from "../interface/iConfig.ts"
import { ClientBuilder } from "@commercetools/ts-client"
import {
	type ApiRoot,
	createApiBuilderFromCtpClient,
} from "@commercetools/importapi-sdk"
import { loglevel } from "../interface/iLogger.ts"
import { importapiHttpMiddleware } from "../middlewares/httpMiddleware.ts"
import { ClientCredentialsAuthMiddleware } from "../middlewares/ClientCredentialsAuthMiddleware.ts"
import { userAgentMiddleware } from "../middlewares/userAgentMiddleware.ts"
export { ApiRoot } from "@commercetools/importapi-sdk"

/** @ignore hide from documentation */
export class importClient {
	/** @ignore hide from documentation */
	protected _config: iConfig
	/** @ignore hide from documentation */
	protected _projectKey: string
	/** @ignore hide from documentation */
	protected _verbose: loglevel

	/** @ignore hide from documentation */
	constructor(config: iConfig, verbose: loglevel = loglevel.quiet) {
		this._config = config
		this._projectKey = config.project_key
		this._verbose = verbose
	}

	/** @ignore hide from documentation */
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
