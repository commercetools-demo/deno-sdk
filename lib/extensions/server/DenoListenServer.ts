import { iApiExtension } from "../ct/iApiExtension.ts"
import { DenoMessageHandler } from "../messagehandlers/DenoMessageHandler.ts"

export class DenoListenServer {
	private _apiextension: iApiExtension
	private _messageHandler: DenoMessageHandler
	constructor(apiExtension: iApiExtension) {
		console.log(`constructor::DenoListenServer`)
		this._apiextension = apiExtension
		this._messageHandler = new DenoMessageHandler(apiExtension.getTriggers())
	}

	public listen( port=8080): Promise<void> {
		const ac = new AbortController()
		Deno.addSignalListener("SIGINT", () => ac.abort())
		const path = "something"
		const server = Deno.serve(
			{
				port: port,
				hostname: "0.0.0.0",
				onListen() {
					console.log(`Server started at ${path}:${port}`)
				},
				signal: ac.signal,
			},
			async (_req) => await this._messageHandler.requestHandler(_req),
		)
		server.finished.then(() => {
			console.log("Server closed")
		})
		return server.finished
	}
	
	
}
