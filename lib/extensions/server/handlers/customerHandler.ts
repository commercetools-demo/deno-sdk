import { Customer } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function customerUpdate(customer: Customer): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`customerUpdate: ${customer.id}`))
   return {response: null, status: 200}
}

export async function customerCreate(customer: Customer): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`customerCreate: ${customer.id}`))
   return {response: null, status: 200}
}