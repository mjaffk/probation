export const required = value => (value || typeof value === 'number' ? undefined : 'Поле обязательно')

export const requiredConformation = value => (value || typeof value === 'number' ? undefined : 'Согласие обязательно')

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

// example: const maxLength15 = maxLength(15)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

// example:  const minLength2 = minLength(2)

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

// example:  const minValue13 = minValue(13)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Некорректный адрес электронной почты'
  : undefined


export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
  ? 'Invalid phone number, must be 10 digits'
  : undefined