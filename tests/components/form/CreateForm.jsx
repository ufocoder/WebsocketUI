import React from 'react'
import ReactDOM from 'react-dom';
import CreateForm from '../../../src/components/form/CreateForm.jsx'
import TestUtils from 'react/lib/ReactTestUtils'

describe('CreateForm', function () {
  it('renders without problems', function () {
    var component = TestUtils.renderIntoDocument(<CreateForm />),
        componentNode = ReactDOM.findDOMNode(component),
        FormNode = TestUtils.findRenderedDOMComponentWithTag(component, 'form'),
        InputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

    expect(component).not.toBeUndefined()
    expect(componentNode).not.toBeUndefined()
    expect(FormNode).not.toBeUndefined()
    expect(InputNode).not.toBeUndefined()
  });

  it('correct works with onSubmit callback property', function () {
    var spy = jasmine.createSpy('spy'),
        testValue = 'abcdef',
        component = TestUtils.renderIntoDocument(<CreateForm onSubmit={spy} />),
        FormNode = TestUtils.findRenderedDOMComponentWithTag(component, 'form'),
        InputNode = component.refs.Address;

    InputNode.value = testValue

    TestUtils.Simulate.change(InputNode)
    TestUtils.Simulate.submit(FormNode)

    expect(component.refs.Address.value).toBe(testValue)
    expect(spy).toHaveBeenCalledWith(testValue)
    expect(spy.calls.count()).toBe(1)
  });

});
