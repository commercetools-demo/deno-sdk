import { Payment, PaymentUpdateAction } from "ct/sdk";
import { actionType, errorMessage, iHandledResponse, responseCode } from "../base/iBaseHandler.ts";

export { responseCode } from "../base/iBaseHandler.ts"

export interface iPaymentMessage {
   action: actionType,
   resource: {
      id: string
      typeId: 'Payment',
      obj: Payment
   }
}

export interface PaymentSuccessMessage {
   code: responseCode.SUCCESS
   actions?: PaymentUpdateAction[]
}

export interface iPaymentResponse extends iHandledResponse {
   result: errorMessage | PaymentSuccessMessage
   actions?: PaymentUpdateAction[]
}

export interface iPaymentMessageHandler {
   handle(msg: iPaymentMessage): Promise<iPaymentResponse>
}

export abstract class iPaymentHandler {
   abstract handle(Payment: Payment): Promise<iPaymentResponse>
}