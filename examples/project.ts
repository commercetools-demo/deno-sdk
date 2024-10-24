import { sdk } from "jsr:@commercetoolsdemo/sdk"

const handle = sdk.init()
const project = await handle.root().get().execute().then(res=> res.body)
console.log(project)
