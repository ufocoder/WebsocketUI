import MessageConstants from './constants/MessageConstants'

class WebsocketWrapper {
  constructor(url) {
    this.address = url
    this.state = url
    this.messages = []

    const self = this

    try {
      this.socket = new WebSocket(url)

      this.socket.onopen = function(e){
        self.pushMessage(MessageConstants.TYPE_OPEN);
      }

      this.socket.onclose = function(event) {
        if (event.wasClean) {
          self.pushMessage(MessageConstants.TYPE_CLOSE);
        } else {
          self.pushMessage(MessageConstants.TYPE_DISCONNECT);
        }
        self.pushMessage(MessageConstants.TYPE_ERROR, event.reason);
      }

      this.socket.onmessage = function(event) {
        self.pushMessage(MessageConstants.TYPE_MESSAGE, event.data);
      };

      this.socket.onerror = function(error) {
        self.pushMessage(MessageConstants.TYPE_ERROR, error.message);
      };
    } catch (error) {
      self.pushMessage(MessageConstants.TYPE_ERROR, error.toString())
    }
  }
  pushMessage(type, content) {
    this.messages.unshift({
      datetime: new Date(),
      type: type,
      content: content,
    })
  }
}

export default WebsocketWrapper
