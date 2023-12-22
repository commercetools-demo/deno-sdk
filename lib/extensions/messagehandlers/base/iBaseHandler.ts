import { BusinessUnit, Cart, Customer, Order, Payment, Product, Quote, QuoteRequest, ReferenceTypeId, StagedQuote, UpdateAction } from "ct/sdk";

export type actionType = "Update" | "Create"

export enum responseCode {
  SUCCESS = 200,
  ERROR = 400
}

export interface iReferenceMessage {
  action: actionType;
  resource: {
    id: string;
    typeId: ReferenceTypeId;
    obj: Cart | Order | Product | Payment | Customer | QuoteRequest | StagedQuote | Quote | BusinessUnit;
  };
}

export interface successMessage {
  code: responseCode.SUCCESS;
  actions?: UpdateAction[];
}

export interface errorMessage {
  code: responseCode.ERROR;
  errors: [
    {
      code: "InvalidInput" | "InvalidJsonInput" | "InvalidOperation" | "InvalidField" | "RequiredField";
      message: string;
      detailedErrorMessage?: string;
      field?: string;
      // deno-lint-ignore no-explicit-any
      invalidValue?: any;
      // deno-lint-ignore no-explicit-any
      allowedValues?: any[];
    }
  ];
}
export interface iMessageHandler {
  handle(msg: iReferenceMessage): Promise<iHandledResponse>;
}

export interface iHandledResponse {
  result: errorMessage | successMessage;
}
