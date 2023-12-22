import { Order, OrderUpdateAction } from "ct/sdk";
import { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts";

export { responseCode } from "../base/iBaseHandler.ts"

export interface iOrderMessage {
   action: actionType,
   resource: {
      id: string
      typeId: 'Order',
      obj: Order
   }
}

export interface OrderSuccessMessage {
   code: responseCode.SUCCESS
   actions?: OrderUpdateAction[]
}

export interface iOrderResponse extends iHandledResponse {
   result: errorMessage | OrderSuccessMessage
   actions?: OrderUpdateAction[]
}

export interface iOrderMessageHandler {
   handle(msg: iOrderMessage): Promise<iOrderResponse>
}

export abstract class iOrderHandler {
   abstract handle(Order: Order): Promise<iOrderResponse>
}