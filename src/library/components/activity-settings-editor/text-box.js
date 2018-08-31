import React from 'react'
import { Z_VERSION_ERROR } from 'zlib';

/*
 * Note to future developers: There are two likely enhancements to this
 * idea of a TextBox component. The first is to create another one where
 * the underlying HTML element is specialized for the type of text being
 * entered. E.g., <input type="url">, for components that verify the
 * format of a URL in the browser.
 * 
 * The second is to create a new component supporting rich-text editing. As
 * far as the UI goes, this can be approached by removing the "mceNoEditor"
 * className which will, at least as of this writing in August '18, cause
 * the tinyMCE editor to replace the textarea element. This could be a good
 * staring point.
 */

export default class TextBox extends React.Component {
  render() {
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    const { api, value, update, name } = this.props;
    return (
      <textarea style={textAreaStyle} value={value}
        className="mceNoEditor"
        onChange={(e) => { update({ [name]: e.target.value }); }}
        onBlur={(e) => { api(e) }}
      />
    )
  }
}