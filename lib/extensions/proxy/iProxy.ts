export interface iProxy {
   init(config?: iProxyConfig): Promise<boolean>
   getURL(): Promise<string | undefined>
   close(): Promise<boolean>
}

export interface iProxyConfig {
   config: any
}