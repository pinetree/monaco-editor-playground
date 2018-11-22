import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store'
import configureLocales from './services/LocalesService'
import App from './App'
import * as serviceWorker from './serviceWorker'

const renderApp = (Component, store) => {
  const { messages } = configureLocales(store)

  const render = (Component, store, messages) => {
    ReactDOM.render(
      <AppContainer key={Math.random()} warnings={false}>
        <Component store={store} messages={messages} />
      </AppContainer>,
      document.getElementById('root')
    )
  }

  render(App, store, messages)

  if (module.hot) {
    module.hot.accept('./App.js', () =>
      render(require('./App.js').default, store, messages)
    )
  }
}

renderApp(App, configureStore())

serviceWorker.unregister()
