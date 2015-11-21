import React from 'react'

class MessageForm extends React.Component {
  _onSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.refs.Message.value);
    return false
  }
  render() {
    return (
      <form className="ui form" onSubmit={this._onSubmit.bind(this)}>
        <div className="two fields">
          <div className="six wide field">
            <input placeholder="Message" type="text" ref="Message" />
          </div>
          <div className="six wide field">
            <button className="ui primary submit button" type="submit">Send</button>
          </div>
        </div>
      </form>
    )
  }
}

MessageForm.propTypes = {
  onSubmit: React.PropTypes.func
}

export default MessageForm;
