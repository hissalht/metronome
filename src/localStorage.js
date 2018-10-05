
const STATE_KEY = 'METRONOME_STATE'

export function getSavedState () {
  const json = localStorage.getItem(STATE_KEY)
  if (!json) {
    return undefined
  }
  try {
    const result = JSON.parse(json)
    return result
  } catch (e) {
    return undefined
  }
}

export function saveState (state, cb) {
  try {
    const json = JSON.stringify(state)
    localStorage.setItem(STATE_KEY, json)
    return cb()
  } catch (e) {
    console.error(e)
    cb(e)
  }
}
