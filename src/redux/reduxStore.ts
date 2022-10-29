import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profilePageReducer from './profilePageReducer';
import dialogPageReducer from './dialogPageReducer';
import navBarReducer from './navBarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMidleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';

let reducers = combineReducers({
  profilePage: profilePageReducer,
  dialogsPage: dialogPageReducer,
  navBar: navBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

 //added REDUX_DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMidleware)));

export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof reducers>

window.store = store;
export default store;


