import {NavLink} from 'react-router-dom';
import s from './FriendsItem.module.css';

const FriendsItem = (props) => {
    return (
        <li className={s.navListItemFriend}>
            <NavLink className={s.navListItemFriendLink} to={''}>
                <img className={s.navListItemFriendImg}
                     src={props.photo}/>
                {props.name}
            </NavLink>
        </li>
    )
}
export default FriendsItem;