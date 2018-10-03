import React, { Component } from 'react'
import memoize from 'memoize-one'
import PropTypes from 'prop-types'
import { EditableText } from '@blueprintjs/core'

import styles from './TempoInput.module.sass'

class TempoInput extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    value: 120,
    min: 60,
    max: 250,
    placeholder: 'bpm'
  }

  state = {
    bpm: this.props.value
  }

  setBpm = memoize(
    (value) => {
      this.setState({ bpm: value })
    }
  )

  handleChange = value => this.setState({ bpm: value })

  handleConfirm = value => {
    const { min, max, onChange } = this.props
    let result = parseFloat(value, 10)
    if (min) { result = Math.max(result, min) }
    if (max) { result = Math.min(result, max) }
    onChange(result)
  }

  componentDidUpdate (prevProps, prevState) {
    this.setBpm(this.props.value)
  }

  render () {
    const { bpm, placeholder } = this.state

    return (
      <div className={styles.root}>
        <span>{'♩ = '}</span>
        <EditableText
          value={bpm}
          onChange={this.handleChange}
          onConfirm={this.handleConfirm}
          intent='primary'
          type='number'
          placeholder={placeholder}
          minWidth={100}
          selectAllOnFocus
        />
      </div>
    )
  }
}

export default TempoInput
