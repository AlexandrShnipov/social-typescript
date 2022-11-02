import React from 'react';
import s from './Message.module.css';

export type MessagePropsType = {
    message : string
    id: number
}

const Message = (props: MessagePropsType) => {
    return (
        <p className={s.message}>{props.message}</p>
    )
}



export default Message;


