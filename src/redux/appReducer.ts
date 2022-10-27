import {getAuthUserdata} from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

const initialState= {
  initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserdata());
  Promise.all([promise])
    .then(() => {
    dispatch(initializedSuccess());
  })
}

export default appReducer;