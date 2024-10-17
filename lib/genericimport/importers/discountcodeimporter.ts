import type {
	DiscountCodeImport,
	ImportContainer,
	ImportOperationStatus,
	importsdk,
} from "../../../importsdk.ts"
import type { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const DiscountCode: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: DiscountCodeImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.discountCodes()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "discount-code",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (
		payload: DiscountCodeImport[],
		importtype: ImportType,
	): boolean => {
		let valid = true
		for (const code of payload) {
			valid = test(code, "code", importtype)
			valid = test(code, "isActive", importtype)
		}
		return valid
	},
}
