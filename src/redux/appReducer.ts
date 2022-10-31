import {getAuthUserdata, SetAuthUserDataActionType} from './authReducer';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ThunkDispatch} from 'redux-thunk/src/types';
import {AppStateType} from './reduxStore';
import {SomeActionType} from './usersReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

const initialState= {
  initialized: false,
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
}

export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});


type ThunkType = ThunkAction<any, AppStateType, any, InitializedSuccessActionType>

export const initializeApp = ():ThunkType=> (dispatch, getState) => {
  let promise = dispatch(getAuthUserdata());
  Promise.all([promise])
    .then(() => {
    dispatch(initializedSuccess());
  })
}

export default appReducer;