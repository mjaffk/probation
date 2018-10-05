import React from 'react'

export function PasswordHint() {
	return (
		<span>Пароль должен удовлетворять <span className="font-text text-primary " data-tip="Пароль должен иметь длину не менее 8 знаков и может состоять из любых символов: русские или латинские буквы, цифры, спецсимволы.">политике безопасности</span></span>
	)

}