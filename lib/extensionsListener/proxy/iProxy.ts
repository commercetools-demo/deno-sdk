export interface iProxy {
	init(config?: iProxyConfig): Promise<boolean>
	getURL(): Promise<string | undefined>
	close(): Promise<boolean>
}

/** 
 * holds the config for the Proxy 
 * should look like this
 * ```ts
 * {
 * 	config: {
 * 		API_ENDPOINT: "the ngrok api endpoint",
			API_KEY: "the ngrok api key",
 * 	}
 * }
 * ```
 * */
export interface iProxyConfig {
	// deno-lint-ignore no-explicit-any
	config: any
}
