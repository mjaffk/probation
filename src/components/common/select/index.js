import React from 'react'
import PropTypes from 'prop-types'
import {Field} from "redux-form"

function Select({input, id, label, meta: {touched, error}, options, placeholder, className, ...rest}) {
	return (<div className={`form-group text-left ${className}`}>
		<label className={`form-control-label ${touched && (error && 'text-danger')}`}
		       htmlFor={id}>{label}</label>
		<select
			className={`input-group form-control navbar-text ${touched && (error && 'rounded border border-danger')}`}
			id={id} {...rest} {...input}>
			<option value="" disabled selected>{placeholder}</option>
			{
				options.length && options.map((option) => <option value={option.index} key={option.index}
				                                           name={option.index}>{option.value}</option>)
			}
		</select>
		{
			touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)
		}
	</div>)
}

Select.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string,
	}),
	options: PropTypes.array,
	placeholder: PropTypes.string,
	input: PropTypes.any,
	className: PropTypes.string,
	rest: PropTypes.any
}

export default props => <Field {...props} component={Select}/>