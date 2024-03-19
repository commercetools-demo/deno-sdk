import { ImportResource, ImportType } from "./iImportHandler.ts";


export function test(obj: ImportResource, property: string, type: ImportType): boolean {
  if (property in obj) return true;
  throw new Error(`${type} Missing required attribute ${property} in obj ${JSON.stringify(obj)}`, { cause: "validation" });

}
