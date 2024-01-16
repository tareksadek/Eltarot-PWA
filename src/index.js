import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'
import App from './App'

import * as serviceWorker from './serviceWorker'

import errorReducer from './store/reducers/error'
import notificationReducer from './store/reducers/notification'
import cardsReducer from './store/reducers/cards'
import readsReducer from './store/reducers/reads'
import myReadsReducer from './store/reducers/myReads'
import readerReducer from './store/reducers/reader'
import subscriberSessionReducer from './store/reducers/subscriberSession'

import './App.css'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : null || compose

const rootReducer = combineReducers({
  errorCenter: errorReducer,
  notification: notificationReducer,
  cards: cardsReducer,
  reads: readsReducer,
  myReads: myReadsReducer,
  reader: readerReducer,
  subscriberSession: subscriberSessionReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

const root = document.getElementById('root')
let renderMethod
if (root && root.innerHTML !== '') {
  renderMethod = ReactDOM.hydrate
} else {
  renderMethod = ReactDOM.render
}

renderMethod(
  <BrowserRouter>
    {app}
  </BrowserRouter>,
  document.getElementById('root'),
)
serviceWorker.register()
