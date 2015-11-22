import MessageConstants from './constants/MessageConstants'

const STATE_CONNECTING = 0
const STATE_OPEN = 1
const STATE_CLOSING = 2
const STATE_CLOSED = 3

const socketProperty = Symbol()
const callbackProperty = Symbol()

class WebsocketWrapper {
  constructor(url, callback) {
    this.address = url
    this.messages = []
    this[callbackProperty] = callback

    const self = this

    try {
      this[socketProperty] = new WebSocket(url)

      this[socketProperty].onopen = function(e){
        self.pushMessage(MessageConstants.TYPE_OPEN);
      }

      this[socketProperty].onclose = function(event) {
        if (event.wasClean) {
          self.pushMessage(MessageConstants.TYPE_CLOSE);
        } else {
          self.pushMessage(MessageConstants.TYPE_DISCONNECT);
        }
        self.pushMessage(MessageConstants.TYPE_ERROR, event.reason);
      }

      this[socketProperty].onmessage = function(event) {
        self.pushMessage(MessageConstants.TYPE_MESSAGE, event.data);
      };

      this[socketProperty].onerror = function(error) {
        self.pushMessage(MessageConstants.TYPE_ERROR, error.message);
      };
    } catch (error) {
      self.pushMessage(MessageConstants.TYPE_ERROR, error.toString())
    }
  }
  send(message){
    if (this.isOpen()){
      this[socketProperty].send(message)
    }
  }
  close(){
    this[socketProperty].close()
  }
  isOpen() {
    return this[socketProperty] && this[socketProperty].readyState == STATE_OPEN
  }
  isClosed() {
    return this[socketProperty] && this[socketProperty].readyState == STATE_CLOSED
  }
  pushMessage(type, content) {
    this.messages.unshift({
      datetime: new Date(),
      type: type,
      content: content,
    })
    this[callbackProperty]()
  }
}

export default WebsocketWrapper
