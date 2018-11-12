import React from 'react'
import Icon from '../icon/index'
import {Field} from "redux-form/"

function Input({placeholder, label, type="text", meta: {touched, error}, prependIcon, appendIcon,
	               hint: Hint, className, input, ...rest}) {
	const {id} = rest
	return (<div className={`form-group text-left ${className}`}>
		{label && id && <label htmlFor={id} className={`${touched && error && 'text-danger'}`}>{label}</label>}
		<div className={`input-group ${touched && (error && 'rounded border border-danger ')}`}>
			{prependIcon && < Icon type='prepend' iconId={prependIcon}/>}
			<input {...rest} {...input} className='form-control' type={type} placeholder={placeholder}/>
			{appendIcon && < Icon type='append' iconId={appendIcon}/>}
		</div>


		{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
		{Hint && <div className="font-text text-muted small">{(typeof Hint === 'string') ? Hint : <Hint/>} </div>}
	</div>)
}

export default props => <Field {...props} component={Input}/>