import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'


export const createAppStore = ()=> (
  createStore(rootReducer, applyMiddleware(thunk, createLogger()))
)
