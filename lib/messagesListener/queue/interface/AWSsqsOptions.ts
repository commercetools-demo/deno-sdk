export interface AWSsqsOptions {
	accessKey?: string
	accessSecret?: string
	queueUrl: string
	region: string
	authenticationMode?: "Credentials" | "IAM"
}
