import React from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl'

const FormatString = (props) => {
  const matchTranslate = typeof props.intl.messages[props.id] === 'string'
  if (props.text && matchTranslate) {
    return props.intl.messages[props.id]
  }
  return matchTranslate ? <FormattedMessage {...props} /> : <span>{props.id}</span>
}

export default injectIntl(FormatString)