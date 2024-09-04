import {
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	TypeImport,
} from "../../../importsdk.ts"
import { iImportHandler, ImportType } from "./iImportHandler.ts"
import { test } from "./utils.ts"

export const Type: iImportHandler = {
	importer: async (
		handle: importsdk,
		container: ImportContainer,
		payload: TypeImport[],
	): Promise<ImportOperationStatus[]> => {
		let result
		try {
			result = await handle
				.root()
				.types()
				.importContainers()
				.withImportContainerKeyValue({ importContainerKey: container.key })
				.post({
					body: {
						type: "type",
						resources: payload,
					},
				})
				.execute()
		} catch (_error) {
			console.log(_error)
		}
		return result!.body.operationStatus
	},
	validator: (payload: TypeImport[], importtype: ImportType): boolean => {
		let valid = true
		for (const type of payload) {
			valid = test(type, "key", importtype)
			valid = test(type, "name", importtype)
			valid = test(type, "resourceTypeIds", importtype)
		}
		return valid
	},
}
