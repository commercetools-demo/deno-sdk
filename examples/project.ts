import { sdk } from "@commercetoolsdemo/sdk"

/**
 * # project example
 * 
 * call with: 
 * 
 * ```bash
 * deno -A jsr:@commercetoolsdemo/examples/project
 * ```
 */

const handle = sdk.init()
const project = await handle.root().get().execute().then(res=> res.body)
console.log(project)
