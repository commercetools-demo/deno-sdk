import { OrderImport, ImportContainer, ImportOperationStatus, importsdk, OrderPatchImport } from "../../../importsdk.ts";
import { ImportType, iImportHandler } from "./iImportHandler.ts";
import { test } from "./utils.ts";

export const OrderPatches: iImportHandler = {
   importer: async (handle: importsdk, container: ImportContainer, payload: OrderPatchImport[]): Promise<ImportOperationStatus[]> => {
      let result
      try {
         result = await handle
            .root()
            .orderPatches()
            .importContainers()
            .withImportContainerKeyValue({importContainerKey: container.key})
            .post({
               body: {
                  type: "order-patch", 
                  patches: payload
               }
            })
            .execute()
      }
      catch (_error) {
         console.log(_error)
      }
      return result!.body.operationStatus
   },
   validator: (payload: OrderImport[], importtype: ImportType): boolean => {
      let valid = true
      for (const ord of payload) {
         valid = test(ord,'orderNumber', importtype) 
         valid = test(ord,'fields', importtype) 
      }
      return valid
   }
}