
import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import CheckBox from 'helpers/check-box'

configure( { adapter: new Adapter() });

describe('<CheckBox> - simple check box with title', () => {
  it('is constructed with proper title and checked state', () => {

    const label = "This is the label";
    const value = "This is the value";
    const cb = mount(<CheckBox label={label} value={value} />);
    
    // These next 2 don't really test anything new -- they will
    // always pass if React is working and we have used the names
    // of our props consistently. Cheap insurance against a typing
    // error.
    
    expect(cb.props().label).toBe(label);
    expect(cb.props().value).toBe(value);
    
    // Next, since it's so simple, we'll do a check of the generated
    // DOM -- in this case, much easier than doing a Jest snapshot.
    const input_element = cb.find('input');
    const exp_dom = shallow(<input type="checkbox" value="on" />).find('input');

    expect(input_element.html()).toMatch(/type="checkbox"/);
   // expect(input_element.html()).toMatch(/checked="true"/);
  });
});

/*
describe('<DisplayJson /> - expandable view of some JSON data', () => {
  const title = "Company Roster";
  const data = {
    Companies: [
      { dba: "Bedrock Stone and Gravel", owner: "Mr. Slate" },
      { dba: "Cogsworth Cogs", owner: "Mr. Cogsworth" }
  ]};
  const wrapper = mount(<DisplayJson title={title} objectToDisplay={data} />);
  it('has the JSON content passed to it', () => {
    expect(wrapper.props().objectToDisplay).toBe(data);
  });
  it('has the title passed to it', () => {
    expect(wrapper.props().title).toBe(title)
  });
  it('displays the title in the summary', () => {
    expect(wrapper.find('summary').html()).toMatch(title)
  });
  it('displays the JSON formatted like we want', () => {
    expect(wrapper.find('pre').html()).toMatch(JSON.stringify(data, null, 2))
  });
});
 */
