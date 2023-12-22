import { Cart } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function cartUpdate(cart: Cart): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`cartUpdate: ${cart.id}`))
   return {response: null, status: 200}
}

export async function cartCreate(cart: Cart): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`cartCreate: ${cart.id}`))
   return {response: null, status: 200}
}