import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditableText } from '@blueprintjs/core'
import memoize from 'memoize-one'

import styles from './SignatureInput.module.sass'

class SignatureInput extends Component {
  static propTypes = {
    note: PropTypes.number,
    notesPerBar: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    note: 4,
    notesPerBar: 4
  }

  state = {
    note: this.props.note,
    notesPerBar: this.props.notesPerBar,
    previous: {
      note: null,
      notesPerBar: null
    },
    placeholder: {
      note: this.props.note,
      notesPerBar: this.props.notesPerBar
    }
  }

  setSignature = memoize(
    (note, notesPerBar) => { this.setState({ note, notesPerBar }) }
  )

  handleChange = name => value => this.setState({ [name]: value })

  handleConfirm = name => value => {
    const { onChange } = this.props
    // since value can be of type number, we convert it to string
    value = value.toString()
    if (!value.trim()) {
      this.setState(previous => ({ [name]: previous.previous[name] }))
      onChange(this.state.previous)
      return
    }
    let result = parseInt(value, 10)
    onChange({
      ...this.state.previous,
      [name]: result
    })
  }

  handleEdit = name => value => {
    this.setState(previousState => ({
      previous: {
        note: previousState.note,
        notesPerBar: previousState.notesPerBar
      }
    }))
  }

  componentDidUpdate (prevProps, prevState) {
    this.setSignature(this.props.note, this.props.notesPerBar)
  }

  render () {
    const { note, notesPerBar, placeholder } = this.state

    return (
      <div className={styles.root}>
        <EditableText
          value={notesPerBar}
          onChange={this.handleChange('notesPerBar')}
          onEdit={this.handleEdit('notesPerBar')}
          onConfirm={this.handleConfirm('notesPerBar')}
          intent='primary'
          type='number'
          placeholder={placeholder.notesPerBar}
          maxLength={2}
          selectAllOnFocus
          className={styles.input}
        />
        <span className={styles.spacer}>/</span>
        <EditableText
          value={note}
          onChange={this.handleChange('note')}
          onEdit={this.handleEdit('note')}
          onConfirm={this.handleConfirm('note')}
          intent='primary'
          type='number'
          placeholder={placeholder.note}
          maxLength={2}
          selectAllOnFocus
          className={styles.input}
        />
      </div>
    )
  }
}

export default SignatureInput
