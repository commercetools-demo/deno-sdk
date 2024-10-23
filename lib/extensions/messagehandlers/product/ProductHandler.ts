import { BaseHandler } from "../base/BaseHandler.ts"
import type { iProductMessage, iProductMessageHandler, iProductResponse } from "./iProductHandler.ts"
export type { ProductUpdateAction } from "../../../../clientsdk.ts"

/**
 * @description the ProductHandler handles an incoming message and can process it, it returns a defined output
 */
export class ProductHandler extends BaseHandler {
	/**
	 * @description processes all the handlers for the product type
	 * @param msg the message passed from the api extention. Casted here, to make sure it is a ProductMessage
	 * @returns a defined response, with codes, actions or errors
	 */
	override async handleMessage(
		msg: iProductMessage,
	): Promise<iProductResponse> {
		const result = await super.handleMessage(msg) as iProductResponse
		return result
	}

	/**
	 * @description Multiple independent handlers can be added to the queue, they are processed in order of addition
	 * @param handler to add a handler to the queue
	 */
	override add(handler: iProductMessageHandler): ProductHandler {
		super.add(handler)
		return this
	}
}
