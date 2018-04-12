import React from 'react';
import { connect } from 'react-redux'

const FormatString = ({ id, messages, text }) => {
  const matchTranslate = messages[id]

  return matchTranslate
    ? text
      ? matchTranslate
      : <span>{matchTranslate}</span>
    : id
}

const mapStateToProps = (store) => ({
  messages: store.intl.messages
})

export default connect(mapStateToProps)(FormatString)