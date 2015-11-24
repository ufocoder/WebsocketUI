import React from 'react'
import Browser from '../../models/Browser'

const DEFAULT_PROTOCOL = Browser.isSecureProtocol() ? "wss" : "ws"
const DEFAULT_HOSTNAME = "echo.websocket.org"
const DEFAULT_ADDRESS = DEFAULT_PROTOCOL + "://" + DEFAULT_HOSTNAME

class CreateForm extends React.Component {
  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.Address.value);
    return false
  }
  _setDefaultAddress() {
    this.refs.Address.value = DEFAULT_ADDRESS
  }
  render() {
    return (
      <div>
        <div className="ui visible message">
          <p>Testing URL: {DEFAULT_ADDRESS}, <a href="#" onClick={this._setDefaultAddress.bind(this)}>use it now</a></p>
        </div>
        <form className="ui form" onSubmit={this._onSubmit.bind(this)}>
          <div className="two fields">
            <div className="six wide field">
              <input placeholder="WebSocket address" type="text" ref="Address" />
            </div>
            <div className="six wide field">
              <button type="submit" className="ui green submit button">Connect</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

CreateForm.propTypes = {
  onSubmit: React.PropTypes.func
}

export default CreateForm;
