import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Footer.module.sass'

const Footer = ({ className }) => {
  const classes = classNames({
    [className]: true,
    [styles.root]: true
  })
  return (
    <footer className={classes}>
      <div>
        <a href='https://adrienboutigny.site/'>Adrien Boutigny</a>
      </div>
      {'•'}
      <div>
        <a href='https://github.com/hissalht/metronome'>Github repository</a>
      </div>
      {'•'}
      <div>
        <a href='https://github.com/hissalht/metronome/blob/master/LICENSE'>
          MIT License
        </a>
      </div>
    </footer>
  )
}
Footer.propTypes = {
  className: PropTypes.string
}

export default Footer
