import {v1} from "uuid";
import {ActionsTypes, UsersPageType} from "./store";

type locationType = {
    city: string,
    country: string
}

type userType = {
    id: string,
    followed: boolean,
    fullName: string,
    status: string,
    photoUrl: string,
    location: locationType
}

let initialState = {
     users: [
    //     {id: v1(), photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
    //         followed: false, fullName: 'Ivan', status: "good", location: {city: "Moscow", country: "Russia"}},
    //     {id: v1(), photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
    //         followed: true, fullName: 'Andrey', status: "good", location: {city: "Minsk", country: "Belarus"}},
    //     {id: v1(), photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU",
    //         followed: false, fullName: 'Aleksandr', status: "good", location: {city: "Kiev", country: "Ukraine"}},
     ],
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





