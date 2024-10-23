<img src="https://deno.land/logo.svg" width=40px/>
<img src="https://commercetools.com/_build/images/logos/commercetools-logo-desktop.svg" width=150px/>

# deno commercetools api 🦕

## A small helper for using commercetools in combination with the deno runtime

_**How to get started**_

Install the Deno runtime on your machine, following this guidance: https://deno.land/

_**Prerequisites**_

A `.env` file in the root that contains the following:

```ini
CTP_PROJECT_KEY=**-********-****
CTP_CLIENT_SECRET=************
CTP_CLIENT_ID=****************
CTP_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com
CTP_API_URL=https://api.europe-west1.gcp.commercetools.com
CTP_SCOPES=manage_project:**-********-****
```

install the [language server](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) client for Deno
in vscode, to make sure that vscode understands your code is for Deno and not for Node.

***using the api with Client Credentials Flow ***

```javascript
import { sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts"

const handle = sdk.init()
const result = await handle
	.root()
	.get()
	.execute()
console.log(result.body)
```

Copy the text above in a file called `projectsample.ts` and run with:

`deno run -A projectsample.ts`

or, run it without copying anything:

`deno run -A https://deno.land/x/commercetools_demo_sdk/projectsample.ts`

or even nicer, install it

```
deno install -A https://deno.land/x/commercetools_demo_sdk/projectsample.ts
```

```
projectsample
```

_**using the api with password flow**_

```javascript
import { loglevel, sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts"

const handle = sdk.init(loglevel.quiet, {
	passwordflow: {
		email: "ocanne.ratnage@quinu.fr",
		password: "password",
		storeKey: "bbe4225c-b48f-4773-9a3c-ca7b685f171a",
	},
})

const result = await handle
	.root()
	.get()
	.execute()
console.log(result.body)
```

_**using the api with anonymous flow**_

```javascript
import { loglevel, sdk } from "https://deno.land/x/commercetools_demo_sdk/clientsdk.ts"

const handle = sdk.init(loglevel.quiet, {
	anonymous: {
		anonymous_id: "myotherid",
	},
})

const result = await handle
	.root()
	.get()
	.execute()
console.log(result.body)
```
