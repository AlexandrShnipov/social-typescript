import React from 'react';
import s from './ContainerPage.module.css';

const ContainerPage = (props) => {
    return (
        <div className={s.container}>
            <h2 className={s.pageTitle} >{props.title}</h2>
            {props.children}
        </div>
    )
}
export default ContainerPage;