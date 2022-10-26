import React from 'react';
import s from './Message.module.css';


const Message = (props) => {
    return (
        <p className={s.message}>{props.message}</p>
    )
}



export default Message;


