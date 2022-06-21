import jwt from "jsonwebtoken";
export default class tokenService{
	static generate(payload: any) {
		
		const accessToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] as string, {expiresIn: '1m'})
		const refreshToken =jwt.sign(payload, process.env["JWT_REFRESH_SECRET"] as string, {expiresIn: '30d'})
		
		return {accessToken, refreshToken};
	}

	
}
