import React from 'react';
import {userType} from "../../Redux/store";
import Paginator from "../../common/Paginator/Paginator";
import {User} from "./User";

type usersPropsType = {
    users: Array<userType>
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    setToggleIsFollowingInProgress: (id: string, followingInProgress: boolean) => void
    followingInProgress: Array<string>
    followThunkCreator: (userID: string) => void
    unFollowThunkCreator: (userID: string) => void
}

export const Users = (props: usersPropsType) => {

    return (
        <div>
            <Paginator
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={10}
            />
            {
                props.users.map(u => <User user={u}
                                           followingInProgress={props.followingInProgress}
                                           followThunkCreator={props.followThunkCreator}
                                           unFollowThunkCreator={props.unFollowThunkCreator}
                                           key={u.id}
                    />)
            }
        </div>
    )
}