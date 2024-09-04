export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export { ctcol } from "./colors.ts"
