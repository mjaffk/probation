import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import {store} from './store'
import Popup from 'react-popup'


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'))

ReactDOM.render(
	<Popup/>,
	document.getElementById('popupContainer')
)

registerServiceWorker()
