/**
 * The loglevel for the sdk. When set to quiet, it will be. Otherwise request and response are logged to the console for debugging purposes
 * 
 * ```ts
 * import { sdk, loglevel } from "jsr:@commercetoolsdemo/sdk";
 *
 *	const handle = sdk.init(loglevel.verbose)
 *	const project = await handle.root().get().execute().then(res=> res.body)
 *	console.log(project)
 * ```
 * 
 */

export enum loglevel {
	/** no logging output to console */
	quiet = 0,
	/** both request and response are logged to the console */
	verbose,
}
