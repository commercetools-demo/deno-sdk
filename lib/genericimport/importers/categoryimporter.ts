import { CategoryImport, ImportContainer, ImportOperationStatus, importsdk } from "../../../importsdk.ts";
import { ImportType, iImportHandler } from "./iImportHandler.ts";
import { test } from "./utils.ts";

export const Category: iImportHandler = {
   importer: async (handle: importsdk, container: ImportContainer, payload: CategoryImport[]): Promise<ImportOperationStatus[]> => {
      let result
      try {
         result = await handle
         .root()
         .categories()
         .importContainers()
         .withImportContainerKeyValue({importContainerKey: container.key})
         .post({
            body: {
               type: "category", 
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
   validator: (payload: CategoryImport[], importtype: ImportType): boolean => {
      let valid = true
      for (const cat of payload) {
         valid = test(cat,'key', importtype) 
         valid = test(cat,'name', importtype) 
         valid = test(cat,'slug', importtype) 
      }
      return valid
   }
}

