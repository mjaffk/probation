import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import {Field} from 'redux-form'
import PropTypes from "prop-types"


class FileInput extends Component {

	static defaultProps = {
		className: '',
	}

	render() {
		const {className, input: {onChange}, dropzone_options, meta: {error, touched},
			label, classNameLabel, children, ...rest} = this.props

		return (
			<div className={className + (error && touched ? ' has-error ' : '')}>
				{label && <p className={classNameLabel || ''}>{label}</p>}
				<Dropzone
					{...dropzone_options}
					onDrop={(file) => {
						return onChange(file[0])
					}}
					className="dropzone-input"
					{...rest}
				>
					{children}
				</Dropzone>
				{error && touched ? error : ''}
			</div>
		)
	}
}

FileInput.propTypes = {
	dropzone_options: PropTypes.object,
	meta: PropTypes.object,
	label: PropTypes.string,
	classNameLabel: PropTypes.string,
	input: PropTypes.object,
	className: PropTypes.string,
	children: PropTypes.node,
	cbFunction: PropTypes.func,
}

export default props => <Field {...props} component={FileInput}/>