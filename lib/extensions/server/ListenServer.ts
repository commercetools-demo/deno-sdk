import { Application, Router, send } from "../deps.ts"
import { ctcol } from "../../utils/utils.ts"
import { iApiExtension } from "../ct/iApiExtension.ts"
import { MessageHandler } from "../messagehandlers/messageHandler.ts"

export class ListenServer {
	private _app: Application | undefined = undefined
	private _controller: AbortController | undefined = undefined
	private _apiextension: iApiExtension
	constructor(apiExtension: iApiExtension) {
		console.log(ctcol.blue(`constructor::ListenServer`))
		this._apiextension = apiExtension
	}

	public async listen(port = 8080) {
		Deno.addSignalListener("SIGINT", this.sigint)
		const router = new Router() // use this endpoint to render a page
			.get("/", (ctx, next) => {
				ctx.response.body = "api extension listener"
				return next()
			})

		this._app = new Application()
		this._controller = new AbortController()
		const { signal } = this._controller

		// file handler for static files like css and images
		const ROOT_DIR_PATH = "/public"
		this._app.use(async (ctx, next) => {
			if (!ctx.request.url.pathname.startsWith(ROOT_DIR_PATH)) {
				return next()
			}
			const filePath = ctx.request.url.pathname.replace(ROOT_DIR_PATH, "")
			await send(ctx, filePath, { root: "./extensions/server/public" })
			return next()
		})

		// generic error handler
		this._app.use(async (context, next) => {
			try {
				await next()
			} catch (err) {
				console.error(
					ctcol.bgturquoise(`ERROR: (${err.status}) ${err.message}`),
				)
				context.response.status = err.status
				context.response.body = err
				context.response.type = "json"
			}
		})

		//  this one handles the actual messages on it's own route
		const extensions: MessageHandler = new MessageHandler(
			this._apiextension.getTriggers(),
		)
		this._app.use(extensions.router().routes())
		this._app.use(router.routes())
		this._app.use(router.allowedMethods())

		const listenPromise = this._app.listen({ port: port, signal })
		console.log(ctcol.blue(`press ^c to terminate`))
		await listenPromise
	}

	sigint = () => {
		console.log()
		console.log(ctcol.blue(`Shutdown::ListenServer`))
		this._controller?.abort() // shutdown the server
	}
}
