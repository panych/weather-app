import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'


const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

export const createAppStore = ()=> (
  createStore(rootReducer, enhancer)
)
