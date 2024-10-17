import type { iApiExtension } from "./ct/iApiExtension.ts"
import type { iProxy } from "./proxy/iProxy.ts"
import { DenoListenServer } from "./server/DenoListenServer.ts"

export class DenoApiExtensionsListener {
	private _Proxy: iProxy
	private _ApiExtension: iApiExtension
	constructor(proxy: iProxy, apiextension: iApiExtension) {
		console.log(`constructor::DenoApiExtensionsListener`)
		this._Proxy = proxy
		this._ApiExtension = apiextension
	}

	public async init(): Promise<boolean> {
		console.log(`init::DenoApiExtensionsListener`)
		await this._Proxy.init()
		const url = await this._Proxy.getURL()
		if (url === undefined) return false
		return this._ApiExtension.register(url)
	}

	public async listen() {
		console.log(`listen::DenoApiExtensionsListener`)
		const url = await this._Proxy.getURL()
		console.log(`Listening to api extensions on: ${url}`)
		const server = new DenoListenServer(this._ApiExtension)
		await server.listen()
	}

	public async close(): Promise<boolean> {
		console.log(`close::DenoApiExtensionsListener`)
		await this._Proxy.close()
		await this._ApiExtension.unregister()
		return true
	}
}
