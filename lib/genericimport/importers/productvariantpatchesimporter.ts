import {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	ProductVariantImport,
	ProductVariantPatch,
} from "../../../importsdk.ts"
import { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const ProductVariantPatches: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: ProductVariantPatch[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.productVariantPatches()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "product-variant-patch",
						patches: payload,
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
