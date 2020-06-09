/* globals describe it expect */
import React from 'react'
import ReactDOM from 'react-dom'
import Formsy from 'formsy-react'

window.React = {
  DOM: ReactDOM
}
window.Formsy = Formsy

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CheckboxInput from 'components/signup/checkbox_input'
import { pack } from "../../helpers/pack"
import createFactory from "../../../../src/library/helpers/create-factory"

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render signup checkbox', () => {

  it("should render", () => {
    const checkboxInput = Enzyme.mount(<Formsy><CheckboxInput defaultChecked={true} name="_name" label="_label" /></Formsy>);
    expect(checkboxInput.html()).toBe(pack(`
      <form>
        <div class="checkbox-input _name">
          <label class="checkbox-label">
          <input type="checkbox" checked="">_label</label>
        </div>
      </form>
    `));
  });

})