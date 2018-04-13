import React from 'react';
import { connect } from 'react-redux'

const FormatString = (props) => {
  const { dispatch, id, messages, text, ...attr } = props
  const matchTranslate = messages[id]

  return matchTranslate
    ? text
      ? matchTranslate
      : <span {...attr}>{matchTranslate}</span>
    : id
}

const mapStateToProps = (store) => ({
  messages: store.intl.messages
})

export default connect(mapStateToProps)(FormatString)