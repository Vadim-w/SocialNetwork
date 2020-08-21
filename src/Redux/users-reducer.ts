import {v1} from "uuid";
import {ActionsTypes, UsersPageType} from "./store";

type locationType = {
    city: string,
    country: string
}

type userType = {
    id: string,
    followed: boolean,
    name: string,
    status: string,
    photos: string,
    //location: locationType
}

let initialState = {
     users: [],
};

export const usersReducer = (state: UsersPageType  = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case "SET_USERS":
            return {...state, users:[...state.users,  ...action.users]}
        default:
            return state;
    }
}
export const followAC = (id: string) => ({
    type: "FOLLOW",
    userID: id
}) as const

export const unfollowAC = (id: string) => ({
    type: "UNFOLLOW",
    userID: id
}) as const

export const setUsersAC = (users: Array<userType>) => ({
    type: "SET_USERS",
    users: users
}) as const





