import type { Product, ProductUpdateAction } from "../../../sdk/clientsdk.ts"
import type { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

/** product action message */
export interface iProductMessage {
	/** the action to be performed on the product */
	action: actionType
	/** the product resourse */
	resource: {
		id: string
		typeId: "product"
		obj: Product
	}
}

/** product success message */
export interface productSuccessMessage {
	code: responseCode.SUCCESS
	actions?: ProductUpdateAction[]
}

/** product response message */
export interface iProductResponse extends iHandledResponse {
	/** status of the actual response */
	result: errorMessage | productSuccessMessage
	/** update actions for product */
	actions?: ProductUpdateAction[]
}

export interface iProductMessageHandler {
	handle(msg: iProductMessage): Promise<iProductResponse>
}

export abstract class iProductHandler {
	abstract handle(product: Product): Promise<iProductResponse>
}
