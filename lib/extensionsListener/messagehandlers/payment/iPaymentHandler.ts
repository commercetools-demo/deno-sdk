import type { Payment, PaymentUpdateAction } from "../../../sdk/clientsdk.ts"
import type { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts"

export { responseCode } from "../base/iBaseHandler.ts"

/** payment action response message */
export interface iPaymentMessage {
	/** action for the payment */
	action: actionType
	/** the payment resource */
	resource: {
		id: string
		typeId: "Payment"
		obj: Payment
	}
}

/** payment success message */
export interface PaymentSuccessMessage {
	code: responseCode.SUCCESS
	actions?: PaymentUpdateAction[]
}

/** payment response message */
export interface iPaymentResponse extends iHandledResponse {
	/** handler response result */
	result: errorMessage | PaymentSuccessMessage
	/** the array of actions that need to be performed on the payment  */
	actions?: PaymentUpdateAction[]
}

/** the registered handler for payment messages */
export interface iPaymentMessageHandler {
	handle(msg: iPaymentMessage): Promise<iPaymentResponse>
}

/** @ignore */
export abstract class iPaymentHandler {
	abstract handle(Payment: Payment): Promise<iPaymentResponse>
}
