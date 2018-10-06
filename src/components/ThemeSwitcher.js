import React from 'react'
import { Switch, Icon } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const ThemeSwitcher = ({ dark, onChange }) => (
  <Switch
    alignIndicator='right'
    labelElement={<span><Icon icon={dark ? 'moon' : 'flash'} /> Theme</span>}
    large
    checked={dark}
    onChange={onChange}
  />
)

ThemeSwitcher.propTypes = {
  dark: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default ThemeSwitcher
