export const checkPermissions = () => {
	const env = Deno.permissions.querySync({ name: "env" })
	const net = Deno.permissions.querySync({ name: "net" })
	const file = Deno.permissions.querySync({ name: "read" })

	if (env.state !== "granted") {
		console.log("%cthe sdk needs permissions to read from .env files", "color: red")
		console.log("%cadd the option --allow-env to the commandline", "color: red")
		Deno.exit(-1)
	}

	if (net.state !== "granted") {
		console.log("%cthe sdk needs permissions to read from the network", "color: red")
		console.log("%cadd the option --allow-net to the commandline", "color: red")
		Deno.exit(-1)
	}

	if (file.state !== "granted") {
		console.log("%cthe sdk needs file permissions to read from a .env file", "color: red")
		console.log("%cadd the option --allow-read to the commandline", "color: red")
		Deno.exit(-1)
	}
}
