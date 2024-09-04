import { ctcol } from "../utils/utils.ts"
import { iApiExtension } from "./ct/iApiExtension.ts"
import { iProxy } from "./proxy/iProxy.ts"
import { ListenServer } from "./server/ListenServer.ts"

export class ApiExtensionsListener {
	private _Proxy: iProxy
	private _ApiExtension: iApiExtension
	constructor(proxy: iProxy, apiextension: iApiExtension) {
		console.log(ctcol.turquoise(`constructor::ApiExtensionsListener`))
		this._Proxy = proxy
		this._ApiExtension = apiextension
	}

	public async init(): Promise<boolean> {
		console.log(ctcol.turquoise(`init::ApiExtensionsListener`))
		await this._Proxy.init()
		const url = await this._Proxy.getURL()
		if (url === undefined) return false
		return this._ApiExtension.register(url)
	}

	public async listen() {
		console.log(ctcol.turquoise(`listen::ApiExtensionsListener`))
		const url = await this._Proxy.getURL()
		console.log(ctcol.turquoise(`Listening to api extensions on: ${url}`))
		const server = new ListenServer(this._ApiExtension)
		await server.listen()
	}

	public async close(): Promise<boolean> {
		console.log(ctcol.turquoise(`close::ApiExtensionsListener`))
		await this._Proxy.close()
		await this._ApiExtension.unregister()
		return true
	}
}
