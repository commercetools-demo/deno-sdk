import { Quote } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function quoteUpdate(quote: Quote): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`quoteUpdate: ${quote.id}`))
   return {response: null, status: 200}
}

export async function quoteCreate(quote: Quote): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`quoteCreate: ${quote.id}`))
   return {response: null, status: 200}
}