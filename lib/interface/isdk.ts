

export interface iOptions {
	passwordflow?: {
		email: string
		password: string
		storeKey?: string
	}
	anonymous?: {
		anonymous_id: string
		refresh_token?: string
	}
}
