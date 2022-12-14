import React from 'react';
import s from './NavBar.module.css';
import Friends from './friends/Friends';
import NavBarItem from './navBarItem/NavBarItem';

const NavBar = (props) => {
    let state = props.navBar
    let navBarItems = state.item.map
    (item => <NavBarItem key={item.id} {...item}/>)

    return (
        <nav className={s.nav}>
            <ul className={s.navList}>
                {navBarItems}
                <Friends friends={state.friends}/>
            </ul>
        </nav>
    )
}

export default NavBar;