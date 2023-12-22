import { SpinnerTypes, TerminalSpinner } from "spinner"
import { delay, ctcol } from "../../../utils/utils.ts";
import { iNgrokConfig } from "./iNgrokConfig.ts";
import { iProxy, iProxyConfig } from "../iProxy.ts";


export class Ngrok implements iProxy{
   private subprocess: Deno.ChildProcess | undefined = undefined
   private static instance: Ngrok | undefined = undefined
   private API_KEY  = ""
   private API_ENDPOINT = ""
   private constructor() {
      console.log(ctcol.turquoise(`Ngrok::constructor`))
   }

   async init(config: iProxyConfig): Promise<boolean> {
      console.log(ctcol.orange(`NGROK::init`))

      await Ngrok.start(config.config) 
      return true
   }

   async getURL(): Promise<string | undefined> {
      return await this.getPublicUrl()
   }
   async close(): Promise<boolean> {
      console.log(ctcol.orange(`NGROK::close`))
      return await this.stop()
   }

   static getInstance() {
      if (!Ngrok.instance) Ngrok.instance = new Ngrok()
      return Ngrok.instance 
   }

   private static async start(config: iNgrokConfig): Promise<Ngrok | undefined> {
      console.log(ctcol.orange(`starting NGROK`))
      if (config === undefined) throw new Error("No NGROK config provided")
      if (config.API_KEY === undefined) throw new Error("No NGROK API_KEY provided in .env")
      if (config.API_ENDPOINT === undefined) throw new Error("No NGROK API_ENDPOINT provided in .env")
      const instance = Ngrok.getInstance()
      
      instance.API_KEY = config.API_KEY
      instance.API_ENDPOINT = config.API_ENDPOINT
      const command = new Deno.Command("ngrok", {
         args: [
            "start",
            "ct"
         ],
         stdout: "piped",
         stderr: "piped"
      })
      try {
         instance.subprocess = await command.spawn();
      }
      catch(_error) {
         console.log(ctcol.bgorange(`Could not start NGROK, make sure it is installed, see: https://ngrok.com/download`))
         console.log(ctcol.orange('also provide a NGROK_API_KEY and NGROK_API_ENDPOINT in your .env file'))
         Deno.exit(-1)
      }
      console.log(ctcol.orange('NGROK started'))
      return instance
   }
   
   private async stop(): Promise<boolean> {
      console.log(ctcol.orange(`stopping NGROK`))
      if (this.subprocess != undefined) await this.destroy(this.subprocess)
      //await delay(3000)
      console.log(ctcol.orange(`NGROK stopped`))
      return true
   }
   
   private async getPublicUrl(): Promise<string | undefined> {
      const response = await fetch(this.API_ENDPOINT, {
         headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            Accept: "application/json",
            version: "2",
            "Ngrok-Version": "2"
         },
      })
      const result = await response.json()
      if (result === undefined) return undefined
      if (result.endpoints === undefined) return undefined
      if (result.endpoints.length) return result.endpoints[0].public_url
   }
   
   private async destroy(process: Deno.ChildProcess): Promise<void> {
      try {
         await process.stdout.cancel()
         await process.stderr.cancel()
         await process.kill("SIGTERM")
         await process.unref()
      }
      catch (_error)
      {
         console.log()
      }
      const terminalSpinner = new TerminalSpinner({
         text: ctcol.orange("Waiting for ngrok to terminate"), // telling the user what is going on
         color: "green",
         spinner: SpinnerTypes.windows, // check the SpinnerTypes - see import
      });
      terminalSpinner.start();
      for (let x =0; x<100 ; x++) {
         if (await this.getPublicUrl() === undefined) break
         await delay(1000)
      }
      if (terminalSpinner.isSpinning()) terminalSpinner.stop()
      console.log(ctcol.orange("NGROK subprocess is stopped"))
   }
}

