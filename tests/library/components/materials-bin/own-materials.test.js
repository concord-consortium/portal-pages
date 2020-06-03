/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MBOwnMaterials from 'components/materials-bin/own-materials'
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
  API_V1: {
    MATERIALS_BIN_UNOFFICIAL_MATERIALS: "http://example.com"
  },
  currentUser: {
    isTeacher: false
  }
};

global.jQuery = {
  ajax: (options) => {
    options.success(materials)
  }
};

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render materials-bin own materials', () => {

  it("should render with default props", () => {
    const ownMaterials = Enzyme.mount(<MBOwnMaterials userId={1} />);
    expect(ownMaterials.html()).toBe(pack(`
      <div class="mb-cell mb-hidden"><div>Loading...</div></div>
    `));
  });

  it("should render with optional props", () => {
    const ownMaterials = Enzyme.mount(<MBOwnMaterials userId={1} name="Collection Name" visible={true} />);
    expect(ownMaterials.html()).toBe(pack(`
      <div class="mb-cell ">
        <div class="mb-collection">
          <div class="mb-collection-name">My activities</div>
          <div class="mb-material">
            <span class="mb-material-links"></span>
            <span class="mb-material-name">material 1</span>
          </div>
          <div class="mb-material">
            <span class="mb-material-links"></span>
            <span class="mb-material-name">material 2</span>
          </div>
        </div>
      </div>
    `));
  });

})
