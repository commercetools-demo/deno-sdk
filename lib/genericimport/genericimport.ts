import { importbatch } from "./batchimport.ts"
import { Inventory } from "./importers/inventoryimporter.ts"
import { Order } from "./importers/orderimporter.ts"
import { Price } from "./importers/priceimporter.ts"
import { ProductType } from "./importers/producttypeimporter.ts"
import { ProductVariant } from "./importers/productvariantimporter.ts"
import { StandalonePrice } from "./importers/standalonepriceimporter.ts"
import { Type } from "./importers/typeimporter.ts"
import { Category } from "./importers/categoryimporter.ts"
import { Customer } from "./importers/customerimporter.ts"
import { type iImportHandler, type ImportResource, ImportType } from "./importers/iImportHandler.ts"
import { Product } from "./importers/productimporter.ts"
import { DiscountCode } from "./importers/discountcodeimporter.ts"
import { ProductDraft } from "./importers/productdraftimporter.ts"
import { OrderPatches } from "./importers/orderpatchimporter.ts"
import { ProductVariantPatches } from "./importers/productvariantpatchesimporter.ts"
// export for cleaner usage
export { ImportType } from "./importers/iImportHandler.ts"

interface entityFunction {
	entity: ImportType
	funct: iImportHandler
}

const entityFunctionMap: entityFunction[] = [
	{ entity: ImportType.category, funct: Category },
	{ entity: ImportType.customer, funct: Customer },
	{ entity: ImportType.inventory, funct: Inventory },
	{ entity: ImportType.order, funct: Order },
	{ entity: ImportType.orderpatches, funct: OrderPatches },
	{ entity: ImportType.price, funct: Price },
	{ entity: ImportType.product, funct: Product },
	{ entity: ImportType.productdraft, funct: ProductDraft },
	{ entity: ImportType.producttype, funct: ProductType },
	{ entity: ImportType.productvariant, funct: ProductVariant },
	{ entity: ImportType.productvariantpatches, funct: ProductVariantPatches },
	{ entity: ImportType.standaloneprice, funct: StandalonePrice },
	{ entity: ImportType.discountcode, funct: DiscountCode },
	{ entity: ImportType.type, funct: Type },
]

export class Importer {
	static async import(importtype: ImportType, payload: ImportResource[]) {
		try {
			const callback = entityFunctionMap.find((entity) => entity.entity === importtype)
			if (callback === undefined) {
				console.log(`%centity ${importtype} is not supported`, "color: red")
				return
			}
			callback.funct.validator(payload, importtype)
			console.log(`%cimporting ${importtype}`, "color: red")

			await importbatch(
				"my-import-container",
				payload,
				callback.funct.importer,
			)
		} catch (_error) {
			console.log(`%cError ${_error}`, "color: red")
		}
	}
}
