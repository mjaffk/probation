import React from 'react'
import ReactTooltip from 'react-tooltip'

export function PasswordHint() {
	return (<div>
		<span>Пароль должен удовлетворять <a style={{cursor: 'pointer'}} className="font-text text-primary "
		                                     data-multiline="true"
		                                     data-tip="Пароль должен иметь длину не менее 8 знаков <br>
		                                        и может состоять из букв английского алфовита и/или цифр">
		                                        политике безопасности
		</a>
	</span>
		<ReactTooltip place="bottom" type="dark" effect="solid"/>
	</div>)

}