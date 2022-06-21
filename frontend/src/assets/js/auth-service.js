import axios from "axios";

export default class authService {
	static telegramAuth(a) {
		return axios.post('/api/auth/telegram', a, {
			withCredentials: true,
		})
	}
	static checkAuth(){
		return axios.get("/api/close-route")
	}
	static testAuth() {
		return axios.post('/api/close-auth', {}, {
			withCredentials: true,
		})
	}
}
