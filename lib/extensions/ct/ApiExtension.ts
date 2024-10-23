import type { Extension, ExtensionDraft, sdk } from "../../../clientsdk.ts"
import hash from "object-hash"

import type { iTriggers } from "../messagehandlers/base/iTriggers.ts"
import type { iApiExtension } from "./iApiExtension.ts"
import type { ErrorResponse } from "@commercetools/platform-sdk"

export class ApiExtension implements iApiExtension {
	private _handle: sdk
	private _triggers: iTriggers[]

	constructor(handle: sdk, triggers: iTriggers[]) {
		console.log(`constructor::ApiExtension`)
		this._handle = handle
		this._triggers = triggers
	}
	async register(destination: string): Promise<boolean> {
		const realdest = destination + "/listener"
		console.log(`register::ApiExtension`)
		console.log(
			`registering API extensions for commercetools project: ${this._handle.config.project_key}`,
		)
		for (const trigger of this._triggers) {
			console.log(
				`${trigger.actions.join(", ").toLowerCase()} on ${trigger.resource}`,
			)
		}
		console.log(`sending to ${realdest}`)
		await this.registerExtensions(realdest, this._triggers)
		return true
	}

	async unregister(): Promise<boolean> {
		console.log(`unregister::ApiExtension`)
		await this.unregisterExtensions(this._triggers)
		return true
	}

	public getTriggers(): iTriggers[] {
		return this._triggers
	}

	private async registerExtension(
		draft: ExtensionDraft,
	): Promise<Extension | undefined> {
		try {
			await this._handle
				.root()
				.extensions()
				.withKey({ key: draft.key! })
				.head()
				.execute()

			return undefined
		} catch (_error) {
			const error: ErrorResponse = _error as ErrorResponse
			if (error.statusCode === 404) { // extension does not exist yet
				const hext = await this._handle
					.root()
					.extensions()
					.post({ body: draft })
					.execute()

				console.log(`registered extension with key ${hext.body.key}`)
				return hext.body
			}
			console.log(`%c${JSON.stringify(_error)}`, "color: red")
		}
	}

	private async registerExtensions(
		destination: string,
		triggers: iTriggers[],
	) {
		for (const trigger of triggers) {
			const draft: ExtensionDraft = {
				key: `trigger-${hash(trigger)}`,
				destination: {
					type: "HTTP",
					url: destination,
				},
				triggers: [
					{
						resourceTypeId: trigger.resource,
						actions: trigger.actions,
					},
				],
			}
			await this.registerExtension(draft)
		}
	}

	private async unregisterExtensions(triggers: iTriggers[]) {
		for (const trigger of triggers) {
			const key = `trigger-${hash(trigger)}`
			const existing = await this._handle
				.root()
				.extensions()
				.withKey({ key: key })
				.get()
				.execute()

			await this._handle
				.root()
				.extensions()
				.withKey({ key: key })
				.delete({ queryArgs: { version: existing.body.version } })
				.execute()
			console.log(`unregistered extension with key ${existing.body.key}`)
		}
	}
}
