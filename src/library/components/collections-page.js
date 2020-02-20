import React from 'react'
const Component = require('../helpers/component')
const CollectionCards = require('./collection-cards')

const CollectionsPage = Component({
  render: function () {
    return (
      <div>
        <div className={'cols'}>
          <div className={'portal-pages-collections-page-header col-12'}>
            <h1>Collections</h1>
            <p className={'portal-pages-collections-page-header-info'}>
              Many of our resources are part of collections that are created by our various research projects. Each collection has specific learning goals within the context of a larger subject area.
            </p>
            <p>
              <a className={'special-link'} href={'https://concord.org/projects/'} target={'_blank'}>
                View all Concord Consortium projects on concord.org
              </a>
            </p>
          </div>
        </div>
        <div className={'portal-pages-collections-page-diagonal-spacer-2'}>
          <section className={'portal-pages-collections-page-list skew top-only.mediumgray'}>
            <div className={'portal-pages-collections-page-list-inner cols skew-cancel'}>
              {CollectionCards({ fadeIn: 1000 })}
            </div>
          </section>
        </div>
      </div>
    )
  }
})

module.exports = CollectionsPage
