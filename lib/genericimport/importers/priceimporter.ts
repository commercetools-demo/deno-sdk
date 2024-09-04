import {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	PriceImport,
} from "../../../importsdk.ts"
import { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const Price: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: PriceImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.prices()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "price",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (payload: PriceImport[], importtype: ImportType): boolean => {
		let valid = true
		for (const price of payload) {
			valid = test(price, "key", importtype)
			valid = test(price, "sku", importtype)
			valid = test(price, "value", importtype)
		}
		return valid
	},
}
