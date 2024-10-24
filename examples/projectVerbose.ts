import { sdk, loglevel } from "../mod.ts"

const handle = sdk.init(loglevel.verbose)
const project = await handle.root().get().execute().then(res=> res.body)
console.log(project)
