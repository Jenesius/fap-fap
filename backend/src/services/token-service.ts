import jwt from "jsonwebtoken";
export default class tokenService{
	static generate(payload: any) {
		
		const accessToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] as string, {expiresIn: '1m'})
		const refreshToken =jwt.sign(payload, process.env["JWT_REFRESH_SECRET"] as string, {expiresIn: '30d'})
		
		return {accessToken, refreshToken};
	}

	/**
	 * @description Generation token of data. Using to provide access to read some
	 * data.
	 */
	static generateTokenData(payload: any, expiresIn: string = '1m') {
		return jwt.sign(payload, '123', {expiresIn});
	}
	
	static verifyTokenData(token: string) {
		
		try {
			const payload = jwt.verify(token, '123');
			return payload
		} catch(err) {
			return false;
		}

	}
	/**
	 * Проверка decode данных на свежесть.
	 * @return true if decode data is expired
	 * */
	static isExpired(decode: any) {
		if (!decode || typeof decode === 'string') throw new Error('Wrong payload data.');
		
		const {exp} = decode;
		
		if (!exp) return true;
		
		return Date.now() >= exp * 1000;
	}
}
