import { addLocaleData } from 'react-intl'
import { map, flatten } from 'ramda'
import * as languageService from '../LanguageService'

import localesEN from '../../assets/locales/en.json'
import localesRU from '../../assets/locales/ru.json'

const importLocaleData = language =>
  require(`react-intl/locale-data/${language}`)

function configureLocales (store) {
  // We add the locale data for each language
  addLocaleData(
    flatten(map(x => importLocaleData(x.language), languageService.languages))
  )

  // We get all the messages
  const messages = {
    en: localesEN,
    ru: localesRU
  }

  return { messages }
}

export default configureLocales
