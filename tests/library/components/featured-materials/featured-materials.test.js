/* globals describe it expect */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import FeaturedMaterials from 'components/featured-materials/featured-materials'

Enzyme.configure({adapter: new Adapter()})

global.Portal = {
  API_V1: {
    MATERIALS_FEATURED: 'http://fake-url'
  }
}

const materials = "TODO: figure out materials props";

global.jQuery = {
  ajax: jest.fn().mockImplementation((options) => {
    options.success(materials)
  })
};

describe('When I try to render featured materials', () => {
  let featuredMaterials;

  beforeEach(() => {
    featuredMaterials = Enzyme.shallow(<FeaturedMaterials queryString="test" />);
  })

  it("should call jQuery.ajax", () => {
    expect(global.jQuery.ajax).toHaveBeenCalled();
  });

  it("should render", () => {
    expect(featuredMaterials.html()).toBe(`<div>${materials}</div>`)
  })

})
