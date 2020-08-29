import React from 'react';
import {userType} from "../../Redux/store";
import styles from "./Users.module.css"
import axios from 'axios';
import userPhoto from '../../assecs/images/user.png'

type usersPropsType = {
    users: Array<userType>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<userType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
}

class Users extends React.Component<usersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            this.props.setUsers(res.data.items)
            this.props.setTotalUsersCount(res.data.totalCount)
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            this.props.setUsers(res.data.items)
        });
    }


    render() {

        let pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <div>
                <div>
                    {pages.map( p => {
                        return <span className={this.props.currentPage === p ? styles.selectedPage : ""}
                        onClick={ () => {this.onPageChanged(p)}}>{p},</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
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
                                    this.props.unfollow(u.id)
                                }}>UnFollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}


export default Users;