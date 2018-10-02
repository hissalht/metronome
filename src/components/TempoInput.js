import React, { Component } from 'react'
import memoize from 'memoize-one'
import PropTypes from 'prop-types'
import { EditableText } from '@blueprintjs/core'

import { root as className } from './TempoInput.module.sass'

class TempoInput extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
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
    let result = parseInt(value, 10)
    if (min) { result = Math.max(result, min) }
    if (max) { result = Math.min(result, max) }
    onChange(result)
  }

  componentDidUpdate (prevProps, prevState) {
    this.setBpm(this.props.value)
  }

  render() {
    const { bpm } = this.state

    return (
      <EditableText
        value={bpm}
        onChange={this.handleChange}
        onConfirm={this.handleConfirm}
        intent='primary'
        className={className}
      />
    )
  }
}

export default TempoInput
