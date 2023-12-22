import { Product } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";


export async function productUpdate(product: Product): Promise<{ response?: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`productUpdate: ${product.id}`))
   return {status: 200}
}

export async function productCreate(product: Product): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`productCreate: ${product.id}`))
   return {response: null, status: 200}
}