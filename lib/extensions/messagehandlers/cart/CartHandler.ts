import { BaseHandler } from "../base/BaseHandler.ts";
import { iCartMessage, iCartMessageHandler, iCartResponse } from "./iCartHandler.ts";
export type { CartUpdateAction} from "../../deps.ts"

/**
 * @description the CartHandler handles an incoming message and can process it, it returns a defined output
 */
export class CartHandler extends BaseHandler  {
   
   /**
    * @description processes all the handlers for the Cart type
    * @param msg the message passed from the api extention. Casted here, to make sure it is a CartMessage
    * @returns a defined response, with codes, actions or errors
    */
   async handleMessage(msg: iCartMessage): Promise<iCartResponse> {
      const result = await super.handleMessage(msg) as iCartResponse
      return result
   }

   /**
    * @description Multiple independent handlers can be added to the queue, they are processed in order of addition
    * @param handler to add a handler to the queue
    */
   add(handler: iCartMessageHandler): CartHandler {
      super.add(handler)
      return this
   }
}