import React from 'react';
import FormattedMessage from 'IntlFormat';
import { connect } from 'react-redux'

import 'modules/Property/assets/recapitulatif.less'

const Recapitulatif = ({ form, property }) => (
  <div id="recapitulatif">
    {
      Object.keys(property).map(key => {
        const isString = typeof form[key] === 'string'
        const title = <p><FormattedMessage id={key} /></p>

        const values = []

        !isString
          ? property[key].map(input => {
            const value = form[input]
            if (!value) {
              return false
            }
            const isValueString = typeof value === 'string'

            values.push(
              <li key={input} className="tag" >
                {
                  value
                    ? <FormattedMessage id={input} />
                    : null
                }
                {
                  isValueString
                    ? <span>{' ' + form[input]}</span>
                    : null
                }
              </li>
            )

            return false
          })
          : values.push(<li key={key}><FormattedMessage id={form[key]} /></li>)

        return (<div key={key} >
          {values.length !== 0 ? title : null}
          <ul>
            {values}
          </ul>
        </div>)
      })
    }
  </div>
)

const mapStateToProps = (store) => {
  return {
    form: store.property.form
  }
}

export default connect(mapStateToProps)(Recapitulatif)