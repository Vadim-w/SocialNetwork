import React from 'react';
import preloader from '../../assecs/images/peloader.gif'
import styles from "./Preloader.module.css"

export const Preloader = () => {
    return (
            <img className={styles.preloaderBlock}  src={preloader} alt="preloader" />
        )
}
