import type { Product, ProductUpdateAction } from "../../deps.ts"
import type {
	actionType,
	errorMessage,
	iHandledResponse,
	responseCode,
} from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

export interface iProductMessage {
	action: actionType
	resource: {
		id: string
		typeId: "product"
		obj: Product
	}
}

export interface productSuccessMessage {
	code: responseCode.SUCCESS
	actions?: ProductUpdateAction[]
}

export interface iProductResponse extends iHandledResponse {
	result: errorMessage | productSuccessMessage
	actions?: ProductUpdateAction[]
}

export interface iProductMessageHandler {
	handle(msg: iProductMessage): Promise<iProductResponse>
}

export abstract class iProductHandler {
	abstract handle(product: Product): Promise<iProductResponse>
}
