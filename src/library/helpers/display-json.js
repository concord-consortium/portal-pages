import React from 'react'

/*
 * When expanded, a DisplayJson component will show an object in it's JSON
 * form. Handy for debugging; pretty much useless in production.
 */

export default class DisplayJson extends React.Component {
  render () {
    return (
      <div>
        <br />
        <br />
        <details>
          <summary>{this.props.title + ' JSON'}</summary>
          <pre>
            {JSON.stringify(this.props.objectToDisplay, null, 2)}
          </pre>
        </details>
      </div>
    );
  }
}
