import { type MessagePagedQueryResponse, sdk } from "../sdk/clientsdk.ts"
import { keyPress } from "./keypress.ts"
import { filterMessages, type filterOption, type resourceFilter } from "./filters.ts"
import { eventEmitter } from "./eventEmitter.ts"
import { delay } from "../utils/utils.ts"
import {
	type AWSEventBridgeOptions,
	type AWSsnsOptions,
	type AWSsqsOptions,
	type AzureEventGridOptions,
	type AzureServiceBusOptions,
	type ConfluentCloudOptions,
	GoogleCloudPubSub,
	type GoogleCloudPubSubOptions,
} from "./queue/queueOptions.ts"

/**
 * # messagesListener: 
 * 
 * A helper to listen to messages in commercetools, thru the messages endpoint
 * 
 * **Usage:**
 * ```ts
 * import {  EventTypes, type EventMessage,  type Message, messagesListener } from "./../mod.ts"
 * addEventListener(EventTypes.Customer, (msg: EventMessage<Message>) => {
 * 	console.log(`CustomerEvent::${msg.detail?.type}`)
 * })
 * await new messagesListener(["customer"]).pull(1000)
 * ```
 * @module
 */

export class messagesListener {
	/** @ignore hide from documentation, internal only */
	private _filters: resourceFilter[] | undefined = undefined

	/** 
	 * The constructor takes a filter, so it only listens to the messages that are listed in the filter. 
	 * @typeParam filter
	*/
	constructor(filter?: filterOption[]) {
		this._filters = filter?.map((option) => {
			const opt: resourceFilter = {
				resource: option,
				enabled: true,
			}
			return opt
		})
	}

	/**
	 * The pull() method pulls the messages until a key is pressed
	 * @param interval the interval the messages are polled at the commercetools messages endpoint
	 * @returns returns nothing, waits for a keypress to terminate
	 */
	async pull(interval = 1000) {
		const handle = sdk.init()
		const activeFilterNames = (this._filters) ? this.getActiveFilterNames()! : "all"
		console.log(`listening to ${activeFilterNames} messages in project: ${handle.config.project_key}`)
		await this.enableMessages()
		const keystate = new keyPress()
		let msgCount = await this.peek()
		while (!keystate.canceled) {
			const current = await this.peek()
			if (current > msgCount) {
				const newmessages = await this.getNewMessages(msgCount, current - msgCount)
				const filtered = filterMessages(newmessages.results, this._filters)
				if (filtered && filtered.length) {
					for (const msg of filtered) {
						eventEmitter(msg) // emit the events
					}
				}
				msgCount = current
			}
			await (delay(interval))
		}
		await this.disableMessages()
	}

	/** @ignore hide from documentation, internal only */
	private async enableMessages(): Promise<boolean> {
		const handle = sdk.init()
		console.log(
			`Enabling messages for project %c${handle.config.project_key}`,
			"color: blue",
		)
		const currentproject = await handle
			.root()
			.get()
			.execute()
		if (!currentproject.body.messages.enabled) {
			const newproject = await handle
				.root()
				.post({
					body: {
						actions: [{
							action: "changeMessagesConfiguration",
							messagesConfiguration: {
								enabled: true,
								deleteDaysAfterCreation: 1,
							},
						}],
						version: currentproject.body.version,
					},
				})
				.execute()
			return (newproject.statusCode && newproject.statusCode < 200) ? true : false
		}
		return true
	}

	/** @ignore hide from documentation, internal only */
	private async disableMessages(): Promise<boolean> {
		const handle = sdk.init()
		console.log(`Disabling messages for project ${handle.config.project_key}`)
		const currentproject = await handle
			.root()
			.get()
			.execute()
		if (currentproject.body.messages.enabled) {
			const newproject = await handle
				.root()
				.post({
					body: {
						actions: [{
							action: "changeMessagesConfiguration",
							messagesConfiguration: {
								enabled: false,
								deleteDaysAfterCreation: 1,
							},
						}],
						version: currentproject.body.version,
					},
				})
				.execute()
			return (newproject.statusCode && newproject.statusCode < 200) ? true : false
		}
		return true
	}

	/** @ignore hide from documentation, internal only */
	private async peek(): Promise<number> {
		const handle = sdk.init()
		const ammount = await handle
			.root()
			.messages()
			.get({ queryArgs: { withTotal: true, limit: 1 } }) // get one message to get the total
			.execute()
			.then(res => res.body)
		return ammount.total!
	}

	/** @ignore hide from documentation, internal only */
	private async getNewMessages(offset: number, limit = 1): Promise<MessagePagedQueryResponse> {
		const handle = sdk.init()
		const lastmessages = await handle
			.root()
			.messages()
			.get({ queryArgs: { limit: limit, offset: offset } })
			.execute()
			.then(res => res.body)
		return lastmessages
	}

	/** @ignore hide from documentation, internal only */
	private getActiveFilterNames(): string | undefined {
		const activefilters = this._filters?.map((filter) => {
			return (filter.enabled) ? filter.resource : undefined
		})
		return activefilters?.join()
	}

	/** @ignore placeholder for listener on AWSsqs */
	public async AWSsqs(options: AWSsqsOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSsqs is not imlemented yet ${options}`)
	}

	/** @ignore placeholder for listener on AWSsns */
	public async AWSsns(options: AWSsnsOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSsns is not imlemented yet ${options}`)
	}

	/** @ignore placeholder for listener on AWSEventBridge */
	public async AWSEventBridge(options: AWSEventBridgeOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSEventBridge is not imlemented yet ${options}`)
	}

	/** @ignore placeholder for listener on AzureServiceBus */
	public async AzureServiceBus(options: AzureServiceBusOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AzureServiceBus is not imlemented yet ${options}`)
	}

	/** @ignore placeholder for listener on AzureEventGrid */
	public async AzureEventGrid(options: AzureEventGridOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AzureEventGrid is not imlemented yet ${options}`)
	}

	/** @ignore placeholder for listener on GoogleCloudPubSub */
	public async GoogleCloudPubSub(options: GoogleCloudPubSubOptions) {
		const gcp = new GoogleCloudPubSub(options, this._filters)
		await gcp.register()
		await gcp.listen()
		await gcp.unregister()
	}

	/** @ignore placeholder for listener on ConfluentCloud */
	public async ConfluentCloud(options: ConfluentCloudOptions) {
		await delay(1) // remove when implemented
		throw new Error(`ConfluentCloud is not imlemented yet ${options}`)
	}
}

export { EventTypes } from "./eventEmitter.ts"
/** Eventtype definition */
export type EventMessage<T> = CustomEventInit<T>