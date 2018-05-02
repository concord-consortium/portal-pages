import React from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import OfferingRow from './offering-row'

import css from './style.scss'

const SortableOffering = SortableElement(OfferingRow)

const SortableOfferings = SortableContainer(({ offerings, offeringDetails, onOfferingUpdate, requestOfferingDetails }) => {
  return (
    <div className={css.offeringsTable}>
      <div className={css.headers}>
        <span className={css.activityNameCell}>Name</span>
        {/* Empty icon cell just to make sure that total width is correct */}
        <span className={css.iconCell} />
        <span className={css.checkboxCell}>Active</span>
        <span className={css.checkboxCell}>Locked</span>
        <span className={css.detailsCell} />
      </div>
      {
        offerings.map((offering, idx) =>
          <SortableOffering key={offering.id} index={idx} offering={offering} offeringDetails={offeringDetails[offering.id]}
            requestOfferingDetails={requestOfferingDetails} onOfferingUpdate={onOfferingUpdate} />)
      }
    </div>
  )
})

export default class OfferingsTable extends React.Component {
  render () {
    const { offerings, offeringDetails, onOfferingsReorder, onOfferingUpdate, requestOfferingDetails } = this.props
    return (
      <SortableOfferings offerings={offerings} offeringDetails={offeringDetails} onSortEnd={onOfferingsReorder}
        onOfferingUpdate={onOfferingUpdate} requestOfferingDetails={requestOfferingDetails} distance={3} />
    )
  }
}
