import {usersAPI} from "../api/api";
import {RootStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {updateObjectInArray} from "../utils/objects-helpers";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                //users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
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
            return {...state, totalUsersCount: action.totalCount}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userID: string, apiMethod: any, actionCreator: any) => {
    dispatch(setToggleIsFollowingInProgress(userID, true))
    const data = await apiMethod(userID)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(setToggleIsFollowingInProgress(userID, false))
}

//actionCreators
export const followAC = (userID: string) => ({type: "FOLLOW", userID} as const)
export const unfollowAC = (userID: string) => ({type: "UNFOLLOW", userID} as const)
export const setUsers = (users: Array<userType>) => ({type: "SET_USERS", users} as const)
export const setCurrentPage = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: "SET_USERS_TOTAL_COUNT", totalCount} as const)
export const setToggleIsFetching = (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const)
export const setToggleIsFollowingInProgress = (userId: string, followingInProgress: boolean) => ({
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
    userId,
    followingInProgress
} as const)

//thunks
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkAction<any, RootStateType, any, any> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        dispatch(setToggleIsFetching(true))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setToggleIsFetching(false))
        dispatch(setCurrentPage(currentPage))
    }
}
export const followThunkCreator = (userID: string) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        followUnfollowFlow(dispatch, userID, apiMethod, followAC)
    }
}
export const unFollowThunkCreator = (userID: string) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.unFollow.bind(usersAPI)
        followUnfollowFlow(dispatch, userID, apiMethod, unfollowAC)
    }

}

//types
type GetStateType = () => RootStateType

type ActionsTypes =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setToggleIsFetching>
    | ReturnType<typeof setToggleIsFollowingInProgress>


type initialStateType = {
    users: Array<userType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
}

export type userType = {
    id: string,
    followed: boolean,
    name: string,
    status: string,
    photos: string,
}



