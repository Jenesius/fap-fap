import {Response} from "express";

export default function setCookies(res: Response, tokens: {accessToken: string, refreshToken: string}) {
	res.cookie('accessToken', tokens.accessToken, { httpOnly: true, sameSite: "none", secure: true });
	res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, sameSite: "none", secure: true });
}
