import React from 'react'

export default function Checkbox({input, label, id, meta: {touched, error}}) {
	return (<div className="form-group form-check">
		<label className={`${touched && (error && 'text-danger')} form-check-label`}>
			<input className="form-check-input" {...input}
			       type='checkbox'/>
			{label}
		</label>
		{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
	</div>)
}