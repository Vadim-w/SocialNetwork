import {RootStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsers = (state: RootStateType) => {
    return state.usersPage.users
}

/*export const getUsersSelector = (state: RootStateType) => {
    return getUsers(state).filter(u => true)
}*/

export const getUsersSuperSelector = createSelector<any, Array<any>, any>(getUsers, (users) => {
    return users.filter( u => true)
})

export const getPageSize = (state: RootStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: RootStateType) => {
    return state.usersPage.followingInProgress
}
