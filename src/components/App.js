import React, { Component } from 'react';
import { Button, Slider } from '@blueprintjs/core'
import { Howl } from 'howler'

import styles from './App.module.sass'
import Tapper from './Tapper'
import TempoInput from './TempoInput'
import SignatureInput from './SignatureInput'
import clickUrl from '../sounds/metronome.ogg'

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
    playing: false,
  }

  sound = new Howl({
    src: [clickUrl],
    volume: .5
  })

  handleSliderChange = value => this.handleBpmChange(Math.round(value))

  handleBpmChange = value => {
    if (this.state.playing) {
      this.setSoundInterval(value)
    }
    this.setState({ bpm: value })
  }

  handlePlayButtonClick = e => {
    // TODO: Replace setInterval calls with a more precise scheduling method
    if (this.state.playing) {
      this.clearSoundInterval()
    } else {
      this.sound.play()
      this.setSoundInterval(this.state.bpm)
    }
    this.setState(({ playing }) => ({ playing: !playing}))
  }

  setSoundInterval = bpm => {
    clearInterval(this.soundHandle)
    this.soundHandle = setInterval(
      () => this.sound.play(),
      60000/bpm
    )
  }

  clearSoundInterval = () => {
    clearInterval(this.soundHandle)
  }

  render() {
    const { bpm, playing } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <SignatureInput />
          <div className={styles.playLine}>
            <TempoInput
              value={bpm}
              onChange={this.handleBpmChange}
              min={MIN_BPM}
              max={MAX_BPM}
            />
            <div className={styles.spacer} />
            <Button
              icon={playing ? 'stop' : 'play'}
              large
              onClick={this.handlePlayButtonClick}
            />
          </div>
          <Slider
            value={bpm}
            onChange={this.handleSliderChange}
            min={MIN_BPM}
            max={MAX_BPM}
            stepSize={1}
            labelStepSize={20}
          />
          <Tapper
            text='Tap here'
            onChange={this.handleBpmChange}
            min={MIN_BPM}
            max={MAX_BPM}
          />
        </div>
      </div>
    );
  }
}

export default App;
