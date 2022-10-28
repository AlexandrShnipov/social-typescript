import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/objectHelpers';
import {SavePhotoSuccessActionType} from './profilePageReducer';
import {PhotosType, UserType} from '../types/reduxType';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'STATE_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

export type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
}

const usersReducer = (state = initialState, action: SomeActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userID,
                    'id',
                    {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userID,
                    'id',
                    {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItemsCount: action.totalItemsCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter((id: number) => id !== action.userID)
            }
        default:
            return state;
    }
}

export type FollowSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): FollowSuccessActionType => ({
    type: FOLLOW,
    userID
});

export type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({
    type: UNFOLLOW,
    userID
});

export type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
});

export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

export type SetTotalItemsCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalItemsCount: number
}
export const setTotalItemsCount = (totalItemsCount: number): SetTotalItemsCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalItemsCount
});

export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}
export const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching, userID
});

export type SomeActionType =
    FollowSuccessActionType
    | UnfollowSuccessActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalItemsCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

export const requestUsers = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalItemsCount(data.totalCount));
        dispatch(setCurrentPage(page))
    }
}

const followUnFollowFlow = async (dispatch:any, userID:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userID))
    const data = await apiMethod(userID)
    //debugger
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID:number) => {
    return async (dispatch:any) => {
        followUnFollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userID:number) => {
    return async (dispatch:any) => {
        followUnFollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;