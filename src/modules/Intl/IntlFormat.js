import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'

const FormatString = (props) => {
  const matchTranslate = typeof props.messages[props.id] === 'string'
  if (props.text && matchTranslate) {
    return props.messages[props.id]
  }
  return matchTranslate ? <FormattedMessage {...props} /> : <span>{props.id}</span>
}

const mapStateToProps = (state) => ({
  messages: state.intl.messages
})

export default connect(mapStateToProps)(FormatString)