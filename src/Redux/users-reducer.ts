


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
    currentPage: 2,
    isFetching: false,
    followingInProgress: []
};

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

type followActionType = {
    type: "FOLLOW"
    userID: string
}

export const follow = (userID: string): followActionType => ({
    type: "FOLLOW",
    userID
}) as const

type unfollowActionType = {
    type: "UNFOLLOW"
    userID: string
}

export const unfollow = (userID: string): unfollowActionType => ({
    type: "UNFOLLOW",
    userID
}) as const

type setUsersActionType = {
    type: "SET_USERS"
    users: Array<userType>
}

export const setUsers = (users: Array<userType>): setUsersActionType => ({
    type: "SET_USERS",
    users
}) as const

type setCurrentPageActionType = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
}

export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: "SET_CURRENT_PAGE",
    currentPage
}) as const

type setTotalUsersCountAcyionType = {
    type: "SET_USERS_TOTAL_COUNT"
    totalCount: number
}

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountAcyionType => ({
    type: "SET_USERS_TOTAL_COUNT",
    totalCount
}) as const

type setToggleIsFetchingActionType = {
    type: "TOGGLE_IS_FETCHING"
    isFetching: boolean
}

export const setToggleIsFetching = (isFetching: boolean): setToggleIsFetchingActionType => ({
    type: "TOGGLE_IS_FETCHING",
    isFetching
}) as const

type setToggleIsFollowingInProgressActionType = {
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS"
    followingInProgress: boolean
    userId: string
}

export const setToggleIsFollowingInProgress = ( userId: string, followingInProgress: boolean): setToggleIsFollowingInProgressActionType => ({
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
    userId,
    followingInProgress
}) as const




