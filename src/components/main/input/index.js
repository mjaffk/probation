import React from 'react'
import Icon from '../icon/'

export default function Input({input, placeholder, type, meta: {touched, error}, prependIcon, appendIcon, hint: Hint}) {
	return (<div className="form-group text-left">
		<div className={`input-group ${touched && (error && 'rounded border border-danger ')}`}>
			{prependIcon && < Icon type='prepend' iconId={prependIcon}/>}
			<input {...input} className='form-control' type={type} placeholder={placeholder}/>
			{appendIcon && < Icon type='append' iconId={appendIcon}/>}
		</div>
		{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
		{Hint && <div className="font-text text-muted small">{(typeof Hint === 'string') ? Hint : <Hint/>} </div>}
	</div>)
}