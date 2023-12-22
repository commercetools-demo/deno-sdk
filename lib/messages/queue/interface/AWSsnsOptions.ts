export interface AWSsnsOptions {
   accessKey?: string
   accessSecret?: string
   topicARN: string
   authenticationMode?: "Credentials" | "IAM"
}