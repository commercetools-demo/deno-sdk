import type { Order, OrderUpdateAction } from "../../../sdk/clientsdk.ts"
import type { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

/** template for the ordermessage */
export interface iOrderMessage {
	/** what triggered this ordermessage */
	action: actionType
	/** the order resource */
	resource: {
		id: string
		typeId: "Order"
		obj: Order
	}
}

/** order success message */
export interface OrderSuccessMessage {
	/** order success responsecode */
	code: responseCode.SUCCESS
	/** actions array that need to be perfomed on the order */
	actions?: OrderUpdateAction[]
}

/** order response message template */
export interface iOrderResponse extends iHandledResponse {
	/** reult code for the response */
	result: errorMessage | OrderSuccessMessage
	/** update actions that need to be performed on the order */
	actions?: OrderUpdateAction[]
}

/** the message handler for the order type */
export interface iOrderMessageHandler {
	handle(msg: iOrderMessage): Promise<iOrderResponse>
}

export abstract class iOrderHandler {
	abstract handle(Order: Order): Promise<iOrderResponse>
}
