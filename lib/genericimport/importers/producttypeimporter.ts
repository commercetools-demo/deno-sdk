import type { ImportContainer, ImportOperationStatus, importsdk, ProductTypeImport } from "../../importsdk/importsdk.ts"
import type { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const ProductType: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: ProductTypeImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.productTypes()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "product-type",
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
		payload: ProductTypeImport[],
		importtype: ImportType,
	): boolean => {
		let valid = true
		for (const prodtype of payload) {
			valid = test(prodtype, "key", importtype)
			valid = test(prodtype, "name", importtype)
			valid = test(prodtype, "description", importtype)
		}
		return valid
	},
}
