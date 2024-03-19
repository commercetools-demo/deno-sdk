import { ctcol } from "../utils/colors.ts";
import { importbatch } from "./batchimport.ts";
import { Inventory } from "./importers/InventoryImporter.ts";
import { Order } from "./importers/OrderImporter.ts";
import { Price } from "./importers/PriceImporter.ts";
import { ProductType } from "./importers/ProductTypeImporter.ts";
import { ProductVariant } from "./importers/ProductVariantImporter.ts";
import { StandalonePrice } from "./importers/StandalonePriceImporter.ts";
import { Type } from "./importers/TypeImporter.ts";
import { Category } from "./importers/categoryImporter.ts";
import { Customer } from "./importers/customerImporter.ts";
import { ImportResource, iImportHandler, ImportType } from "./importers/iImportHandler.ts";
import { Product } from "./importers/productImporter.ts";
// export for cleaner usage
export { ImportType} from "./importers/iImportHandler.ts"

interface entityFunction {
   entity: ImportType,
   funct: iImportHandler
}

const entityFunctionMap:entityFunction[] = [
   { entity: ImportType.category, funct: Category},
   { entity: ImportType.customer, funct: Customer },
   { entity: ImportType.inventory, funct: Inventory},
   { entity: ImportType.order, funct: Order },
   { entity: ImportType.price, funct: Price },
   { entity: ImportType.product, funct: Product },
   { entity: ImportType.producttype, funct: ProductType},
   { entity: ImportType.productvariant, funct: ProductVariant},
   { entity: ImportType.standaloneprice,  funct: StandalonePrice},
   { entity: ImportType.type, funct: Type}
]

export class Importer {
   
   static async import(importtype: ImportType, payload: ImportResource[]) {
      try {
      const callback = entityFunctionMap.find(entity => entity.entity === importtype)
      if (callback === undefined) {
         console.log(ctcol.bgorange(`entity ${importtype} is not supported`))
         return
      }
      callback.funct.validator(payload, importtype)
      console.log(ctcol.orange(`importing ${importtype}`))
      await importbatch("my-import-container", payload, callback.funct.importer)
      }
      catch(_error) {
         console.log(ctcol.bgorange(`Error ${_error.message}`))
      }
   }
}