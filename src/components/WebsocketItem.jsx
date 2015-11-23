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
      <div className="ui inverted segment">
        <div className="ui attached inverted divided list">
          <div>
            {websocket.address}
          </div>
          <div>
            {
              websocket.isOpen() ?
                <a href="#" onClick={this._handleWebsocketClose.bind(this)}>[ close ]</a> :
                <a href="#" onClick={this._handleWebsocketDestroy.bind(this)}>[ destroy ]</a>
            }
          </div>
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