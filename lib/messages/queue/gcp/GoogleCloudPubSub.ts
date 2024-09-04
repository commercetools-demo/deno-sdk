import { delay } from "../../../utils/utils.ts"
import { resourceFilter } from "../../filters.ts"
import { keyPress } from "../../keypress.ts"
import { GoogleCloudPubSubOptions } from "../queueOptions.ts"

export class GoogleCloudPubSub {
	private options: GoogleCloudPubSubOptions
	private filters: resourceFilter[] | undefined
	constructor(options: GoogleCloudPubSubOptions, filter?: resourceFilter[]) {
		this.options = options
		this.filters = filter
		console.log(`constructor::GoogleCloudPubSub`)
		console.log(`options:`)
		console.log(JSON.stringify(this.options))
		console.log(`filters:`)
		console.log(JSON.stringify(this.filters))
	}

	public async register() {
		await delay(1)
		console.log(`registering queue with commercetools`)
	}

	public async listen() {
		console.log(`Listening to GoogleCloudPubSub, press ^c to terminate`)
		const keystate = new keyPress()
		while (!keystate.canceled) {
			await delay(1000)
		}
	}

	public async unregister() {
		await delay(1)
		console.log(`unregistering queue with commercetools`)
	}
}
