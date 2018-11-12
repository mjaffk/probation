import React, {PureComponent} from 'react'
import Icon from '../icon/index'
import {Field} from "redux-form"

class InputPassword extends PureComponent {
	constructor(props) {
		super(props)
		const {type = {open: 'text', close: 'password'}, appendIcon = {open: 'eye-slash', close: 'eye'}} = props
		this.state = {
			inputType: type.close,
			inputAppendIcon: appendIcon.close
		}
	}

	render() {
		const {
			input, placeholder, meta: {touched, error}, prependIcon, hint: Hint, label,
			type = {
				open: 'text',
				close: 'password'
			},
			appendIcon = {
				open: 'eye-slash',
				close: 'eye'
			},
			...rest
		} = this.props

		const {id} = rest
		const {inputType, inputAppendIcon} = this.state

		const openPassword = () => {
			if (inputType === type.close) {
				this.setState({
					inputType: type.open,
					inputAppendIcon: appendIcon.open
				})
			}
			else {
				this.setState({
					inputType: type.close,
					inputAppendIcon: appendIcon.close
				})
			}
		}

		const cursorStyle = {
			cursor: 'pointer'
		}

		return (<div className="form-group text-left">
			{label && id && <label htmlFor={id} className={`${touched && error && 'text-danger'}`}>{label}</label>}
			<div className={`input-group ${touched && (error && 'rounded border border-danger ')}`}>
				{prependIcon && < Icon type='prepend' iconId={prependIcon}/>}
				<input {...input} {...rest} className='form-control' type={inputType} placeholder={placeholder}/>
				<div style={cursorStyle} className="input-group-append">
					< Icon type='append' iconId={inputAppendIcon} onClick={openPassword}/>
				</div>
			</div>
			{touched && (error && <span className="form-control-feedback text-danger small">{error}</span>)}
			{Hint && <div className="font-text text-muted small">{(typeof Hint === 'string') ? Hint : <Hint/>}
			</div>}
		</div>)
	}
}

export default props => <Field {...props} component={InputPassword} />