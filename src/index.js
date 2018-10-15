import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import Modal from 'react-modal'

Modal.setAppElement(document.getElementById('root'))

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'))


registerServiceWorker()
