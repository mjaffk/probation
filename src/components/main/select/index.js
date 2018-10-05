import React from 'react'

export default function Select({input, id, label, meta: {touched, error}}) {
	return (<div className="form-group text-left">
		<div>
			<label htmlFor={id} className={`${touched && (error && 'text-danger')} form-check-label`}>{label}</label>
			<input className="form-check-input" id={id} {...input}
			       type='checkbox'/>

		</div>
		{
			touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)
		}
	</div>)
}