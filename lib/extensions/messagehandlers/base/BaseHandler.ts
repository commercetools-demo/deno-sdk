import {
	iHandledResponse,
	iMessageHandler,
	iReferenceMessage,
	responseCode,
} from "./iBaseHandler.ts"

export abstract class BaseHandler {
	private _handlers: iMessageHandler[] = []

	async handleMessage(msg: iReferenceMessage): Promise<iHandledResponse> {
		const response: iHandledResponse[] = []
		// first kick off all meassage handlers
		for (const handler of this._handlers) {
			const res = await handler.handle(msg)
			response.push(res)
		}
		// if we have errors, return the first error in the queue
		const errors = response.filter((resp) =>
			resp.result.code === responseCode.ERROR
		)
		if (errors.length) return errors[0]
		// ok, no errors, return all actions, make sure all duplicates are removed
		const actions = response.filter((resp) =>
			resp.result.code === responseCode.SUCCESS &&
			resp.result.actions?.length
		)
		if (actions.length) {
			const allactions = {
				actions: actions.map((action) => {
					if (action.result.code === responseCode.SUCCESS) { // just doing this to satisfy the linter
						return action.result.actions
					}
				}),
			}
			return {
				result: {
					code: responseCode.SUCCESS,
					actions: [
						...new Set(
							allactions.actions.flatMap((o) => JSON.stringify(o)),
						),
					].flatMap((s) => JSON.parse(s)),
				},
			}
		}
		// no actions either, return the first response then
		return [...new Set(response.map((o) => JSON.stringify(o)))].map((s) =>
			JSON.parse(s)
		)[0]
	}

	add(handler: iMessageHandler): BaseHandler {
		this._handlers.push(handler)
		return this
	}
}
