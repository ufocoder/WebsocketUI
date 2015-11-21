import React from 'react'
import CreateForm from './form/CreateForm.jsx'
import WebsocketActions from '../actions/WebsocketActions'
import WebsocketStore from '../stores/WebsocketStore'
import WebsocketList from './WebsocketList.jsx'


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
    return (
      <div className="ui segment">
        <h3 className="ui header">
          <i className="settings icon"></i>
          <div className="content">Websocket UI</div>
        </h3>
        <div className="ui clearing divider"></div>
        <CreateForm onSubmit={this._onSubmit.bind(this)} />
        <WebsocketList websockets={this.state.websockets} />
      </div>
    )
  }
}

export default WebsocketUI
