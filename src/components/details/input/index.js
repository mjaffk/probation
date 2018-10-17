import React from 'react'
import Icon from '../icon/index'

export default function Input({
	                              placeholder, label, type, meta: {touched, error}, prependIcon,
	                              appendIcon, hint: Hint, className, input, ...rest
                              }) {
	const {id} = rest
	return (<div className={`form-group text-left ${className}`}>
		{label && id && <label htmlFor={id}>{label}</label>}
		<div className={`input-group ${touched && (error && 'rounded border border-danger ')}`}>
			{prependIcon && < Icon type='prepend' iconId={prependIcon}/>}
			<input {...rest} {...input} className='form-control' type={type} placeholder={placeholder}/>
			{appendIcon && < Icon type='append' iconId={appendIcon}/>}
		</div>


		{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
		{Hint && <div className="font-text text-muted small">{(typeof Hint === 'string') ? Hint : <Hint/>} </div>}
	</div>)
}