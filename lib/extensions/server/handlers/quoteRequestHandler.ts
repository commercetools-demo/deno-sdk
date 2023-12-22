import { QuoteRequest } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function quoteRequestUpdate(quoterequest: QuoteRequest): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`quoteRequestUpdate: ${quoterequest.id}`))
   return {response: null, status: 200}
}

export async function quoteRequestCreate(quoterequest: QuoteRequest): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`quoteRequestCreate: ${quoterequest.id}`))
   return {response: null, status: 200}
}