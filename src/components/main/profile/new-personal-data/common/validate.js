import validateSnils from '../../../../../utils/snils-validation'

export const validate = values => {
  const errors = {}, error = {}
  if (!validateSnils(values.snils, error)) {
    errors.snils = error.message
  }
  return errors
}