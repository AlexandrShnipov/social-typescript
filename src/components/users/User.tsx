import React from 'react';
import s from './User.module.css'
import userDefault from '../../assets/images/userDefault.png'
import {NavLink} from 'react-router-dom';
import {UserType} from '../../types/reduxType';

type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
  }

const User = ({user, followingInProgress, unfollow, follow}: UserPropsType) => {

    return (
        <div className={s.usersItem}>
            <div className={s.usersItemLeft}>
                <NavLink to={`/profile/${user.id}`}>
                    <div className={s.usersItemLeftImg}>
                        <img src=
                                 {user.photos.small
                                     ? user.photos.small
                                     : userDefault
                                 } alt='user photo'/>
                    </div>
                </NavLink>
                {user.followed
                    ? <button
                        className={s.usersItemLeftButton}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}>
                        Unfollow
                    </button>
                    : <button
                        disabled={followingInProgress.some(id => id === user.id)}
                        className={s.usersItemLeftButton}
                        onClick={() => {
                            follow(user.id)
                        }}>
                        Follow
                    </button>}
            </div>

            <div className={s.usersItemRight}>
                <div className={s.usersItemRightTop}>
                    <p className={s.usersItemRightName}>{user.name}</p>
                    <p className={s.usersItemRightCity}>{'user.location.city'}</p>
                </div>
                <div className={s.usersItemRightBottom}>
                    <p className={s.usersItemRightStatus}>{user.status}</p>
                    <p className={s.usersItemRightCountry}>{'user.location.country'}</p>
                </div>
            </div>
        </div>
    )
}

export default User;