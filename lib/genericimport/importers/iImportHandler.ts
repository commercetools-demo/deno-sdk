import type {
	_ImportResource,
	ImportContainer,
	ImportOperationStatus,
	importsdk,
	OrderImport,
	OrderPatchImport,
	ProductVariantPatch,
	ProductVariantPatchRequest,
} from "../../../importsdk.ts"

export enum ImportType {
	category = "category",
	customer = "customer",
	inventory = "inventory",
	order = "order",
	orderpatches = "orderpatches",
	price = "price",
	product = "product",
	productdraft = "productdraft",
	productvariantpatches = "productvariantpatches",
	producttype = "producttype",
	productvariant = "productvariant",
	standaloneprice = "standaloneprice",
	discountcode = "discountcode",
	type = "type",
}

export type TypedImporter = (
	importer: importsdk,
	container: ImportContainer,
	payload: ImportResource[],
) => Promise<ImportOperationStatus[]>

export type ImportResource =
	| _ImportResource
	| OrderImport
	| ProductVariantPatchRequest
	| OrderPatchImport
	| ProductVariantPatch // add order to the ImportResource

export interface iImportHandler {
	importer(
		handle: importsdk,
		container: ImportContainer,
		payload: ImportResource[],
	): Promise<ImportOperationStatus[]>
	validator(payload: ImportResource[], type: ImportType): boolean
}
