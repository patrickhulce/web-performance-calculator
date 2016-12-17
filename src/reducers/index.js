import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import options from './options'

export function addReducers(store, reducers) {
  Object.assign(store.reducers, reducers)
  store.replaceReducer(createRootReducer(store.reducers))
}

export default function createRootReducer(reducers) {
  return combineReducers({
    routing: routerReducer,
    options,
    ...reducers,
  })
}
