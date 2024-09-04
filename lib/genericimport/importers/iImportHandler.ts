import {  ImportContainer, ImportOperationStatus, OrderImport, ProductVariantPatchRequest, _ImportResource, importsdk } from "../../../importsdk.ts";

export enum ImportType {
   category = "category",
   customer = "customer",
   inventory = "inventory",
   order = "order",
   price = "price",
   product = "product",
   producttype = "producttype",
   productvariant = "productvariant",
   standaloneprice = "standaloneprice",
   discountcode = "discountcode",
   type = "type"
}

export type TypedImporter = (
   importer: importsdk,
   container: ImportContainer,
   payload: ImportResource[],
) => Promise<ImportOperationStatus[]>;

export type ImportResource = _ImportResource | OrderImport | ProductVariantPatchRequest  // add order to the ImportResource

export interface iImportHandler {
   importer(handle: importsdk, container: ImportContainer, payload: ImportResource[]): Promise<ImportOperationStatus[]>,
   validator(payload: ImportResource[], type: ImportType): boolean
}