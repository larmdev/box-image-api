declare namespace Express {
	export interface Request {
		context?: { [key: string]: any },
		session?: { [key: string]: any }
	}
}
