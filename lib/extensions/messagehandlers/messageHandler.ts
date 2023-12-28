import { BusinessUnit, Cart, Customer, Order, Payment, Product, Quote, QuoteRequest, ReferenceTypeId, StagedQuote } from "../deps.ts"
import { Router } from  "../deps.ts"
import { ctcol } from "../../utils/utils.ts";
import { iHandledResponse, responseCode } from "./base/iBaseHandler.ts";
import { iTriggers } from "./base/iTriggers.ts";

type actionType = "Update" | "Create"

interface referenceMessage {
   action: actionType,
   resource: {
      id: string
      typeId: ReferenceTypeId,
      obj: Cart | Order | Product | Payment | Customer | QuoteRequest | StagedQuote | Quote | BusinessUnit
   }
}


export class MessageHandler {
   private _triggers: iTriggers[] = []
   constructor(triggers: iTriggers[]){
      console.log(ctcol.turquoise(`constructor::extensionHandler`))
      this._triggers = triggers
   }

   public router(): Router {
      return new Router()
      .post("/listener", async (ctx, next) => {
         const result = ctx.request.body()
         const body = await result.value
         const res = await this.handlePostAction(body)
         
         if (res === undefined) {
            ctx.response.status = 200
            return next()
         }
         ctx.response.status = res.result.code.valueOf()
         if (res.result.code === responseCode.ERROR) {
            ctx.response.body = res.result.errors
            
         }
         if (res.result.code === responseCode.SUCCESS) {
            if (res.result.actions?.length) {
               ctx.response.body = {actions: res.result.actions}
            }
         }
         return next()
      })
   }

   private async handlePostAction(ref: referenceMessage): Promise<iHandledResponse | undefined>  {
      
      for (const trigger of this._triggers) {
         if (trigger.handler === undefined) continue
         if (ref.resource.typeId === trigger.resource) {
            return await trigger.handler.handleMessage(ref)
         }

      }
      return undefined
   }
}


