import React from 'react';
import s from './Preloader.module.css';

const Preloader = (props) => {
    return (
        <div className={s.isLoadingContainer}>
            <div></div>
        </div>
    )
}
export default Preloader;