import type { iConfig } from "../interface/iConfig.ts"
import { loglevel } from "../interface/iLogger.ts"
import type { iOptions } from "../interface/isdk.ts"
import type { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk"
import { Config } from "../utils/Config.ts"
import { basesdk } from "../abstract/basesdk.ts"
import { sdkClient } from "./sdkClient.ts"
import type { ApiRoot as sdkRoot } from "./sdkClient.ts"

/**
 * This is the entry class for the sdk
 * 
 * 
 * ```ts
 * import { sdk } from "jsr:@commercetoolsdemo/sdk"
 * 
 * const handle = sdk.init()
 * const project = await handle.root().get().execute().then(res=> res.body)
 * console.log(project)
 * ```
 * @module
 */

export class sdk extends basesdk  {
	/** @ignore*/
	private static instance: sdk | undefined
	/** @ignore*/
	private constructor(config: iConfig, apiRoot: sdkRoot) {
		super(config, apiRoot)
	}

	/**
	 * Get a sdk client, will initialise from .env file,
	 * @param {loglevel}[verbose=loglevel.verbose] Enabling or disabling the logger
	 * @param {Options} [options] Allows you to choose the login flow
	 * @param {iConfig} [manualconfig] pass in a config instead of reading it from the .env file
	 * @returns an api root for the project, as a singleton, so you can reuse it
	 * @category sdk
	 */
	static init(
		verbose: loglevel = loglevel.quiet,
		options?: iOptions,
		manualconfig?: iConfig,
	): sdk {
		if (sdk.instance === undefined) {
			//checkPermissions()
			const config = Config.init(manualconfig)
			let apiRoot: sdkRoot
			if (options?.passwordflow !== undefined) {
				if (options.passwordflow.storeKey === undefined) {
					apiRoot = new sdkClient(config, verbose).withUsernamePassword(options)
				} else {
					apiRoot = new sdkClient(config, verbose).withUsernamePasswordStore(options)
				}
			} else if (options?.anonymous !== undefined) {
				if (options.anonymous.refresh_token !== undefined) {
					apiRoot = new sdkClient(config, verbose).withRefreshToken(options)
				} else {
					apiRoot = new sdkClient(config, verbose).withAnonymous(options)
				}
			} else {
				apiRoot = new sdkClient(config, verbose).withClientCredentials()
			}
			sdk.instance = new sdk(config, apiRoot)
		}
		return sdk.instance
	}

	/**
	 * Gets the root into the commercetools typescript sdk
	 * @returns ByProjectKeyRequestBuilder
	 * @category sdk
	 */
	public root(): ByProjectKeyRequestBuilder {
		const aroot = this._apiRoot as sdkRoot
		return aroot.withProjectKey({ projectKey: this.config.project_key })
	}

	/**
	 * Destroy the sdk, so you can inititalize the singleton again
	 * @category sdk
	 */
	static destroy(): void {
		sdk.instance = undefined
	}
}
