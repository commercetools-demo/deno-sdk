import { spinners, wait } from "@denosaurs/wait"
import { delay } from "../../../utils/utils.ts"
import type { iNgrokConfig } from "./iNgrokConfig.ts"
import type { iProxy, iProxyConfig } from "../iProxy.ts"

export class Ngrok implements iProxy {
	private subprocess: Deno.ChildProcess | undefined = undefined
	private static instance: Ngrok | undefined = undefined
	private API_KEY = ""
	private API_ENDPOINT = ""
	private constructor() {
		console.log(`Ngrok::constructor`)
	}

	async init(config: iProxyConfig): Promise<boolean> {
		console.log(`NGROK::init`)

		await Ngrok.start(config.config)
		return true
	}

	async getURL(): Promise<string | undefined> {
		return await this.getPublicUrl()
	}
	async close(): Promise<boolean> {
		console.log(`NGROK::close`)
		return await this.stop()
	}

	static getInstance() {
		if (!Ngrok.instance) Ngrok.instance = new Ngrok()
		return Ngrok.instance
	}

	private static async start(
		config: iNgrokConfig,
	): Promise<Ngrok | undefined> {
		console.log(`starting NGROK`)
		if (config === undefined) throw new Error("No NGROK config provided")
		if (config.API_KEY === undefined) {
			throw new Error("No NGROK API_KEY provided in .env")
		}
		if (config.API_ENDPOINT === undefined) {
			throw new Error("No NGROK API_ENDPOINT provided in .env")
		}
		const instance = Ngrok.getInstance()

		instance.API_KEY = config.API_KEY
		instance.API_ENDPOINT = config.API_ENDPOINT
		const command = new Deno.Command("ngrok", {
			args: [
				"start",
				"ct",
			],
			stdout: "piped",
			stderr: "piped",
		})
		try {
			instance.subprocess = await command.spawn()
			//console.log((await instance.subprocess.status).code, (await instance.subprocess.status).code)
		} catch (_error) {
			console.log(
				`Could not start NGROK, make sure it is installed, see: https://ngrok.com/download`,
			)
			console.log(
				"also provide a NGROK_API_KEY and NGROK_API_ENDPOINT in your .env file",
			)
			Deno.exit(-1)
		}
		console.log("NGROK started")
		return instance
	}

	private async stop(): Promise<boolean> {
		console.log(`stopping NGROK`)
		if (this.subprocess != undefined) await this.destroy(this.subprocess)
		//await delay(3000)
		console.log(`NGROK stopped`)
		return true
	}

	private async getPublicUrl(): Promise<string | undefined> {
		const response = await fetch(this.API_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${this.API_KEY}`,
				Accept: "application/json",
				version: "2",
				"Ngrok-Version": "2",
			},
		})
		const result = await response.json()
		if (result === undefined) return undefined
		if (result.endpoints === undefined) return undefined
		if (result.endpoints.length) return result.endpoints[0].public_url
	}

	private async destroy(process: Deno.ChildProcess): Promise<void> {
		console.log("ngrok destroy called")
		try {
			await process.stdout.cancel()
			await process.stderr.cancel()
			await process.kill("SIGTERM")
			await process.unref()
		} catch (_error) {
			console.log()
		}
		const spinner = wait({
			text: "Waiting for ngrok to terminate",
			color: "green",
			spinner: spinners.triangle,
		}).start()
		for (let x = 0; x < 100; x++) {
			if (await this.getPublicUrl() === undefined) break
			await delay(1000)
		}
		spinner.succeed("NGROK subprocess is stopped")
	}
}
