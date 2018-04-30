import React from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'

import css from './style.scss'

const SortableOffering = SortableElement(({ offering }) =>
  <tr>
    <td>{ offering.name }</td>
    <td className={css.checkboxCell}><input type='checkbox' checked={offering.active} /></td>
    <td className={css.checkboxCell}><input type='checkbox' checked={offering.locked} /></td>
    <td><a>SHOW DETAILS</a></td>
  </tr>
)

const SortableOfferings = SortableContainer(({ offerings, onOfferingUpdate }) => {
  return (
    <table className={css.offeringsTable}>
      <tbody>
        <tr>
          <th>Name</th><th className={css.checkboxCell}>Active</th><th className={css.checkboxCell}>Locked</th><th />
        </tr>
        {
          offerings.map((offering, idx) => <SortableOffering key={offering.id} index={idx} offering={offering} onOfferingUpdate={onOfferingUpdate} />)
        }
      </tbody>
    </table>
  )
})

export default class OfferingsTable extends React.Component {
  render () {
    const { offerings, onOfferingsReorder, onOfferingUpdate } = this.props
    return (
      <SortableOfferings offerings={offerings} onSortEnd={onOfferingsReorder} onOfferingUpdate={onOfferingUpdate} />
    )
  }
}
