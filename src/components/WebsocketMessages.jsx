import React from 'react'
import classNames from 'classnames'
import MessageConstants from '../constants/MessageConstants'

class MessageItem extends React.Component {
  getIconClassNames(type) {
    return classNames('middle aligned icon', {
      'flag': type === MessageConstants.TYPE_OPEN || type === MessageConstants.TYPE_CLOSE,
      'warning circle': type === MessageConstants.TYPE_DISCONNECT,
      'warning sign': type === MessageConstants.TYPE_ERROR,
      'announcement': type === MessageConstants.TYPE_MESSAGE
    })
  }
  render() {
    var message = this.props.message;
    return (
      <div className="item">
        <i className={ this.getIconClassNames(message.type) }></i>
        <div className="content">
          <div className="header">{message.datetime.toString()}</div>
          {message.address} [{message.type}] { message.content ? message.content : false}
        </div>
      </div>
    )
  }
}
MessageItem.propTypes = {
  message: React.PropTypes.shape({
    datetime: React.PropTypes.object,
    type: React.PropTypes.string,
    content: React.PropTypes.string
  })
}

class MessageList extends React.Component {
  render() {
    var items = this.props.messages ? this.props.messages.map(function(message, index) {
      return <MessageItem key={index} message={message} />
    }) : null;
    return (
      <div className="ui list">
        {items}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.array
}

export default MessageList;
