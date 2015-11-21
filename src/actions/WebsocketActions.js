var AppDispatcher = require('../dispatcher/AppDispatcher');
var WebsocketConstants = require('../constants/WebsocketConstants');

var WebsocketActions = {
  create: function(address) {
    AppDispatcher.dispatch({
      actionType: WebsocketConstants.WEBSOCKET_CREATE,
      address: address
    });
  },
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: WebsocketConstants.WEBSOCKET_DESTROY,
      id: id
    });
  },
  send: function(id, message) {
    AppDispatcher.dispatch({
      actionType: WebsocketConstants.WEBSOCKET_SEND,
      id: id,
      message: message
    });
  },
};

module.exports = WebsocketActions;
