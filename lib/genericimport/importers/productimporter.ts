import type {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	ProductImport,
} from "../../../importsdk.ts"
import type { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const Product: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: ProductImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.products()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "product",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (payload: ProductImport[], importtype: ImportType): boolean => {
		let valid = true
		for (const prod of payload) {
			valid = test(prod, "key", importtype)
			valid = test(prod, "name", importtype)
			valid = test(prod, "productType", importtype)
			valid = test(prod, "slug", importtype)
		}
		return valid
	},
}
