import _ from 'lodash'
import React from 'react'
import MessageForm from './form/MessageForm.jsx'
import WebsocketMessages from './WebsocketMessages.jsx'
import WebsocketActions from '../actions/WebsocketActions'

class WebsocketItem extends React.Component {
  _handleWebsocketRemove(e) {
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
            {websocket.address} <a href="#" onClick={this._handleWebsocketRemove.bind(this)}>[ disconnect ]</a>
        </div>
        <MessageForm onSubmit={this._onMessageSubmit.bind(this)} />
        <WebsocketMessages messages={websocket.messages} />
      </div>
    )
  }
}

WebsocketItem.propTypes = {
  id: React.PropTypes.number,
  websocket: React.PropTypes.object,
}

class WebsocketList extends React.Component {
  hasData() {
    return _.size(this.props.websockets)
  }
  render() {
    if (this.hasData()) {
      return (
        <div>
          { this.props.websockets.map(function(websocket, id) {
              return <WebsocketItem key={id} id={id} websocket={websocket} />
          }) }
        </div>
      )
    } else {
      return (
        <div className="ui inverted segment">
          <div className="ui inverted relaxed divided list">
            There're no connections
          </div>
        </div>
      )
    }
  }
}

WebsocketList.propTypes = {
  websockets: React.PropTypes.array
}

export default WebsocketList;
