import { BaseHandler } from "../base/BaseHandler.ts"
import {
	iOrderMessage,
	iOrderMessageHandler,
	iOrderResponse,
} from "./iOrderHandler.ts"
export type { OrderUpdateAction } from "../../deps.ts"

/**
 * @description the OrderHandler handles an incoming message and can process it, it returns a defined output
 */
export class OrderHandler extends BaseHandler {
	/**
	 * @description processes all the handlers for the Order type
	 * @param msg the message passed from the api extention. Casted here, to make sure it is a OrderMessage
	 * @returns a defined response, with codes, actions or errors
	 */
	async handleMessage(msg: iOrderMessage): Promise<iOrderResponse> {
		const result = await super.handleMessage(msg) as iOrderResponse
		return result
	}

	/**
	 * @description Multiple independent handlers can be added to the queue, they are processed in order of addition
	 * @param handler to add a handler to the queue
	 */
	add(handler: iOrderMessageHandler): OrderHandler {
		super.add(handler)
		return this
	}
}
