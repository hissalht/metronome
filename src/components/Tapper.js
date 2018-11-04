import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip, Position } from '@blueprintjs/core'
import _ from 'lodash'

import styles from './Tapper.module.sass'

// max numbers of time intervals remembered to calculate bpm average
const defaultMaxIntervals = 5

class Tapper extends Component {
  static propTypes = {
    text: PropTypes.string,
    tooltip: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    intervals: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }

  state = {
    lastTimestamp: null,
    lastIntervals: []
  }

  handleClick = e => {
    const now = Date.now()
    if (this.state.lastTimestamp) {
      const interval = now - this.state.lastTimestamp

      this.setState(({ lastIntervals }) => {
        let newIntervals = [...lastIntervals, interval]
        if (newIntervals.length > (this.props.intervals || defaultMaxIntervals)) {
          newIntervals.shift()
        }
        return {
          lastIntervals: newIntervals,
          lastTimestamp: now
        }
      }, () => {
        const { min, max, onChange } = this.props
        let bpm = 60000 / _.mean(this.state.lastIntervals)
        if (min) { bpm = Math.max(bpm, min) }
        if (max) { bpm = Math.min(bpm, max) }
        onChange(+bpm.toFixed(1)) // rounding to 1 decimal
      })
    } else {
      this.setState({
        lastTimestamp: now
      })
    }
  }

  render () {
    const { text, tooltip } = this.props
    return (
      <div className={styles.root}>
        <Tooltip className={styles.tooltip} content={tooltip} disabled={!tooltip} position={Position.BOTTOM}>
          <Button large fill onClick={this.handleClick} text={text} icon='hand-up' className={styles.button} />
        </Tooltip>
      </div>
    )
  }
}

export default Tapper
