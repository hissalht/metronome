import React, { Component } from 'react';
import { Slider } from '@blueprintjs/core'

import styles from './App.module.sass'
import Tapper from './Tapper'
import TempoInput from './TempoInput'

export const MAX_BPM = 250
export const MIN_BPM = 60

export const SOUNDS = [
  'default',
  'clap'
]

class App extends Component {
  state = {
    bpm: 120,
    sound: 'default',
  }

  handleChange = name => value => this.setState({ [name]: value })


  render() {
    const { bpm } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <Tapper
            text='Tap here'
            onChange={this.handleChange('bpm')}
            min={MIN_BPM}
            max={MAX_BPM}
          />
          <br />
          <TempoInput
            value={bpm}
            onChange={this.handleChange('bpm')}
            min={MIN_BPM}
            max={MAX_BPM}
          />
          <br />
          <Slider
            value={bpm}
            onChange={this.handleChange('bpm')}
            min={MIN_BPM}
            max={MAX_BPM}
            stepSize={1}
            labelStepSize={20}
          />
        </div>
      </div>
    );
  }
}

export default App;
