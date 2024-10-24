import { extensionsListener, CustomerHandler, responseCode, type iCustomerMessage, type iCustomerResponse, type iTriggers } from "../mod.ts"

class customerLogMessage {
	static async handle(msg: iCustomerMessage): Promise<iCustomerResponse> {
		const customer = msg.resource.obj
		console.log(`incoming customer ${msg.action} message for customer with key: ${customer.key}`)
		return {
			result: {
				code: responseCode.SUCCESS,
			}
		}
	}
}

await new extensionsListener().listen([
	{
		actions: ["Create", "Update"],
		resource: "customer",
		handler: new CustomerHandler().add(customerLogMessage)
	}
])