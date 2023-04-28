import {sdk} from "https://deno.land/x/commercetools_demo_sdk/api.ts";

const handle = sdk.init()
const result = await handle
   .apiRoot()
   .withProjectKey( { projectKey: handle.projectKey })
   .get()
   .execute()
console.log(result.body)