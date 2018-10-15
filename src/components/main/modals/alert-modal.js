import Modal from "react-modal"
import React, {PureComponent} from "react"
import {compose} from 'redux'


export default class AlertModal extends PureComponent {
	state = {
		isOpen: true
	}

	render() {
		const {title, message, buttonLabel, onAfterClose, ...options} = this.props

		const closeModal = () => this.setState({isOpen: false})

		return (
			<Modal
				shouldCloseOnOverlayClick={false}
				isOpen={this.state.isOpen}
				onRequestClose={closeModal}
				contentLabel={title}
				{...options}
			>
				<div className='text-justify m-auto'>
					<div>
						{message}
						<div>
							<button className='btn btn-primary float-right mt-3'
							        onClick={onAfterClose ? compose(closeModal, (onAfterClose)) : closeModal}>{buttonLabel}</button>
						</div>
					</div>

				</div>
			</Modal>
		)
	}
}