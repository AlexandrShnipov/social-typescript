import React from 'react';
import s from './Message.module.css';
import {MessagesStateType} from '../../../redux/dialogPageReducer';

const Message = (props: MessagesStateType) => {
    return (
        <p className={s.message}>{props.message}</p>
    )
}



export default Message;


