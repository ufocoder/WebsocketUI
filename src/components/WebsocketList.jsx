import _ from 'lodash'
import React from 'react'
import WebsocketItem from './WebsocketItem.jsx'

class WebsocketList extends React.Component {
  hasData() {
    return _.size(this.props.websockets) > 0
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
