import {authAPI, securityAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

export type InitialAuthReducerStateType = typeof initialState

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string  // if null, then captcha is not required
}

const authReducer = (state:InitialAuthReducerStateType = initialState, action: AuthReducerActionTypes): InitialAuthReducerStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export type SetAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = ({userId, login, email, isAuth}:SetAuthUserDataActionPayloadType): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
});


export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

export type AuthReducerActionTypes = GetCaptchaUrlSuccessActionType | SetAuthUserDataActionType | FormAction

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, AuthReducerActionTypes>

export const getAuthUserdata = ():ThunkType => async (dispatch) => {
    const data = await authAPI.getMe()
    //debugger
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData({userId:id, login, email, isAuth:true}));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:null | undefined):ThunkType =>
    async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    //debugger
    if (data.resultCode === 0) {
        dispatch(getAuthUserdata());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
    console.log(data)
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
    console.log(data)
}

export const logout = ():ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    //debugger
    if (data.resultCode === 0) {
        dispatch(setAuthUserData({userId:null, login:null, email:null, isAuth:false}));
    }
}

export default authReducer;