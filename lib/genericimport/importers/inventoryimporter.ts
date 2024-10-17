import type {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	InventoryImport,
} from "../../../importsdk.ts"
import type { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const Inventory: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: InventoryImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.inventories()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "inventory",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (payload: InventoryImport[], importtype: ImportType): boolean => {
		let valid = true
		for (const inv of payload) {
			valid = test(inv, "key", importtype)
			valid = test(inv, "sku", importtype)
			valid = test(inv, "quantityOnStock", importtype)
		}
		return valid
	},
}
