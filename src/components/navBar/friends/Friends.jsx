import React from 'react';
import s  from './Friends.module.css';
import FriendsItem from './friendsItem/FriendsItem';
import {NavLink} from 'react-router-dom';

const Friends = (props) => {

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
