import React from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl'

const FormatString = (props) => {
  const matchTranslate = typeof props.intl.messages[props.id] === 'string'
  return matchTranslate ? <FormattedMessage {...props} /> : <span>{props.id}</span>
}

export default injectIntl(FormatString)