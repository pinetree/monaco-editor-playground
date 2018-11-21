import { assoc } from 'ramda'
import * as AT from './actionTypes'

const INITIAL_STATE = {
  language: 'en',
  culture: 'en-GB'
}

const preferences = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case AT.SET_LANGUAGE: {
      const { language } = payload
      return assoc('language', language, state)
    }
    case AT.SET_CULTURE: {
      const { culture } = payload
      return assoc('culture', culture, state)
    }
    default:
      return state
  }
}

export default preferences
