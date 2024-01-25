import { config as dotEnvConfig } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { iConfig } from './interface/iConfig.ts';
import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";

export class Config{
   private _config: iConfig

   /**
    * Config entry point to read APIclient information from .env file, or when deployed to deno from environment variables
    * APIclient can also be passed as options
    * @param options: optional iConfig APIclient
    * @returns config: iConfig
    */
   static init(options?:iConfig): iConfig
   {
      if (options === undefined)
      {
         if (Deno.env.get('DENO_DEPLOYMENT_ID') === undefined)
         {        
            if (!Config.checkEnvFile('.env')){
               console.log(colors.red(`No .env file found, make sure a .env file with client information is present in the root`))
               Deno.exit()
            }
            dotEnvConfig({ export: true}); // here we load the .env file
         }
         // check if we have all the env variables we need, trow an error when one is missing
         Config.checkApiURL()
         Config.checkAuthURL()
         Config.checkProjectKey()
         Config.checkClientID()
         Config.checkClientSecret()
         
         // now that we are sure we have all variables, build the config object and return it
         const config: iConfig =
         {
            api_url: Deno.env.get('CTP_API_URL')! ,
            auth_url: Deno.env.get('CTP_AUTH_URL')!,
            project_key: Deno.env.get('CTP_PROJECT_KEY')!,
            client_id: Deno.env.get('CTP_CLIENT_ID')!,
            client_secret: Deno.env.get('CTP_CLIENT_SECRET')!,
         }
         config.import_url = (Deno.env.get('CTP_IMP_URL') !== undefined) ? Deno.env.get('CTP_IMP_URL') : Config.constructImportURL(config.api_url)
         config.history_url = (Deno.env.get('CTP_HST_URL') !== undefined) ? Deno.env.get('CTP_HST_URL') : Config.constructHistoryURL(config.api_url)
         //if (Deno.env.get('CTP_ML_URL'))  config.ml_url = Deno.env.get('CTP_ML_URL')
         
         return new Config(config)._config
      }
      return new Config(options)._config
   }

   // function to make sure import url is allways present, even if not included in the .env file
   private static constructImportURL(apiurl: string): string {
      return apiurl.replace("://api", "://import")
   }

   // function to make sure history url is allways present, even if not included in the .env file
   private static constructHistoryURL(apiurl: string): string {
      return apiurl.replace("://api", "://history")
   }

   public get(): iConfig  {
      return this._config;
   }

   // private members

   private constructor(options: iConfig) {
      this._config = options
   }

   private static checkEnvFile(filename: string): boolean
   {
      try {
         const file = Deno.openSync(filename, { read: true });
         file.statSync()
         file.close()
         return true
      }
      catch (_error)
      {
         console.log(colors.red(`environment file ${filename} is not found `))
         Deno.exit()
      }
   }

   private static checkEnvValue(value: string): boolean
   {
      if (Deno.env.get(value) !== undefined) return true
      console.log(colors.red(`Environment variable ${value} is missing`))
      Deno.exit()
   }

   private static checkApiURL(): boolean
   {
      return Config.checkEnvValue('CTP_API_URL')
   }

   private static checkAuthURL(): boolean
   {
      return Config.checkEnvValue('CTP_AUTH_URL')
   }

   private static checkProjectKey(): boolean
   {
      return Config.checkEnvValue('CTP_PROJECT_KEY')
   }

   private static checkClientID(): boolean
   {
      return Config.checkEnvValue('CTP_CLIENT_ID')
   }

   private static checkClientSecret(): boolean
   {
      return Config.checkEnvValue('CTP_CLIENT_SECRET')
   }
}