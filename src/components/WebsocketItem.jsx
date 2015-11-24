import _ from 'lodash'
import React from 'react'
import MessageForm from './form/MessageForm.jsx'
import WebsocketMessages from './WebsocketMessages.jsx'
import WebsocketActions from '../actions/WebsocketActions'

class WebsocketItem extends React.Component {
  _handleWebsocketClose(e) {
    e.preventDefault();
    WebsocketActions.close(this.props.id)
    return false;
  }
  _handleWebsocketDestroy(e) {
    e.preventDefault();
    WebsocketActions.destroy(this.props.id)
    return false;
  }
  _onMessageSubmit(message) {
    WebsocketActions.send(this.props.id, message)
  }
  render() {
    var websocket = this.props.websocket;

    return (
      <div className="ui top attached segment">
        <div className="ui top attached label">

          {
            websocket.isOpen() ?
              <i onClick={this._handleWebsocketClose.bind(this)} alt="Disconnect" className="plug link icon"></i>:
              <i onClick={this._handleWebsocketDestroy.bind(this)} alt="Remove" className="trash link icon"></i>
          }
          {websocket.address}
        </div>
        {
          websocket.isOpen() ?
            <MessageForm onSubmit={this._onMessageSubmit.bind(this)} /> :
            false
        }
        <WebsocketMessages messages={websocket.messages} />
      </div>
    )
  }
}

WebsocketItem.propTypes = {
  id: React.PropTypes.number,
  websocket: React.PropTypes.object,
}

export default WebsocketItem;
