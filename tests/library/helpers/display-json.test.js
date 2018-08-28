import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import DisplayJson from 'helpers/display-json'

configure( { adapter: new Adapter() });

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
