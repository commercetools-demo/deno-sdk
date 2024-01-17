import { PasswordAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2/dist/declarations/src/types/sdk.d.ts";
import { iConfig } from "../interface/iConfig.ts";
import { iOptions } from "../interface/isdk.ts";

export const passwordflowStoreAuthMiddleware = (config: iConfig, options: iOptions): PasswordAuthMiddlewareOptions => {
   return {
      credentials: {
         
         clientId: config.client_id,
         clientSecret: config.client_secret,
         user: {
            username: options.passwordflow!.email,
            password: options.passwordflow!.password,
            
         }
      },
      host: config.auth_url,
      projectKey: config.project_key,
      //https://auth.europe-west1.gcp.commercetools.com/oauth/wh-deploy/in-store/key=store-france/customers/token?grant_type=password&username=li.duplock@rhycero.fr&password=password
      oauthUri: `/oauth/${config.project_key}/in-store/key=${options.passwordflow?.storeKey}/customers/token`,
      fetch: fetch
   };
}