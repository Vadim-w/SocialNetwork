import {usersAPI} from "../api/api";
import {RootStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


type locationType = {
    city: string,
    country: string
}

export type userType = {
    id: string,
    followed: boolean,
    name: string,
    status: string,
    photos: string,
    //location: locationType
}

type GetStateType = () =>  RootStateType


type initialStateType = {
    users: Array<userType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

type followActionType = {
    type: "FOLLOW"
    userID: string
}
type unfollowActionType = {
    type: "UNFOLLOW"
    userID: string
}
type setUsersActionType = {
    type: "SET_USERS"
    users: Array<userType>
}
type setCurrentPageActionType = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
}
type setTotalUsersCountAcyionType = {
    type: "SET_USERS_TOTAL_COUNT"
    totalCount: number
}
type setToggleIsFollowingInProgressActionType = {
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS"
    followingInProgress: boolean
    userId: string
}
type setToggleIsFetchingActionType = {
    type: "TOGGLE_IS_FETCHING"
    isFetching: boolean
}

type ActionsTypes =
    setUsersActionType
    | unfollowActionType
    | followActionType
    | setToggleIsFetchingActionType
    | setTotalUsersCountAcyionType
    | setCurrentPageActionType
    | setToggleIsFollowingInProgressActionType

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
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
        case "TOGGLE_IS_FOLLOWING_IN_PROGRESS":
            return {...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)}
        default:
            return state;
    }
}



export const followAC = (userID: string): followActionType => ({
    type: "FOLLOW",
    userID
}) as const

export const unfollowAC = (userID: string): unfollowActionType => ({
    type: "UNFOLLOW",
    userID
}) as const

export const setUsers = (users: Array<userType>): setUsersActionType => ({
    type: "SET_USERS",
    users
}) as const

export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: "SET_CURRENT_PAGE",
    currentPage
}) as const

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountAcyionType => ({
    type: "SET_USERS_TOTAL_COUNT",
    totalCount
}) as const

export const setToggleIsFetching = (isFetching: boolean): setToggleIsFetchingActionType => ({
    type: "TOGGLE_IS_FETCHING",
    isFetching
}) as const

export const setToggleIsFollowingInProgress = ( userId: string, followingInProgress: boolean): setToggleIsFollowingInProgressActionType => ({
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
    userId,
    followingInProgress
}) as const



export const getUsersThunkCreator =  (currentPage: number, pageSize: number): ThunkAction<any, RootStateType, any, any> => {
    return (dispatch:Dispatch<ActionsTypes>, getState: GetStateType) => {
        dispatch(setToggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then((data: any) => {
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
                dispatch(setToggleIsFetching(false))
                dispatch(setCurrentPage(currentPage))
            });
    }
}

export const followThunkCreator = (userID: string) => {
    return (dispatch: any) => {
        dispatch(setToggleIsFollowingInProgress(userID, true))
        usersAPI.follow(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followAC(userID))
                }
                dispatch(setToggleIsFollowingInProgress(userID, false))
            });
    }

}

export const unFollowThunkCreator = (userID: string) => {
    return (dispatch: any) => {
        dispatch(setToggleIsFollowingInProgress(userID, true))
        usersAPI.unFollow(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowAC(userID))
                }
                dispatch(setToggleIsFollowingInProgress(userID, false))
            });
    }

}




