import React from 'react';
import FormattedMessage from 'IntlFormat';
import { connect } from 'react-redux'

import 'assets/recapitulatif.less'

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
              <span key={input} className="tag" >
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
              </span>
            )

            return false
          })
          : values.push(<FormattedMessage key={key} id={form[key]} />)

        return (<div key={key} >
          {values.length !== 0 ? title : null}
          {values}
        </div>)
      })
    }
  </div>
)

const mapStateToProps = (store) => {
  return {
    form: store.property
  }
}

export default connect(mapStateToProps)(Recapitulatif)