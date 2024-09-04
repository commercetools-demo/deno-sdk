import {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	ProductVariantImport,
} from "../../../importsdk.ts"
import { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const ProductVariant: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: ProductVariantImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.productVariants()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "product-variant",
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
		payload: ProductVariantImport[],
		importtype: ImportType,
	): boolean => {
		let valid = true
		for (const variant of payload) {
			valid = test(variant, "key", importtype)
			valid = test(variant, "isMasterVariant", importtype)
		}
		return valid
	},
}
