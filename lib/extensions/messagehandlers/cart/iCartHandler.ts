import { Cart, CartUpdateAction } from "../../deps.ts"
import {
	actionType,
	errorMessage,
	iHandledResponse,
	responseCode,
} from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

export interface iCartMessage {
	action: actionType
	resource: {
		id: string
		typeId: "Cart"
		obj: Cart
	}
}

export interface CartSuccessMessage {
	code: responseCode.SUCCESS
	actions?: CartUpdateAction[]
}

export interface iCartResponse extends iHandledResponse {
	result: errorMessage | CartSuccessMessage
	actions?: CartUpdateAction[]
}

export interface iCartMessageHandler {
	handle(msg: iCartMessage): Promise<iCartResponse>
}

export abstract class iCartHandler {
	abstract handle(Cart: Cart): Promise<iCartResponse>
}
