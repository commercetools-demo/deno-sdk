import type { iConfig } from "../interface/iConfig.ts"


export abstract class basesdk  {
	protected _config: iConfig
	protected _apiRoot: unknown

	constructor(config: iConfig, apiRoot: unknown) {
		this._config = config
		this._apiRoot = apiRoot
	}

	public get config(): iConfig {
		return this._config
	}

	public showConfig() {
		console.log(this._config)
	}
}
