import React from 'react'
import Browser from '../models/Browser'
import CreateForm from './form/CreateForm.jsx'
import WebsocketActions from '../actions/WebsocketActions'
import WebsocketStore from '../stores/WebsocketStore'
import WebsocketList from './WebsocketList.jsx'

const defaultAddress = (Browser.isSecureProtocol() ? "wss" : "ws") + "://echo.websocket.org"

function getWebsocketUIState() {
  return {
    websockets: WebsocketStore.getWebsockets()
  }
}

class WebsocketUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = getWebsocketUIState()
  }
  componentDidMount() {
    WebsocketStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount() {
    WebsocketStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange() {
    this.setState(getWebsocketUIState())
  }
  _onSubmit(address) {
      WebsocketActions.create(address)
  }
  render() {
    if (Browser.isSupportWebsocket()) {
      return (
        <div className="ui segment">
          <h3 className="ui header">
            <i className="settings icon"></i>
            <div className="content">Websocket UI</div>
          </h3>
          <div className="ui visible message">
            <p>For test use, URL: {defaultAddress}</p>
          </div>
          <div className="ui clearing divider"></div>
          <CreateForm onSubmit={this._onSubmit.bind(this)} />
          <div className="ui clearing divider"></div>
          <WebsocketList websockets={this.state.websockets} />
        </div>
      )
    } else {
      return (
        <div className="ui negative message">
          <div className="header">
            Attention
          </div>
          <p>
            We're sorry your browser does not support WebSocket
          </p>
        </div>
      )
    }
  }
}

export default WebsocketUI
