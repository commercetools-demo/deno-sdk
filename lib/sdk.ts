import {iConfig } from './interface/iConfig.ts'
import { loglevel } from "./interface/iLogger.ts";
import { iOptions, isdk } from "./interface/isdk.ts"
import { ByProjectKeyRequestBuilder } from 'npm:@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import { Config } from './Config.ts'
import { basesdk } from "./abstract/basesdk.ts"
import { sdkClient } from "./sdkClient.ts"
import {ApiRoot as sdkRoot} from "./sdkClient.ts"
import { OperationStates } from '../importsdk.ts';

export class sdk extends basesdk implements isdk{
   private static instance: sdk;
   private constructor(config: iConfig, apiRoot: sdkRoot, projectKey: string)
   {
      super(config, apiRoot, projectKey)
   }

   /**
    * Get a sdk client, will initialise from .env file,
    * @param {loglevel}[verbose=loglevel.verbose] Enabling or disabling the logger
    * @param {Options} [options] Allows you to choose the login flow
    * @param {iConfig} [manualconfig] pass in a config instead of reading it from the .env file
    * @returns an api root for the project
    */
   static init(verbose: loglevel= loglevel.quiet, options?: iOptions, manualconfig?: iConfig): sdk
   {
      if (!sdk.instance) {
         const config = Config.init(manualconfig)
         let apiRoot:sdkRoot
         if (options?.passwordflow !== undefined) {
            apiRoot = new sdkClient(config, verbose).withUsernamePassword(options.passwordflow.email, options.passwordflow.password)
         }
         else if (options?.anonymous !== undefined) {
            apiRoot = new sdkClient(config, verbose).withAnonymous(options.anonymous.anonymous_id)
         }
         else {
            apiRoot = new sdkClient(config, verbose).withClientCredentials()
         }
         sdk.instance = new sdk(config, apiRoot, config.project_key)
      }
      return sdk.instance
   }

   static getConfig(): iConfig
   {
      return sdk.instance._config
   }

   /**
   * @deprecated please use root() instead, easier to use, this returns the root with the right project key
    */
   public apiRoot(): sdkRoot {
      return this._apiRoot as sdkRoot;
   }

   public root(): ByProjectKeyRequestBuilder {
      const aroot = this._apiRoot as sdkRoot
      return aroot.withProjectKey({projectKey: this._projectKey})
   }
}
