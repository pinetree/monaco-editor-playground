import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import ConnectedIntlProvider from './providers/ConnectedIntlProvider'

import Header from 'layouts/Header'
import Editor from 'components/Editor'

class App extends Component {
  render () {
    const { store, messages } = this.props

    return (
      <Provider store={store}>
        <ConnectedIntlProvider messages={messages}>
          <React.Fragment>
            <Header>UBAI.CODE [Process -------] Language</Header>
            <main className="content">
              <div className="row">
                <div className="col-1-2">
                  Lesson 1
                  <p>text</p>
                </div>
                <div className="col-auto editor">
                  <Editor/>
                </div>
              </div>
            </main>
            <footer>Footer - Check - Next lesson </footer>
          </React.Fragment>
        </ConnectedIntlProvider>
      </Provider>
    )
  }
}

export default App
