import { StandalonePriceImport, ImportContainer, ImportOperationStatus, importsdk } from "ct/importsdk";
import { ImportType, iImportHandler } from "./iImportHandler.ts";
import { test } from "./utils.ts";

export const StandalonePrice: iImportHandler = {
   importer: async (handle: importsdk, container: ImportContainer, payload: StandalonePriceImport[]): Promise<ImportOperationStatus[]> => {
      let result
      try {
         result = await handle
            .root()
            .standalonePrices()
            .importContainers()
            .withImportContainerKeyValue({importContainerKey: container.key})
            .post({
               body: {
                  type: "standalone-price", 
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
   validator: (payload: StandalonePriceImport[], importtype: ImportType): boolean => {
      let valid = true
      for (const price of payload) {
         valid = test(price,'key', importtype) 
         valid = test(price,'sku', importtype) 
         valid = test(price,'value', importtype) 
      }
      return valid
   }
}