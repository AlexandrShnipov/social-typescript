import React from 'react';
import s from './NavBarItem.module.css';
import {NavLink} from 'react-router-dom';

type NavbarItemPropsType = {
    to: string
    linkText: string
}

const NavBarItem = (props: NavbarItemPropsType) => {
    return (
        <li className={s.navListItem}>
            <NavLink className={({isActive}) => isActive
                ? `${s.navListLink} ${s.active}`
                : s.navListLink}
                     to={props.to}>{props.linkText}</NavLink>
        </li>
    )
}

export default NavBarItem;