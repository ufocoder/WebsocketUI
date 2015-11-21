import React from 'react'

class CreateForm extends React.Component {
  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.Address.value);
    return false
  }
  render() {
    return (
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
    )
  }
}

CreateForm.propTypes = {
  onSubmit: React.PropTypes.func
}

export default CreateForm;
