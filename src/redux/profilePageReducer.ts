import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {isNumberObject} from 'util/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


type PostsStateType = {
    id: number
    message: string
    likesCount: number
}

type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {
    small: string | null
    large: string | null
}

type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 11,},
        {id: 2, message: `It's my first post`, likesCount: 25,},
    ] as Array<PostsStateType>,
    profile: null as null | ProfileType,
    status: '',
    addPostText: ''
}

const profilePageReducer = (state = initialState, action: SameActionType): InitialStateType => {
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

export type SameActionType =
    AddPostActionType
    | SetStatusActionType
    | SetUserActionProfile
    | DeletePostActionType
    | SavePhotoSuccessActionType

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error: any) {
        alert(error.message)
    }
}

export const savePhoto = (file: string) => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        //dispatch(stopSubmit('edit-profile', {'contacts':{'facebook': message}}))
        dispatch(stopSubmit('edit-profile', {_error: message}));
        return Promise.reject(message);
    }
}

export default profilePageReducer;