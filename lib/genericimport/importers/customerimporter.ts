import type { CustomerImport, ImportContainer, ImportOperationStatus, importsdk } from "../../../importsdk.ts"
import type { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const Customer: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: CustomerImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.customers()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "customer",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (payload: CustomerImport[], importtype: ImportType): boolean => {
		let valid = true
		for (const cust of payload) {
			valid = test(cust, "key", importtype)
			valid = test(cust, "email", importtype)
		}
		return valid
	},
}
