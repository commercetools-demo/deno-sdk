import { CartUpdateAction, Payment, PaymentUpdateAction } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function paymentUpdate(payment: Payment): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`paymentUpdate: ${payment.id}`))
   return {response: null, status: 200}
}

export async function paymentCreate(payment: Payment): Promise<{ response: any; status: number }> {
   
   console.log(ctcol.turquoise(`paymentCreate: ${payment.id}`))
   console.log(JSON.stringify(payment, null, 3))
   //await delay(2000) // just to have an await, can be removed
   const actions = []
   const action: PaymentUpdateAction = 
      {
         action: "setKey",
         key: "key-set-from-extension1"
      }
   actions.push(action)

   return {response: {actions: actions}, status: 200}
}