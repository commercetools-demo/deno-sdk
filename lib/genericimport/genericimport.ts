import { importbatch } from "./batchimport.ts"
import { type iImportHandler, type ImportResource, ImportType } from "./importers/iImportHandler.ts"
import { Category, Customer, DiscountCode, Inventory, Order, OrderPatches, Price, Product, ProductDraft, ProductType, ProductVariant, ProductVariantPatches, StandalonePrice, Type } from "./importers/importers.ts"
export { ImportType } from "./importers/iImportHandler.ts" // export for cleaner usage

/**
 * # GenericImporter
 * Class to help with importing all types of entities through the import api 
 * 
 * # example
 * 
 * ```ts
 * ```const categorypayload: CategoryImport[] = [{
 * 	key: "keyone",
 * 	name: { "en-GB": "englishname" },
 * 	slug: { "en-GB": "englishslug" },
 * }]
 * await Importer.import(ImportType.category, categorypayload)
 * ```
 * 
 * @module
 */

interface entityFunction {
	entity: ImportType
	funct: iImportHandler
}

/** @ignore hiding from documentation */
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

/** the generic importer class */
export class Importer {
	/** this starts the generic importer
	 * @param importtype, type of resouce that needs to be imported
	 * @param payload The array of resources that needs to be imported
	 */
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
