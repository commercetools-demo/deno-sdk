import type { iConfig } from "./interface/iConfig.ts"
import { loglevel } from "./interface/iLogger.ts"
import type { isdk } from "./interface/isdk.ts"
import type { ByProjectKeyRequestBuilder } from "npm:@commercetools/importapi-sdk@latest/dist/declarations/src/generated/client/by-project-key-request-builder"
import { Config } from "./Config.ts"
import { basesdk } from "./abstract/basesdk.ts"
import type { ApiRoot as importRoot } from "./importClient.ts"
import { importClient } from "./importClient.ts"
import { checkPermissions } from "./permissions.ts"

export class importsdk extends basesdk implements isdk {
	private static instance: importsdk
	private constructor(config: iConfig, apiRoot: importRoot) {
		super(config, apiRoot)
	}

	/**
	 * Get a sdk client, will initialise from .env file,
	 * @param {loglevel} [verbose]
	 * @param {iConfig} [manualconfig]
	 * @returns an api root for the project
	 */
	static init(
		verbose: loglevel = loglevel.quiet,
		manualconfig?: iConfig,
	): importsdk {
		if (!importsdk.instance) {
			checkPermissions()
			const config = Config.init(manualconfig)
			if (config.import_url === undefined) {
				console.log(
					`%cNo import url specified in config, should be like: CTP_IMP_URL=https://import.europe-west1.gcp.commercetools.com/`,
					"color: red",
				)
				Deno.exit()
			}
			const apiRoot: importRoot = new importClient(config, verbose)
				.withClientCredentials()
			importsdk.instance = new importsdk(config, apiRoot)
		}
		return importsdk.instance
	}

	/**
	 * @deprecated please use root() instead, easier to use, this returns the root with the right project key
	 */
	public apiRoot(): importRoot {
		return this._apiRoot as importRoot
	}

	/**
	 * Create client with apiRoot
	 * root can now be used to build requests to the Composable Commerce API
	 */
	public root(): ByProjectKeyRequestBuilder {
		const aroot = this._apiRoot as importRoot
		return aroot.withProjectKeyValue({ projectKey: this._config.project_key })
	}
}
