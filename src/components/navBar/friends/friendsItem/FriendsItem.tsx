import {NavLink} from 'react-router-dom';
import s from './FriendsItem.module.css';

type FriendsItemPropsType = {
    photo: string
    name: string
}

const FriendsItem = (props: FriendsItemPropsType) => {
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