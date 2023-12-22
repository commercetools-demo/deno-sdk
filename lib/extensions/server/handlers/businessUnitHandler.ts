import { BusinessUnit } from "ct/sdk"
import { delay, ctcol } from "../../../utils/utils.ts";

export async function businessUnitUpdate(businessUnit: BusinessUnit): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`businessUnitUpdate: ${businessUnit.id}`))
   return {response: null, status: 200}
}

export async function businessUnitCreate(businessUnit: BusinessUnit): Promise<{ response: any; status: number }> {
   await delay(1) // just to have an await, can be removed
   console.log(ctcol.turquoise(`businessUnitCreate: ${businessUnit.id}`))
   return {response: null, status: 200}
}