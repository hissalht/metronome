import React from 'react'
import { Switch } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const ThemeSwitcher = ({ dark, onChange }) => (
  <Switch
    alignIndicator='right'
    label='Color theme' large checked={dark} onChange={onChange}
  />
)

ThemeSwitcher.propTypes = {
  dark: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default ThemeSwitcher
