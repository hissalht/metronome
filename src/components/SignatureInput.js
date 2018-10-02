import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditableText } from '@blueprintjs/core'

import styles from './SignatureInput.module.sass'

class SignatureInput extends Component {
  static propTypes = {
    note: PropTypes.number,
    notesPerBar: PropTypes.number
  }

  static defaultProps = {
    note: 4,
    notesPerBar: 4
  }

  render() {
    const { note, notesPerBar } = this.props

    return (
      <div className={styles.root}>
        <EditableText defaultValue={note} intent='primary' maxLength={2} selectAllOnFocus className={styles.input}/>
        <span className={styles.spacer}>/</span>
        <EditableText defaultValue={notesPerBar} intent='primary' maxLength={2} selectAllOnFocus className={styles.input}/>
      </div>
    )
  }
}

export default SignatureInput
