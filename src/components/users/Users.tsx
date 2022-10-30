import React from 'react';
import ContainerPage from '../../common/containerPage/ContainerPage';
import Pagination from '../Common/Pagination/Pagination';
import User from './User';
import {UserType} from '../../types/reduxType';

type UsersPropsType = {
    currentPage: number
    pageSize: number
    totalItemsCount: number
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

const Users = (props: UsersPropsType) => {

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
                                     follow={follow}
                                     unfollow={unfollow}/>)
            }
        </ContainerPage>
    )
}

export default Users;