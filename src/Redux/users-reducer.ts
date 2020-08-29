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
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
};

export const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes) => {
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
            return {...state, users: [...action.users]}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_USERS_TOTAL_COUNT":
            return  {...state, totalUsersCount: action.totalCount}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}
export const follow = (id: string) => ({
    type: "FOLLOW",
    userID: id
}) as const

export const unfollow = (id: string) => ({
    type: "UNFOLLOW",
    userID: id
}) as const

export const setUsers = (users: Array<userType>) => ({
    type: "SET_USERS",
    users: users
}) as const

export const setCurrentPage = (currentPage: number) => ({
    type: "SET_CURRENT_PAGE",
    currentPage
}) as const

export const setTotalUsersCount = (totalCount: number) => ({
    type: "SET_USERS_TOTAL_COUNT",
    totalCount
}) as const

export const setToggleIsFetching = (isFetching: boolean) => ({
    type: "TOGGLE_IS_FETCHING",
    isFetching
}) as const





