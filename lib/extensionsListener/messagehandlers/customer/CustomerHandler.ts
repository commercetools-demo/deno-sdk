import { BaseHandler } from "../base/BaseHandler.ts"
import type { iCustomerMessage, iCustomerMessageHandler, iCustomerResponse } from "./iCustomerHandler.ts"
export type { CustomerUpdateAction } from "../../../sdk/clientsdk.ts"

/**
 * @description the CustomerHandler handles an incoming message and can process it, it returns a defined output
 */
export class CustomerHandler extends BaseHandler {
	/**
	 * @description processes all the handlers for the Customer type
	 * @param msg the message passed from the api extention. Casted here, to make sure it is a CustomerMessage
	 * @returns a defined response, with codes, actions or errors
	 */
	override async handleMessage(
		msg: iCustomerMessage,
	): Promise<iCustomerResponse> {
		const result = await super.handleMessage(msg) as iCustomerResponse
		return result
	}

	/**
	 * @description Multiple independent handlers can be added to the queue, they are processed in order of addition
	 * @param handler to add a handler to the queue
	 */
	override add(handler: iCustomerMessageHandler): CustomerHandler {
		super.add(handler)
		return this
	}
}
