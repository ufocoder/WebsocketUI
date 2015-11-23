import 'babel-polyfill'
import 'semantic-ui-css/semantic.css'

import React from 'react'
import ReactDOM from 'react-dom'
import WebsocketUI from './components/WebsocketUI.jsx'

ReactDOM.render(
  <WebsocketUI />,
  document.getElementById('WebsocketUI')
)
