import React from 'react';
import s from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={s.isLoadingContainer}>
            <div></div>
        </div>
    )
}
export default Preloader;