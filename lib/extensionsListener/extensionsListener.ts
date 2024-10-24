import { sdk } from "../sdk/clientsdk.ts"
import type { iProxyConfig } from "./proxy/iProxy.ts"
import { Proxy } from "./proxy/Proxy.ts"
import { Ngrok } from "./proxy/ngrok/ngrok.ts"
import { ApiExtension } from "./ct/ApiExtension.ts"
import type { iTriggers } from "./messagehandlers/base/iTriggers.ts"
import { DenoApiExtensionsListener } from "./DenoExtensionsListener.ts"

export type { iTriggers } from "./messagehandlers/base/iTriggers.ts"
export {
	CartHandler,
	CustomerHandler,
	OrderHandler,
	PaymentHandler,
	ProductHandler,
} from "./messagehandlers/messagehandlers.ts"
export { responseCode } from "./messagehandlers/base/iBaseHandler.ts"
export type { iCustomerMessage, iCustomerResponse } from "./messagehandlers/customer/iCustomerHandler.ts"
export type { iCartMessage, iCartResponse } from "./messagehandlers/cart/iCartHandler.ts"
export type { iOrderMessage, iOrderResponse } from "./messagehandlers/order/iOrderHandler.ts"
export type { iPaymentMessage, iPaymentResponse } from "./messagehandlers/payment/iPaymentHandler.ts"
export type { iProductMessage, iProductResponse } from "./messagehandlers/product/iProductHandler.ts"

/**
 * # ApiListener 
 * allows you to listen to API extensions on your laptop. 
 * ```ts
 * class customerLogMessage {
 *		static async handle(msg: iCustomerMessage): Promise<iCustomerResponse> {
 *			const customer = msg.resource.obj
 *			console.log(`incoming customer ${msg.action} message for customer with key: ${customer.key}`)
 *			return {
 *				result: {
 *					code: responseCode.SUCCESS,
 *				}
 *			}
 *		}
 *	}
 *
 * const listento: iTriggers[] = [{
 *		actions: ["Create", "Update"],
 *		resource: "customer",
 *		handler: new CustomerHandler().add(customerLogMessage)
 *	}]
 *
 * const listener = new extensionsListener()
 * await listener.listen(listento)

	 * ```
 * @module
 */
export class extensionsListener {
	/** @ignore hide from documentation */
	private _handle: sdk
	/** @ignore hide from documentation */
	private _proxy: Proxy

	/** 
	 * initialises the listener, by default loads the API_ENDPOINT and API_KEY from .env file
	 * 
	 
	 */
	constructor(config?: iProxyConfig) {
		this._handle = sdk.init()
		const envconfig: iProxyConfig = (config === undefined)
			? {
				config: {
					API_ENDPOINT: Deno.env.get("NGROK_API_ENDPOINT")!,
					API_KEY: Deno.env.get("NGROK_API_KEY")!,
				},
			}
			: config
		this._proxy = new Proxy(envconfig, Ngrok.getInstance())
	}

	/** This method starts the listener and listens to the configured triggers until a key is pressed */
	async listen(listento: iTriggers[]) {
		const extension = new ApiExtension(this._handle, listento)
		const listener = new DenoApiExtensionsListener(this._proxy, extension)

		if (await listener.init()) {
			await listener.listen()
			await listener.close()
		}
	}
}
