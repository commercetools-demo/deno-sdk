import type { iTriggers } from "../messagehandlers/base/iTriggers.ts"

export interface iApiExtension {
	register(destination: string): Promise<boolean>
	unregister(): Promise<boolean>
	getTriggers(): iTriggers[]
}
