/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MaterialsBin from 'components/materials-bin/materials-bin'
import { pack } from "../../helpers/pack"

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

global.jQuery = () => ({
  on: (message) => {}
});
global.jQuery.trim = (s) => s.trim()

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render materials-bin', () => {

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
