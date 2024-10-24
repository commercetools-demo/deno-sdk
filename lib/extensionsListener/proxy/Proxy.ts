import type { iProxy, iProxyConfig } from "./iProxy.ts"

export class Proxy implements iProxy {
	private _config: iProxyConfig
	private _method: iProxy

	constructor(config: iProxyConfig, method: iProxy) {
		console.log(`constructor::Proxy`)
		this._config = config
		this._method = method
	}
	async init(): Promise<boolean> {
		console.log(`init::Proxy`)
		return await this._method.init(this._config)
	}

	async getURL(): Promise<string | undefined> {
		const url = await this._method.getURL()
		return url
	}

	async close(): Promise<boolean> {
		console.log(`close::Proxy`)
		return await this._method.close()
	}
}
