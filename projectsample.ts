//import {sdk} from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts";
import {sdk} from "./clientsdk.ts"

const handle = sdk.init()
const result = await handle
   .root()
   .get()
   .execute()
console.log(result.body)