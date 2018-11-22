import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languageService from 'services/LanguageService'
import { actions, selectors } from 'data'
import Dropdown from '../../components/Dropdown'

class DropdownLanguageContainer extends Component {
  handleClick = selectedLanguage => {
    this.props.preferencesActions.setCulture(selectedLanguage.value)
    this.props.preferencesActions.setLanguage(selectedLanguage.language, true)
  }

  render () {
    const { currentLanguage, languages, color, down } = this.props
    const languageList = languages.map(lang => {
      return {
        text: lang.name,
        value: lang.language,
        language: lang.language,
        image: lang.image
      }
    })

    return (
      <Dropdown
        color={color}
        down={down}
        items={languageList}
        selectedValue={currentLanguage}
        callback={selectedLanguage => this.handleClick(selectedLanguage)}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: selectors.preferences.getLanguage(state),
  languages: languageService.languagesSortedByName
})

const mapDispatchToProps = dispatch => ({
  preferencesActions: bindActionCreators(actions.preferences, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownLanguageContainer)
