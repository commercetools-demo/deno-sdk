import { SpinnerTypes, TerminalSpinner} from "https://deno.land/x/spinners/mod.ts";
import { getContainerStatus, getOrCreateContainer } from "./containers.ts";
import { ImportOperationStatus, importsdk } from "ct/importsdk";
import { ctcol } from "../utils/colors.ts";
import { TypedImporter } from "./importers/iImportHandler.ts";

// deno-lint-ignore require-await
async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForImportOperationToComplete(importer: importsdk, operations: ImportOperationStatus[], pollinterval: number) {
  //console.log('Waiting for the import operation to complete')
  const terminalSpinner = new TerminalSpinner({
    text: "Waiting for the import operation to complete", // telling the user what is going on
    color: "green", // see colors in util.ts
    spinner: SpinnerTypes.windows, // check the SpinnerTypes - see import
  });
  terminalSpinner.start();
  for (const status of operations) {
    let result = await getContainerStatus(importer, status.operationId!); // check the import operation
    while (result.state === "processing") {
      result = await getContainerStatus(importer, status.operationId!);
      await timeout(pollinterval);
    }
    if (terminalSpinner.isSpinning()) terminalSpinner.stop(); // as soon as we have a first result, terminate the spinner
    const message = (result.state === "rejected" || result.state === "validationFailed") ? status.errors : result.state;
    const icon = (result.state === "imported") ? "✅" : "❌";
    const identifier = (result.resourceKey !== undefined) ? result.resourceKey : result.id;
    console.log(`${icon} Item: ${ctcol.blue(identifier)} is ${message}`);
  }
}

function batchReduce<T>(arr: T[], batchSize: number): T[][] {
  return arr.reduce((batches, _curr, i) => {
    if (i % batchSize === 0) batches.push([]);
    batches[batches.length - 1].push(arr[i]);
    return batches;
  }, [] as T[][]);
}

// deno-lint-ignore no-explicit-any
export async function importbatch(containername: string, data: any[], importFunction: TypedImporter, pollinterval = 3000): Promise<ImportOperationStatus[]> {
  const handle = importsdk.init();
  const importContainer = await getOrCreateContainer(handle, containername);
  const batches = batchReduce(data, 20); // split the import into batches of 20

  const operations: ImportOperationStatus[] = [];
  for (const batch of batches) {
    console.log(`Importing a batch of ${ctcol.turquoise(batch.length + "")} items`);
    const op = await importFunction(handle, importContainer, batch);
    operations.push(...op);
  }
  await waitForImportOperationToComplete(handle, operations, pollinterval);
  return operations;
}
