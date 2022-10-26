import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/objectHelpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'STATE_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialStore = {
  users: [],
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

const usersReducer = (state = initialStore, action) => {
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
        users:  updateObjectInArray(
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
          : state.followingInProgress.filter(id => id !== action.userID)
      }
    default:
      return state;
  }
}


export const followSuccess = (userID) => ({
  type: FOLLOW,
  userID
});

export const unfollowSuccess = (userID) => ({
  type: UNFOLLOW,
  userID
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users

});
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

export const setTotalItemsCount = (totalItemsCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalItemsCount
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export const toggleFollowingProgress = (isFetching, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching, userID
});

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalItemsCount(data.totalCount));
    dispatch(setCurrentPage(page))
  }
}

const followUnFollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userID))
  const data = await apiMethod(userID)
  //debugger
  if (data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }
  dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID) => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}

export const unfollow = (userID) => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}


export default usersReducer;