import React from 'react';
import Users from './Users';
import {connect} from "react-redux";
import {ActionsTypes, RootStateType, userType} from "../../Redux/store";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../Redux/users-reducer";

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,

    }
}

let mapDispatchToProps = (dispatch:(action: ActionsTypes) => void) => {
    return {
        follow: (userID: string) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: string) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<userType>): any => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch((setCurrentPageAC(pageNumber)))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }


    }
}

 export default connect (mapStateToProps, mapDispatchToProps) (Users);