import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createAppStore} from './store'
import {getWeather} from './api'
import {search} from './actions'
import {AppContainer} from './components/app'

const defaultCity = 'Kiev'

const store = createAppStore()
window.store = store

store.dispatch(search(defaultCity))


window.weather = (query = 'Kiev')=> {
  getWeather(query).then((res)=> {
    console.log(res)
  })
}


ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>, document.getElementById('app'))
