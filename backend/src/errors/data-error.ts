
export default class DataError extends Error {
	static wrongId() {
		return new Error('Wrong id.');
	}
	static objectNotFoundWithId(id: any) {
		return new Error(`Object with id ${id} not founded`)
	}
}
