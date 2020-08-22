import React from 'react';
import Users from './Users';
import {connect} from "react-redux";
import {ActionsTypes, RootStateType, userType} from "../../Redux/store";
import {followAC, setUsersAC, unfollowAC} from "../../Redux/users-reducer";

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users
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
        }
    }
}

 export default connect (mapStateToProps, mapDispatchToProps) (Users);