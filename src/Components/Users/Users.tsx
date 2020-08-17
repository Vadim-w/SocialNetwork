import React from 'react';
import {userType} from "../../Redux/store";
import styles from "./Users.module.css"
import {v1} from "uuid";

type usersPropsType = {
    users: Array<userType>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<userType>) => void
}


export const Users = (props: usersPropsType) => {

    if(props.users.length === 0) {
        props.setUsers([
            {
                id: v1(),
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
                followed: false,
                fullName: 'Ivan',
                status: "good",
                location: {city: "Moscow", country: "Russia"}
            },
            {
                id: v1(),
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
                followed: true,
                fullName: 'Andrey',
                status: "good",
                location: {city: "Minsk", country: "Belarus"}
            },
            {
                id: v1(),
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
                followed: false,
                fullName: 'Aleksandr',
                status: "good",
                location: {city: "Kiev", country: "Ukraine"}
            },
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={styles.userPhoto} src={u.photoUrl}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={ () => {props.unfollow(u.id)} }>UnFollow</button>
                                : <button onClick={ () => {props.follow(u.id)} }>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}