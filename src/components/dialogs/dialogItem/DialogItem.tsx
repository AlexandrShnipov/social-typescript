import React from 'react';
import s from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';
import {DialogStateType} from '../../../redux/dialogPageReducer';

const DialogItem = (props: DialogStateType) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={s.dialogUser}>
            <NavLink className=
                         {({isActive}) => isActive
                             ? `${s.dialogUserName} ${s.active}`
                             : s.dialogUserName}
                     to={path}>
                <img className={s.dialogUserPhoto}
                     src={props.photo} alt='photo'/>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;


