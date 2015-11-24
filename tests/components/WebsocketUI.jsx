import React from 'react'
import ReactDOM from 'react-dom';
import WebsocketUI from '../src/components/WebsocketUI.jsx'
import TestUtils from 'react/lib/ReactTestUtils'

describe('WebsocketUI', function () {
  it('renders without problems when browser support webpack', function () {
    var component = TestUtils.renderIntoDocument(<WebsocketUI />),
        componentNode = ReactDOM.findDOMNode(component);

    expect(component).not.toBeUndefined()
    expect(componentNode.textContent).toContain('There\'re no connections')
  });
});
