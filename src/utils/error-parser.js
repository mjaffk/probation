export default function errorParser(error) {
	if (!error) return error

	const errorType = error.message

	let usefulError = {}

	switch (errorType) {
		case 'Network Error':
			usefulError.errorToUser = `В настоящий момент сервер временно недоступен,
			пожалуйста, попробуйте повторить попытку позже`
			break

		case 'Request failed with status code 409':
			usefulError = {
				...error.response.data
			}
			break

		case 'Request failed with status code 401':
			usefulError.errorToUser = 'Неверный логин или пароль. Прооверьте, пожалуйста, раскладку и Caps Lock'
			break

		default:
			usefulError.errorToUser = 'Произошла ошибка, пожалуйста, попробуйте повторить попытку позже'
	}

	return usefulError
}