import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';
import PropTypes from "prop-types"


class FileInput extends Component {

	static defaultProps = {
		className: '',
		cbFunction: (file) => {console.log(file)},
	};

	render() {
		const { className, input: { onChange }, dropzone_options, meta: { error, touched }, label, classNameLabel, children, name, cbFunction } = this.props;

		return (
			<div className={`${className}` + (error && touched ? ' has-error ' : '')}>
				{label && <p className={classNameLabel || ''}>{label}</p>}
				<Dropzone
					{...dropzone_options}
					onDrop={(f) => {
						cbFunction(f[0]);
						return onChange(f[0]);
					}}
					className="dropzone-input"
					name={name}
				>
					{children}
				</Dropzone>
				{error && touched ? error : ''}
			</div>
		);
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

export default props => <Field {...props} component={FileInput} />