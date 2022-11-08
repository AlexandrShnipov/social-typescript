import React from 'react';
import {connect} from 'react-redux';
import {follow, requestUsers, unfollow,} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from 'redux';

import {UserType} from '../../types/reduxType';
import {AppStateType} from '../../redux/reduxStore';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalItemsCount,
  getUsers
} from '../../redux/usersSelectors';

type MapStatePropsType = {
  currentPage :number
  pageSize: number
  totalItemsCount: number
  isFetching: boolean
  users: Array<UserType>
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  getUsers: (pageSize: number, currentPage:number, pageNumber?:number) => void
  follow: (userID:number) => void
  unfollow: (userID: number) => void
}

type OwnProps = {

}

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnProps


class UsersContainer extends React.Component<UsersContainerPropsType> {

  componentDidMount() {
    let {currentPage, pageSize, getUsers} = this.props
    getUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber:number) => {
    let {pageSize, currentPage, getUsers} = this.props
    getUsers(pageNumber, pageSize, currentPage)
  }

  render = () => {
    let {
      currentPage, pageSize,totalItemsCount, users,
      follow, unfollow, isFetching,followingInProgress} = this.props;
    return (
      <>
        {isFetching
          ? <Preloader/>
          : null}
        <Users currentPage={currentPage}
               pageSize={pageSize}
               totalItemsCount={totalItemsCount}
               users={users}
               onPageChanged={this.onPageChanged}
               follow={follow}
               unfollow={unfollow}
               followingInProgress={followingInProgress}
        />
      </>
    )
  }
}

let mapStateToProps = (state:AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalItemsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
};

export default compose <React.Component<UsersContainerPropsType>>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps,
    {
      follow, unfollow, getUsers: requestUsers
    }),
  //withAuthRedirect
)(UsersContainer)