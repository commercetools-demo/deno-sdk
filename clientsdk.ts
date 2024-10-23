export { Config } from "./lib/Config.ts"
export type { iConfig } from "./lib/interface/iConfig.ts"
export { loglevel } from "./lib/interface/iLogger.ts"
export { ApiRoot as sdkRoot, sdkClient } from "./lib/sdkClient.ts"
export { sdk } from "./lib/sdk.ts"

//export * from "npm:@commercetools/sdk-client-v2@latest"
export * from "@commercetools/ts-client"
//export * from "npm:@commercetools/platform-sdk@latest"
export * from "@commercetools/platform-sdk"
export type {
	ClientRequest,
	ClientResponse,
	executeRequest,
	MethodType,
	Middleware,
	QueryParam,
	VariableMap,
} from "@commercetools/ts-client"
/**
 * commercetools sdk wrapper for the sdk client
 * @author Willem Haring
 * @description This is the entry point for the commercetools api see https://docs.commmercetools.com/api
 * @example
 * ```js
 * import {sdk} from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
 *
 * const handle = sdk.init()
 * const result = await handle
 *    .root()
 *    .get()
 *    .execute()
 * console.log(result.body)
 * ```
 */
