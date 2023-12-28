import { BaseHandler } from "../base/BaseHandler.ts";
import { iPaymentMessage, iPaymentMessageHandler, iPaymentResponse } from "./iPaymentHandler.ts";
export type { PaymentUpdateAction} from "../../deps.ts"

/**
 * @description the PaymentHandler handles an incoming message and can process it, it returns a defined output
 */
export class PaymentHandler extends BaseHandler  {
   
   /**
    * @description processes all the handlers for the Payment type
    * @param msg the message passed from the api extention. Casted here, to make sure it is a PaymentMessage
    * @returns a defined response, with codes, actions or errors
    */
   async handleMessage(msg: iPaymentMessage): Promise<iPaymentResponse> {
      const result = await super.handleMessage(msg) as iPaymentResponse
      return result
   }

   /**
    * @description Multiple independent handlers can be added to the queue, they are processed in order of addition
    * @param handler to add a handler to the queue
    */
   add(handler: iPaymentMessageHandler): PaymentHandler {
      super.add(handler)
      return this
   }
}