import {iConfig } from './interface/iConfig.ts'
import { loglevel } from "./interface/iLogger.ts";
import { iOptions, isdk } from "./interface/isdk.ts"

import { Config } from './Config.ts'
import { basesdk } from "./abstract/basesdk.ts"
import { sdkClient } from "./sdkClient.ts"
import {ApiRoot as sdkRoot} from "./sdkClient.ts"

export class sdk extends basesdk implements isdk{
   private static instance: sdk;
   private constructor(config: iConfig, apiRoot: sdkRoot, projectKey: string)
   {
      super(config, apiRoot, projectKey)
   }

   static init(verbose: loglevel= loglevel.quiet, options?: iOptions, manualconfig?: iConfig): sdk
   {
      if (!sdk.instance) {
         const config = Config.init(manualconfig)
         let apiRoot:sdkRoot
         if (options?.passwordflow) {
            apiRoot = new sdkClient(config, verbose).withUsernamePassword(options.passwordflow.email, options.passwordflow.password)
         }
         else if (options?.anonymous) {
            apiRoot = new sdkClient(config, verbose).withAnonymous(options.anonymous.anonymous_id)
         }
         else {
            apiRoot = new sdkClient(config, verbose).withClientCredentials()
         }
         
         const projectKey = config.project_key
         sdk.instance = new sdk(config, apiRoot, projectKey)
      }
      return sdk.instance
   }

   static getConfig(): iConfig
   {
      return sdk.instance._config
   }


   public apiRoot(): sdkRoot {
      return this._apiRoot as sdkRoot;
   }
}
