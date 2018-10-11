import Modal from "react-modal"
import React, {PureComponent} from "react"

export default class AlertModal extends PureComponent {
	state = {
		isOpen: true
	}

	render() {
		const {style, title, message, buttonLabel} = this.props
		console.log(style, title, message, buttonLabel)

		const closeModal = () => this.setState({isOpen: false})

		return (
			<Modal
				shouldCloseOnOverlayClick={false}
				isOpen={this.state.isOpen}
				onRequestClose={closeModal}
				style={style}
				contentLabel={title}>
				<div>{message}</div>
				<button className='pull-right btn' onClick={closeModal}>{buttonLabel}</button>
			</Modal>
		)
	}
}