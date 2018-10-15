import React from 'react'
import {SERVER} from "../../../constants"

export default function Checkbox({input, id, meta: {touched, error}}) {
	return (<div className="form-group form-check">
		<label className={`${touched && (error && 'text-danger')} form-check-label`}>
			<input className="form-check-input" {...input}
			       type='checkbox'/>
			Для успешной регистрации необходимо подтвердить согласие с <a
			target="_blank"
			href={`${SERVER}/project-rules`}>
			правилами проекта
		</a>
		</label>
		{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
	</div>)
}