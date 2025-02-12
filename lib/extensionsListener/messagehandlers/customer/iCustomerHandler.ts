import type { Customer, CustomerUpdateAction } from "../../../sdk/clientsdk.ts"
import type { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

export interface iCustomerMessage {
	action: actionType
	resource: {
		id: string
		typeId: "Customer"
		obj: Customer
	}
}

export interface CustomerSuccessMessage {
	code: responseCode.SUCCESS
	actions?: CustomerUpdateAction[]
}

export interface iCustomerResponse extends iHandledResponse {
	result: errorMessage | CustomerSuccessMessage
	actions?: CustomerUpdateAction[]
}

export interface iCustomerMessageHandler {
	handle(msg: iCustomerMessage): Promise<iCustomerResponse>
}

export abstract class iCustomerHandler {
	abstract handle(Customer: Customer): Promise<iCustomerResponse>
}
