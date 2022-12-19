import {getAuthUserdata} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {Action} from "redux";

export type InitialStateType = typeof initialState

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS // 'INITIALIZED_SUCCESS'
}

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
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

export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
});


type ThunkType = ThunkAction<void, AppStateType, any, InitializedSuccessActionType>

export const initializeApp = (): ThunkType => (dispatch, getState) => {
    let promise = dispatch(getAuthUserdata());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}

export default appReducer;