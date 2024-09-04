import { BaseHandler } from "./BaseHandler.ts"

export type ResourceType =
	| "cart"
	| "order"
	| "payment"
	| "customer"
	| "quote-request"
	| "staged-quote"
	| "quote"
	| "business-unit"
	| "product"
export type ActionType = "Create" | "Update"

export interface iTriggers {
	resource: ResourceType
	actions: ActionType[]
	handler?: BaseHandler
}
