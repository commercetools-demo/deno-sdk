export interface isdk {
	apiRoot(): unknown // sdk returns an API root with the correct Type (API, Import, History etc)
}

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
