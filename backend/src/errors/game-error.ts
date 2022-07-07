export default class GameError extends Error{
	static UserWithIdNotFounded(userId: string, where?:string) {
		return new GameError(`User with id ${userId} not founded` + (where?` in ${where}.`:'.'))
	}
}