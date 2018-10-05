import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Slider } from '@blueprintjs/core'
import { Howl } from 'howler'
import classNames from 'classnames'

import styles from './App.module.sass'
import Tapper from './Tapper'
import TempoInput from './TempoInput'
import SignatureInput from './SignatureInput'
import ThemeSwitcher from './ThemeSwitcher'
import clickUrl from '../sounds/metronome.ogg'

export const MAX_BPM = 250
export const MIN_BPM = 60

export const SOUNDS = [
  'default',
  'clap'
]

class App extends Component {
  static propTypes = {
    loadState: PropTypes.func.isRequired,
    saveState: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const savedState = props.loadState()
    this.state = Object.assign({}, {
      bpm: 120,
      sound: 'default',
      playing: false,
      dark: false
    }, savedState)
  }

  sound = new Howl({
    src: [clickUrl],
    volume: 0.5
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
    this.setState(({ playing }) => ({ playing: !playing }))
  }

  setSoundInterval = bpm => {
    clearInterval(this.soundHandle)
    this.soundHandle = setInterval(
      () => this.sound.play(),
      60000 / bpm
    )
  }

  clearSoundInterval = () => {
    clearInterval(this.soundHandle)
  }

  handleThemeChange = event => {
    this.setState({ dark: event.currentTarget.checked })
  }

  componentDidUpdate (previousProps, previousState) {
    if (this.state !== previousState) {
      this.props.saveState({
        bpm: this.state.bpm,
        dark: this.state.dark,
        sound: this.state.sound
      }, (error) => {
        if (error) {
          console.error(error)
        }
      })
    }
  }

  render () {
    const { bpm, playing, dark } = this.state
    const rootClasses = classNames({
      [styles.root]: true,
      'bp3-dark': dark,
      [styles.dark]: dark
    })
    return (
      <div className={rootClasses}>
        <h1 className='bp3-heading'>Metronome</h1>
        <div className={styles.flexRoot}>
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
        <div className={styles.themeSwitch}>
          <ThemeSwitcher dark={dark} onChange={this.handleThemeChange} />
        </div>
      </div>
    )
  }
}

export default App
