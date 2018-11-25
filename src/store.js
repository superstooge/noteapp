import { createStore, compose } from 'redux';
import { notesReducer } from './reducers/reducers.js';
const initialState = {
  notes: [],
  currentNote: {
    id: null,
    note: '',
    title: ''
  },
  voiceInput: ''
};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(...enhancers);

const store = createStore(notesReducer, initialState, composedEnhancers);

export default store;
