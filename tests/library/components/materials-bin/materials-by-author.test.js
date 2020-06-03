/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MBMaterialsByAuthor from 'components/materials-bin/materials-by-author'
import { pack } from "../../helpers/pack"

const authors = [{
  id: 1,
  name: "author 1",
  materials: [{
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
}, {
  id: 2,
  name: "author 2",
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
    options.success(authors)
  }
};

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render materials-bin materials by author', () => {

  it("should render with default props", () => {
    const materialsByAuthor = Enzyme.mount(<MBMaterialsByAuthor userId={1} />);
    expect(materialsByAuthor.html()).toBe(pack(`
      <div class="mb-cell mb-hidden"><div>Loading...</div></div>
    `));
  });

  it("should render with optional props", () => {
    const materialsByAuthor = Enzyme.mount(<MBMaterialsByAuthor userId={1} name="Collection Name" visible={true} />);
    expect(materialsByAuthor.html()).toBe(pack(`
      <div class="mb-cell ">
        <div>
          <div class="mb-collection-name mb-clickable">
            <span class="mb-toggle-symbol">+</span>
            <!-- react-text: 6 --> <!-- /react-text --><!-- react-text: 7 -->author 1<!-- /react-text -->
          </div>
          <div class="mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
        <div>
          <div class="mb-collection-name mb-clickable">
            <span class="mb-toggle-symbol">+</span>
            <!-- react-text: 13 --> <!-- /react-text --><!-- react-text: 14 -->author 2<!-- /react-text -->
          </div>
          <div class="mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    `));
  });

})
