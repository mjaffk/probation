import Modal from "react-modal"
import React, {PureComponent} from "react"

export default class AlertModal extends PureComponent {
	state = {
		isOpen: true
	}

	render() {
		const {style, title, message, buttonLabel} = this.props

		const closeModal = () => this.setState({isOpen: false})

		return (
			<Modal
				shouldCloseOnOverlayClick={false}
				isOpen={this.state.isOpen}
				onRequestClose={closeModal}
				style={style}
				contentLabel={title}>
				<div className='text-justify m-auto'>
					<div>
						{message}
						<div>
							<button className='btn btn-primary float-right mt-3' onClick={closeModal}>{buttonLabel}</button>
						</div>
					</div>

				</div>
			</Modal>
		)
	}
}