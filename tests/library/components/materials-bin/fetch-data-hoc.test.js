/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MBFetchDataHOC from 'components/materials-bin/fetch-data-hoc'
import { pack } from "../../helpers/pack"

const fetchedData = ["foo", "bar", "baz"]

global.jQuery = {
  ajax: (options) => {
    options.success(fetchedData)
  }
};

Enzyme.configure({adapter: new Adapter()})

class Wrapped extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wrappedState: true
    }
  }

  render() {
    return <div>{JSON.stringify({state: this.state, props: this.props})}</div>
  }
}

const Wrapper = React.createFactory(MBFetchDataHOC(Wrapped, () => ({
  dataStateKey: 'foo',

  dataUrl: "http://example.com/",

  requestParams: () => ({"baz": true}),

  processData: (data) => data.map(item => item.toUpperCase())
})));

describe('When I try to render materials-bin fetch data HOC', () => {

  it("should render with default props", () => {
    const wrapper = Enzyme.mount(<Wrapper wrapperProp={true} />);
    expect(wrapper.html()).toBe(pack(`
      <div>
        {"state":{"wrappedState":true},"props":{"wrapperProp":true,"children":[{},{}],"foo":null}}
      </div>
    `));
  });

  it("should render with visible prop", () => {
    const wrapper = Enzyme.mount(<Wrapper wrapperProp={true} visible={true} />);
    expect(wrapper.html()).toBe(pack(`
      <div>
        {"state":{"wrappedState":true},"props":{"wrapperProp":true,"visible":true,"children":[{},{}],"foo":["FOO","BAR","BAZ"]}}
      </div>
    `));
  });
})
