import React from 'react';
import styles from "./Paginator.module.css";

type usersPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = (props: usersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ""}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p},</span>
            })}
        </div>
    )
}