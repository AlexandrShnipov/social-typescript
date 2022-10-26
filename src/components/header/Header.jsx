import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png'

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.headerWrap}>
        <NavLink className={s.headerLogoLink} to={'/profile'}>
          <img className={s.headerLogoImg}
               src={logo} alt='logo'/>
        </NavLink>

        <div>
          {props.isAuth
            ? <div className={s.loginBlock}>
              {props.login}
              <button onClick={props.logout}>Log out</button>
            </div>
            : <NavLink className={s.setLoginLink} to={'/login'}>login</NavLink>}
        </div>
      </div>
    </header>
  )
}

export default Header