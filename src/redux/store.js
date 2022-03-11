import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './reducers/user';

const rootReducer = combineReducers({ user });

export const store = createStore(rootReducer, applyMiddleware(thunk));
