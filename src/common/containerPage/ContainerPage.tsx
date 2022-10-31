import React from 'react';
import s from './ContainerPage.module.css';

type ContainerPagePropsType = {
    title: string
    children: React.ReactNode
}

const ContainerPage = (props: ContainerPagePropsType) => {
    return (
        <div className={s.container}>
            <h2 className={s.pageTitle} >{props.title}</h2>
            {props.children}
        </div>
    )
}
export default ContainerPage;