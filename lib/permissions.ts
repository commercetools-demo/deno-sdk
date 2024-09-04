import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts"

export const checkPermissions = () => {
	const env = Deno.permissions.querySync({ name: "env" })
	const net = Deno.permissions.querySync({ name: "net" })
	const file = Deno.permissions.querySync({ name: "read" })

	if (env.state !== "granted") {
		console.log(
			colors.red("the sdk needs permissions to read from .env files"),
		)
		console.log(
			colors.brightRed("add the option --allow-env to the commandline"),
		)
		Deno.exit(-1)
	}

	if (net.state !== "granted") {
		console.log(
			colors.red("the sdk needs permissions to read from the network"),
		)
		console.log(
			colors.brightRed("add the option --allow-net to the commandline"),
		)
		Deno.exit(-1)
	}

	if (file.state !== "granted") {
		console.log(
			colors.red("the sdk needs file permissions to read from a .env file"),
		)
		console.log(
			colors.brightRed("add the option --allow-read to the commandline"),
		)
		Deno.exit(-1)
	}
}
