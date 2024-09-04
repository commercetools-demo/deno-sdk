import { ImportContainer, ImportOperation, importsdk } from "../../importsdk.ts"

export async function getContainers(
	importer: importsdk,
): Promise<ImportContainer[]> {
	const result = await importer
		.root()
		.importContainers()
		.get()
		.execute()
	return result.body.results
}

export async function getContainer(
	importer: importsdk,
	key: string,
): Promise<ImportContainer | undefined> {
	try {
		const result = await importer
			.root()
			.importContainers()
			.withImportContainerKeyValue({ importContainerKey: key })
			.get()
			.execute()
		return result.body
	} catch (_error: unknown) {
		return undefined
	}
}

export async function createContainer(
	importer: importsdk,
	name: string,
): Promise<ImportContainer> {
	const result = await importer
		.root()
		.importContainers()
		.post({ body: { key: name } })
		.execute()
	return result.body
}

export async function getOrCreateContainer(
	importer: importsdk,
	name: string,
): Promise<ImportContainer> {
	const existing = await getContainer(importer, name)
	if (existing === undefined) {
		return await createContainer(importer, name)
	}
	return existing!
}

export async function getContainerStatus(
	importer: importsdk,
	importID: string,
): Promise<ImportOperation> {
	const result = await importer
		.root()
		.importOperations()
		.withIdValue({ id: importID })
		.get({})
		.execute()
	return result.body
}
