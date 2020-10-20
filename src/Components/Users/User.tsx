import React from 'react';
import styles from "./Users.module.css";
import {userType} from "../../Redux/store";
import userPhoto from '../../assecs/images/user.png'
import {NavLink} from "react-router-dom";

type usersPropsType = {
    user: userType
    followingInProgress: Array<string>
    followThunkCreator: (userID: string) => void
    unFollowThunkCreator: (userID: string) => void
}

export const User = (props: usersPropsType) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img className={styles.userPhoto} alt={"Avatar"}
                             src={props.user.photos.small !== null
                                 ? String(props.user.photos.small)
                                 : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.unFollowThunkCreator(props.user.id)
                        }}>UnFollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.followThunkCreator(props.user.id)
                        }}>Follow</button>}
                        </div>
                    </span>
            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                       <span>
                           <div>{"u.location.country"}</div>
                           <div>{"u.location.city"}</div>
                       </span>
            </span>
        </div>
    )
}
