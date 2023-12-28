import { sdk } from "./deps.ts";
import { iProxyConfig } from "./proxy/iProxy.ts";
import { Proxy } from "./proxy/Proxy.ts";
import { Ngrok } from "./proxy/ngrok/ngrok.ts";
import { ApiExtension } from "./ct/ApiExtension.ts";
import { ApiExtensionsListener } from "./ApiExtensionsListener.ts";
import { iTriggers } from "./messagehandlers/base/iTriggers.ts";


export type { iTriggers } from "./messagehandlers/base/iTriggers.ts";
export { CartHandler, CustomerHandler, OrderHandler, PaymentHandler, ProductHandler } from "./messagehandlers/messagehandlers.ts";
export { responseCode } from "./messagehandlers/base/iBaseHandler.ts";
export type { iCustomerMessage, iCustomerResponse } from "./messagehandlers/customer/iCustomerHandler.ts"
export type { iCartMessage, iCartResponse } from "./messagehandlers/cart/iCartHandler.ts"
export type { iOrderMessage, iOrderResponse } from "./messagehandlers/order/iOrderHandler.ts"
export type { iPaymentMessage, iPaymentResponse } from "./messagehandlers/payment/iPaymentHandler.ts"
export type { iProductMessage, iProductResponse } from "./messagehandlers/product/iProductHandler.ts"

export class apilistener {
   private _handle: sdk
   private _proxy: Proxy

   constructor(config?: iProxyConfig) {
      this._handle = sdk.init()
      const envconfig: iProxyConfig = 
      (config === undefined) ? {
         config: {
            API_ENDPOINT: Deno.env.get("NGROK_API_ENDPOINT")!, 
            API_KEY: Deno.env.get("NGROK_API_KEY")!
         }
      } : config
      this._proxy = new Proxy(envconfig, Ngrok.getInstance())
   }

   async listen(listento: iTriggers[]) {
      
      const extension = new ApiExtension(this._handle, listento)
      const listener = new ApiExtensionsListener(this._proxy,extension)
      
      if (await listener.init()) await listener.listen()
      await listener.close()
   }
}
