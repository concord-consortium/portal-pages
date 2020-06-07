/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MaterialsBin from 'components/materials-bin/materials-bin'
import { pack } from "../../helpers/pack"
import {mockJquery} from "../../helpers/mock-jquery"

const materials = [{
  id: 1,
  name: "material 1",
  icon: {
    url: "http://example.com/icon"
  },
  links: {},
  material_properties: "",
  activities: []
}, {
  id: 2,
  name: "material 2",
  icon: {
    url: "http://example.com/icon"
  },
  links: {},
  material_properties: "",
  activities: []
}]

global.Portal = {
  currentUser: {
    isTeacher: true
  }
};

const mockedJQuery = () => ({
  on: (message) => {}
});
mockedJQuery.trim = (s) => s.trim()

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render materials-bin', () => {

  mockJquery(mockedJQuery)

  it("should render with default props", () => {
    const materialsBin = Enzyme.shallow(<MaterialsBin materials={materials} />);
    expect(materialsBin.html()).toBe(pack(`
      <div class="materials-bin">
        <div class="mb-column"></div>
      </div>
    `));
  });

  // TODO: add more tests...
})
