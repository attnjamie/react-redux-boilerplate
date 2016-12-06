import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import reducers from './reducers';

export default function configureStore(initialState) {
  const store = createStore(reducers(initialState), initialState, compose(
      applyMiddleware(thunk, logger),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
  ));
  return store;
}
