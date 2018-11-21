import * as AT from './actionTypes'

export const setCulture = culture => ({
  type: AT.SET_CULTURE,
  payload: { culture }
})

export const setLanguage = (language, showAlert) => ({
  type: AT.SET_LANGUAGE,
  payload: { language, showAlert }
})
