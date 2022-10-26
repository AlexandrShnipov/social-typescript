import React from 'react';
import ContainerPage from '../../common/containerPage/ContainerPage';
import Pagination from '../Common/Pagination/Pagination';
import User from './User';

const Users = (props) => {

  let {currentPage, pageSize, totalItemsCount, users, onPageChanged, followingInProgress, follow, unfollow} = props;

  return (
    <ContainerPage title={'Users'}>
      <Pagination currentPage={currentPage}
                  pageSize={pageSize}
                  totalItemsCount={totalItemsCount}
                  onPageChanged={onPageChanged}/>
      {users.map(user => <User user={user}
                               key={user.id}
                               followingInProgress={followingInProgress}
                               user={user}
                               follow={follow}
                               unfollow={unfollow}/>)
      }
    </ContainerPage>
  )
}

export default Users;