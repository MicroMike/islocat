import React from 'react';
import FormattedMessage from '../../Intl/IntlFormat';
import { connect } from 'react-redux'

import './assets/recapitulatif.less'

const Recapitulatif = ({ form, property }) => (
  <div id="recapitulatif">
    {
      Object.keys(property).map(key => {
        const isString = typeof form[key] === 'string'
        const title = <FormattedMessage id={key} />

        const values = []

        !isString
          ? property[key].map(input => {
            const value = form[input]
            if (!value) {
              return false
            }
            const isValueString = typeof value === 'string'

            values.push(
              <p key={input}>
                {
                  value
                    ? <FormattedMessage id={input} />
                    : null
                }
                {
                  isValueString
                    ? <span>{' : ' + form[input]}</span>
                    : null
                }
              </p>
            )

            return false
          })
          : values.push(<FormattedMessage key={key} id={form[key]} />)

        return (<div key={key} >
          {values.length !== 0 ? title : null}
          <br />
          {values}
        </div>)
      })
    }
  </div>
)

const mapStateToProps = (state) => {
  return {
    form: state.property
  }
}

export default connect(mapStateToProps)(Recapitulatif)