class Browser {
  static isSupportWebsocket() {
    return "WebSocket" in window
  }
  static isSecureProtocol() {
    return window.location.protocol == 'https:'
  }
}

export default Browser
