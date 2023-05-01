export { Config } from "./lib/Config.ts";
export type { iConfig } from "./lib/interface/iConfig.ts";
export { loglevel } from "./lib/interface/iLogger.ts"
export { sdkClient, ApiRoot as sdkRoot } from "./lib/sdkClient.ts"
export { sdk } from "./lib/sdk.ts"


export * from "npm:@commercetools/sdk-client-v2"
export * from "npm:@commercetools/platform-sdk"


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
 *    .apiRoot()
 *    .withProjectKey( { projectKey: handle.projectKey })
 *    .get()
 *    .execute()
 * console.log(result.body)
 * ```
 */