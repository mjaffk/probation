import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import {store} from './store'
import Modal from 'react-modal'

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'))

Modal.setAppElement(document.getElementById('root'))

registerServiceWorker()
