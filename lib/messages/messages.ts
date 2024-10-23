import { type MessagePagedQueryResponse, sdk } from "../../clientsdk.ts"
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
export { EventTypes } from "./eventEmitter.ts"
export type { Message } from "../../clientsdk.ts"
export type EventMessage<T> = CustomEventInit<T>

export class listener {
	private filter: resourceFilter[] | undefined = undefined

	constructor(filter?: filterOption[]) {
		this.filter = filter?.map((option) => {
			const opt: resourceFilter = {
				resource: option,
				enabled: true,
			}
			return opt
		})
	}

	async pull(interval = 1000) {
		const handle = sdk.init()
		const filters = (this.filter) ? this.showFilter()! : "all"
		console.log(
			`listening to ${filters} messages in project: ${handle.config.project_key}`,
		)
		await this.enableMessages()
		const keystate = new keyPress()
		let msgCount = await this.peek()
		while (!keystate.canceled) {
			const current = await this.peek()
			if (current > msgCount) {
				const newmessages = await this.getNewMessages(
					msgCount,
					current - msgCount,
				)
				const filtered = filterMessages(newmessages.results, this.filter)
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

	private async peek(): Promise<number> {
		const handle = sdk.init()
		const ammount = await handle
			.root()
			.messages()
			.get({ queryArgs: { withTotal: true, limit: 1 } }) // get one message to get the total
			.execute()
		return ammount.body.total!
	}

	private async getNewMessages(
		offset: number,
		limit = 1,
	): Promise<MessagePagedQueryResponse> {
		const handle = sdk.init()
		const lastmessages = await handle
			.root()
			.messages()
			.get({ queryArgs: { limit: limit, offset: offset } })
			.execute()
		return lastmessages.body
	}

	private showFilter(): string | undefined {
		const activefilters = this.filter?.map((filter) => {
			return (filter.enabled) ? filter.resource : undefined
		})
		return activefilters?.join()
	}

	public async AWSsqs(options: AWSsqsOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSsqs is not imlemented yet ${options}`)
	}

	public async AWSsns(options: AWSsnsOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSsns is not imlemented yet ${options}`)
	}

	public async AWSEventBridge(options: AWSEventBridgeOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AWSEventBridge is not imlemented yet ${options}`)
	}

	public async AzureServiceBus(options: AzureServiceBusOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AzureServiceBus is not imlemented yet ${options}`)
	}

	public async AzureEventGrid(options: AzureEventGridOptions) {
		await delay(1) // remove when implemented
		throw new Error(`AzureEventGrid is not imlemented yet ${options}`)
	}

	public async GoogleCloudPubSub(options: GoogleCloudPubSubOptions) {
		const gcp = new GoogleCloudPubSub(options, this.filter)
		await gcp.register()
		await gcp.listen()
		await gcp.unregister()
	}

	public async ConfluentCloud(options: ConfluentCloudOptions) {
		await delay(1) // remove when implemented
		throw new Error(`ConfluentCloud is not imlemented yet ${options}`)
	}
}
