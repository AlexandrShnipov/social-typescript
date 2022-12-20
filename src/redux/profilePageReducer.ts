import {profileAPI, ResultCodeEnum, usersAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostStateType, ProfileType} from "../types/reduxType";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 11,},
        {id: 2, message: `It's my first post`, likesCount: 25,},
    ] as Array<PostStateType>,
    profile: null as null | ProfileType,
    status: '',
    addPostText: ''
}

const profilePageReducer = (state = initialState, action: ProfilePageReducerActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.addPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                addPostText: '',
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }

        default:
            return state;
    }
}

export type AddPostActionType = {
    type: typeof ADD_POST
    addPostText: string
}

export const addPost = (addPostText: string): AddPostActionType => ({
    type: ADD_POST,
    addPostText,
});

export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS,
    status,
});

export type SetUserActionProfile = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserActionProfile => ({
    type: SET_USER_PROFILE,
    profile
})

export type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
});

export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});

export type ProfilePageReducerActionsType =
    AddPostActionType
    | SetStatusActionType
    | SetUserActionProfile
    | DeletePostActionType
    | SavePhotoSuccessActionType



type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ProfilePageReducerActionsType | FormAction>

export const getUserProfile = (userId: number | null):ThunkType => async (dispatch) => {
    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setStatus(status));
        }
    } catch (error: any) {
        alert(error.message)
    }
}

export const savePhoto = (file: string):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserProfile(userId));
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        //dispatch(stopSubmit('edit-profile', {'contacts':{'facebook': message}}))
        dispatch(stopSubmit('edit-profile', {_error: message}));
        return Promise.reject(message);
    }
}

export default profilePageReducer;