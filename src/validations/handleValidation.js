import { messages } from 'joi-translation-pt-br'
import { errorModal } from '../factories/modalFactory'


const theValidationProceeded = (objectToValid, objectValidation) => {
	const objectError = objectValidation.validate(objectToValid, {messages}).error
	const errorMessage = objectError?.details?.[0]?.message

	if (objectError) errorModal(improveErrorText(errorMessage))

	return !objectError
}

const improveErrorText = (errorStr) => {
	const strReplaces = [
		['[ref:password]', 'igual a "Senha"'],
		['name', 'Nome'],
		['email', 'E-mail'],
		['password', 'Senha'],
		['repeatPassword', 'Confirmação da senha'],
		['value', 'Valor'],
		['description', 'Descrição'],
	]

	return strReplaces.reduce((acc, rep) => acc.replace(rep[0], rep[1]), errorStr)
}


export default theValidationProceeded
