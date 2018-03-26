import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createAppStore} from './store'
import {getWeather} from './api'

const store = createAppStore()
window.store = store

class App extends Component {
  onSubmit(e) {
    e.preventDefault()
    const query = e.target.elements.query.value
    this.props.submitQuery(query)
  }

  history() {
    return (
      <ul>
        {this.props.queries.map((q, index)=> <li>{q.query} ({q.date})</li>)}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="query" placeholder="City name" />
          <input type="submit" value="submit" />
        </form>
        {this.history()}
      </div>
    )
  }
}

const AppContainer = connect(
  (state)=> { return state },
  (dispatch)=> { return {
    submitQuery: (query)=> {
      dispatch({
        type: 'NEW_QUERY',
        data: {query: query, date: new Date().toJSON()}
      })
    }
  } }
)(App)


window.weather = (query = 'Kiev')=> {
  getWeather(query).then((res)=> {
    console.log(res)
  })
}


ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>, document.body)
