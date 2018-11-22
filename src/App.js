import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import ConnectedIntlProvider from './providers/ConnectedIntlProvider'

import Header from 'layouts/Header'
import Lesson from 'layouts/Lesson'

class App extends Component {
  render () {
    const { store, messages } = this.props

    return (
      <Provider store={store}>
        <ConnectedIntlProvider messages={messages}>
          <React.Fragment>
            <Header>UBAI.CODE [Process -------] Language</Header>
            <main className="content">
              <Lesson/>
            </main>
            <footer>Lessons: 1, 2, 3, 4 </footer>
          </React.Fragment>
        </ConnectedIntlProvider>
      </Provider>
    )
  }
}

export default App
