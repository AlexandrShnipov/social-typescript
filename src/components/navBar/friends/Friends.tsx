import React from 'react';
import s  from './Friends.module.css';
import FriendsItem from './friendsItem/FriendsItem';
import {NavLink} from 'react-router-dom';
import {FriendsStateType} from "../../../redux/navBarReducer";

type FriendsPropsType = {
    friends: Array<FriendsStateType>
}

const Friends = (props: FriendsPropsType) => {

    let friendsElements = props.friends.map(friend => <FriendsItem key={friend.id} {...friend}/>);

    return (
        <li className={s.navListItem}>
            <NavLink className={({isActive}) => (isActive ? s.active : s.linkToFriends)} to={'/friends'}>Friends</NavLink>
            <ul className={s.navListItemFriends}>
                {friendsElements}
            </ul>
        </li>
    )
}
export default Friends;
