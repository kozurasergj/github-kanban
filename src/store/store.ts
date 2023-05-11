import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducerApiGitHub } from './reducerApiGitHub';
import { reducerDragDrop } from './reducerDragDrop';

const rootReducer = combineReducers({
  apiGitHub: reducerApiGitHub,
  dragDrop: reducerDragDrop,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
