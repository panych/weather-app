import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createAppStore} from './store'
import {search} from './actions'
import {AppContainer} from './components/app'

const defaultCity = 'Kiev'

const store = createAppStore()
store.dispatch(search(defaultCity))


ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>, document.getElementById('app'))
