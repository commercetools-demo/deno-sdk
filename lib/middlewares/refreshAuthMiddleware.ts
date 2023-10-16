import { RefreshAuthMiddlewareOptions } from "npm:@commercetools/sdk-client-v2/dist/declarations/src/types/sdk.d.ts";
import { iConfig } from "../interface/iConfig.ts";
import { iOptions } from "../interface/isdk.ts";

export const refreshAuthMiddleware = (config: iConfig, options: iOptions): RefreshAuthMiddlewareOptions => {
  return {
    credentials: {
      clientId: config.client_id,
      clientSecret: config.client_secret,
    },
    refreshToken: options.anonymous?.refresh_token!,
    host: config.auth_url,
    projectKey: config.project_key
  };
}