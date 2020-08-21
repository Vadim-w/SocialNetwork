import React from 'react';
import {userType} from "../../Redux/store";
import styles from "./Users.module.css"
import {v1} from "uuid";
import axios from 'axios';
import userPhoto from '../../assecs/images/user.png'

type usersPropsType = {
    users: Array<userType>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<userType>) => void
}


export const Users = (props: usersPropsType) => {

    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users", {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            props.setUsers(res.data.items)
        });

        // props.setUsers([
        //     {
        //         id: v1(),
        //         photos: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
        //         followed: false,
        //         name: 'Ivan',
        //         status: "good",
        //         //location: {city: "Moscow", country: "Russia"}
        //     },
        //     {
        //         id: v1(),
        //         photos: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
        //         followed: true,
        //         name: 'Andrey',
        //         status: "good",
        //         //location: {city: "Minsk", country: "Belarus"}
        //     },
        //     {
        //         id: v1(),
        //         photos: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
        //         followed: false,
        //         name: 'Aleksandr',
        //         status: "good",
        //         //location: {city: "Kiev", country: "Ukraine"}
        //     },
        // ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={styles.userPhoto}
                                 src={u.photos.small !== null
                                     ? u.photos
                                     : userPhoto}/>
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
        </div>
    )
}