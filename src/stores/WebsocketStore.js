import _ from 'lodash'
import AppDispatcher from '../dispatcher/AppDispatcher'
import EventEmitter from 'events'
import WebsocketWrapper from '../models/Websocket'
import WebsocketConstants from '../constants/WebsocketConstants'

var _websockets = [],
    WebsocketStore;

function createWebsocket (address) {
  _websockets.push(new WebsocketWrapper(address, () => {
    WebsocketStore.emitChange()
  }))
}

function closeWebsocket (id) {
  if (_websockets[id].isOpen()) {
    _websockets[id].close()
  }
}

function sendWebsocketMessage (id, message) {
  if (_websockets[id].isOpen()) {
    _websockets[id].send(message)
  }
}

function destroyWebsocket (id) {
  closeWebsocket(id)
  _websockets.splice(id, 1)
}

WebsocketStore = _.extend({}, EventEmitter.prototype, {
  getWebsockets: function() {
    return _websockets
  },
  emitChange: function() {
    this.emit('change')
  },
  addChangeListener: function(callback) {
    this.on('change', callback)
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  }
})

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case WebsocketConstants.WEBSOCKET_CREATE:
      createWebsocket(action.address);
    break;

    case WebsocketConstants.WEBSOCKET_CLOSE:
      closeWebsocket(action.id);
    break;

    case WebsocketConstants.WEBSOCKET_DESTROY:
      destroyWebsocket(action.id);
    break;

    case WebsocketConstants.WEBSOCKET_SEND:
      sendWebsocketMessage(action.id, action.message)
    break;

    default:
      return true;
  }

  WebsocketStore.emitChange();
  return true;
});

module.exports = WebsocketStore;
