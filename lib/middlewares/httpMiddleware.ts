import { HttpMiddlewareOptions } from "npm:@commercetools/sdk-client-v2/dist/declarations/src/types/sdk.d.ts";
import { iConfig } from "../interface/iConfig.ts";

export const httpMiddleware = (config: iConfig): HttpMiddlewareOptions => {
   return {
      host: config.api_url,
      fetch: fetch
   };
}