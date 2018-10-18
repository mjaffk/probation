import React from 'react'

export default function Select({id, label, meta: {touched, error}, options, placeholder, input, className, ...rest}) {
	return (<div className={`form-group text-left ${className}`}>
		<label className={`form-control-label ${touched && (error && 'text-danger')}`}
		       htmlFor={id}>{label}</label>
		<select className={`input-group form-control navbar-text ${touched && (error && 'rounded border border-danger')}`}
		        id={id} {...rest} {...input}>
			<option value="" disabled selected>{placeholder}</option>
			{
				options && options.map((option) => <option value={option.index} key={option.index}
				                                           name={option.index}>{option.value}</option>)
			}
		</select>
		{
			touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)
		}
	</div>)
}