/* globals describe it expect */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import MaterialsCollection from 'components/materials-collection/materials-collection'
import { pack } from "../../helpers/pack"

Enzyme.configure({adapter: new Adapter()})

global.Portal = {
  API_V1: {
    MATERIALS_BIN_COLLECTIONS: 'http://fake-url'
  }
}

const materials = [
  "TODO",
  "use real materials",
  "once they are created"
]

global.jQuery = {
  ajax: jest.fn().mockImplementation((options) => {
    options.success([{materials}])
  })
};

describe('When I try to render materials collection', () => {
  let materialsCollection;

  describe("with required props", () => {
    beforeEach(() => {
      materialsCollection = Enzyme.mount(<MaterialsCollection
        materials={materials}
        collection={1}
      />)
    })

    it("should set the default props", () => {
      expect(materialsCollection.props()).toEqual({
        collection: 1,
        header: null,
        limit: Infinity,
        materials: [
          "TODO",
          "use real materials",
          "once they are created",
        ],
        onDataLoad: null,
        randomize: false,
      });
    });

    it("should call the ajax request", () => {
      expect(global.jQuery.ajax).toHaveBeenCalled();
    })

    it("should render the default props", () => {
      expect(materialsCollection.html()).toBe(pack(`
        <div>
          <div>TODO / use real materials / once they are created</div>
        </div>
      `));
    })
  })

  describe("with optional props", () => {
    const onDataLoad = jest.fn();

    beforeEach(() => {
      materialsCollection = Enzyme.mount(<MaterialsCollection
        materials={materials}
        collection={1}
        header="this is the header"
        limit={2}
        onDataLoad={onDataLoad}
      />)
    })

    it("should call onDataLoad", () => {
      expect(onDataLoad).toHaveBeenCalledWith(materials)
    })

    it("should render the optional props", () => {
      expect(materialsCollection.html()).toBe(pack(`
        <div>
          <h1 class="collection-header">this is the header</h1>
          <div>TODO / use real materials</div>
          <a class="mc-truncate" href="">
            <i class="fa fa-chevron-down"></i>
            <span class="mc-truncate-text"> show all materials</span>
          </a>
        </div>`));
    })
  })

})
