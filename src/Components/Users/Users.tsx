import React from 'react';
import styles from "./Users.module.css";
import {userType} from "../../Redux/store";
import userPhoto from '../../assecs/images/user.png'
import {NavLink} from "react-router-dom";

type usersPropsType = {
    users: Array<userType>
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: usersPropsType) => {

    let pagesCount = Math.ceil( props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (<div>
        <div>
            {pages.map( p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ""}
                             onClick={ () => {props.onPageChanged(p)}}>{p},</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={styles.userPhoto} alt={"Avatar"}
                                 src={u.photos.small !== null
                                     ? String(u.photos.small)
                                     : userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>UnFollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>)
}