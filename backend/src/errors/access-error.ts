export default class AccessError extends Error {
	static InvalidToken(token: any)  {
		return new AccessError('Invalid token. Maybe payload was incorrect.');
	}
	static TokenPayloadNotInformative(token: any) {
		return new AccessError(`Token's payload dont include needed data.`)
	}
}
