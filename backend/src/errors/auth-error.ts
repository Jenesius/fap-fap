
export default class AuthError extends Error {
	static telegramKeyNotFounded() {
		return new Error('TELEGRAM_BOT_TOKEN in .env file not founded.');
	}
	static incorrectTelegramData() {
		return new Error('Telegram data is not verified');
	}
}
