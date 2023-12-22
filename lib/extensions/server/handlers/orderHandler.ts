import { Order} from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function orderUpdate(order: Order): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`orderUpdate: ${order.id}`))
   return {response: null, status: 200}
}

export async function orderCreate(order: Order): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`orderCreate: ${order.id}`))   
   return {response: null, status: 200} 

}