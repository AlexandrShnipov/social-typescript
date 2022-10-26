import React from 'react';
import {connect} from 'react-redux';
import {requestUsers,toggleFollowingProgress, unfollow, follow, setCurrentPage,
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from 'redux';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize, getTotalItemsCount,
  getUsers
} from '../../redux/usersSelectors';

class UsersContainer extends React.Component {

  componentDidMount() {
    let {currentPage, pageSize, getUsers} = this.props
    getUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber) => {
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
//
// let mapStateToProps = (state) => {
//   let {users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress} = state.usersPage
//   return {
//     users: users,
//     pageSize: pageSize,
//     totalUsersCount: totalUsersCount,
//     currentPage: currentPage,
//     isFetching: isFetching,
//     followingInProgress: followingInProgress,
//   }
// };

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalItemsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
};

export default compose(
  connect(mapStateToProps,
    {
      follow, unfollow, setCurrentPage,
      toggleFollowingProgress, getUsers: requestUsers
    }),
  //withAuthRedirect
)(UsersContainer)