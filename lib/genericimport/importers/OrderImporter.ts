import { OrderImport, ImportContainer, ImportOperationStatus, importsdk } from "ct/importsdk";
import { ImportType, iImportHandler } from "./iImportHandler.ts";
import { test } from "./utils.ts";

export const Order: iImportHandler = {
   importer: async (handle: importsdk, container: ImportContainer, payload: OrderImport[]): Promise<ImportOperationStatus[]> => {
      let result
      try {
         result = await handle
            .root()
            .orders()
            .importContainers()
            .withImportContainerKeyValue({importContainerKey: container.key})
            .post({
               body: {
                  type: "order", 
                  resources: payload
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
         valid = test(ord,'totalPrice', importtype) 
      }
      return valid
   }
}