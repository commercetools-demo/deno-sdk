import {
	BusinessUnit,
	Cart,
	Customer,
	Order,
	Payment,
	Product,
	Quote,
	QuoteRequest,
	ReferenceTypeId,
	StagedQuote,
} from "../deps.ts"
import { iHandledResponse, responseCode } from "./base/iBaseHandler.ts"
import { iTriggers } from "./base/iTriggers.ts"

type actionType = "Update" | "Create"

interface referenceMessage {
	action: actionType
	resource: {
		id: string
		typeId: ReferenceTypeId
		obj:
			| Cart
			| Order
			| Product
			| Payment
			| Customer
			| QuoteRequest
			| StagedQuote
			| Quote
			| BusinessUnit
	}
}

export class DenoMessageHandler {
	private _triggers: iTriggers[] = []
	constructor(triggers: iTriggers[]) {
		console.log(`constructor::DenoextensionHandler`)
		this._triggers = triggers
	}

	public async requestHandler(request: Request): Promise<Response> {
		const url = new URL(request.url)
		//const param = new URLSearchParams(url.search)

		if (request.method === "GET" && url.pathname === "/") {
			return new Response("Api extension listener")
		}
		if (request.method === "POST" && url.pathname === "/listener") {
			const body = await request.json()
			//console.log("request")
			//console.log(body)
			const actionResponse = await this.handlePostAction(body)
			//console.log(actionResponse)
			if (actionResponse === undefined) {
				const response = new Response("", {status: 200})
				return response
			}
			if (actionResponse.result.code === responseCode.ERROR) {
				const response = new Response(JSON.stringify(actionResponse.result.errors), {status: actionResponse.result.code})
				return response
			}
			const responsebody = (actionResponse.result.actions?.length) ? JSON.stringify({actions: actionResponse.result.actions}) : ""
			//console.log(responsebody)
			const response = new Response(responsebody, {status: actionResponse.result.code})
			return response
		}
		return new Response("error", {status: 500, statusText: "not allowed"})
	}

	private async handlePostAction(
		ref: referenceMessage,
	): Promise<iHandledResponse | undefined> {
		for (const trigger of this._triggers) {
			if (trigger.handler === undefined) continue
			if (ref.resource.typeId === trigger.resource) {
				return await trigger.handler.handleMessage(ref)
			}
		}
		return undefined
	}
}
