/**
 * The configuration needed to create an API client. The sdk will read the configuration from a .env file when it is not provided as a parameter.
 * The .env file can be created here: https://mc.europe-west1.gcp.commercetools.com/{yourprojectname}/settings/developer/api-clients/new
 * The .env file should look like:
 * ```ini
 * CTP_PROJECT_KEY=xxxx
CTP_CLIENT_SECRET=xxxxx
CTP_CLIENT_ID=xxxx
CTP_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com
CTP_API_URL=https://api.europe-west1.gcp.commercetools.com
CTP_SCOPES=manage_project:xxxx

 */

export interface iConfig {
	/** The key of the project you wan to interact with */
	project_key: string
	/** The client secret for this client */
	client_secret: string
	/** The client id for this client */
	client_id: string
	/** The url of the authorisation endpoint, should be like: https://auth.{region}.commercetools.com/ */
	auth_url: string
	/** The url of the api endpoint, should be like: https://api.{region}.commercetools.com/ */
	api_url: string
	/** The url of the import endpoint, should be like: https://import.{region}.commercetools.com/, will be generated when not supplied */
	import_url?: string
	/** The url of the history endpoint, should be like: https://history.{region}.commercetools.com/, will be generated when not supplied */
	history_url?: string
}
