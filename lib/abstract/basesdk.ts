import type { iConfig } from "../interface/iConfig.ts"
import type { isdk } from "../interface/isdk.ts"

export abstract class basesdk implements isdk {
	protected _config: iConfig
	protected _apiRoot: unknown

	constructor(config: iConfig, apiRoot: unknown) {
		this._config = config
		this._apiRoot = apiRoot
	}

	public get config(): iConfig {
		return this._config
	}

	/**
	 * @deprecated please use projectkey from the config object instead
	 */
	public get projectKey(): string {
		return this._config.project_key
	}

	public showConfig() {
		console.log(this._config)
	}

	abstract apiRoot(): unknown
}
